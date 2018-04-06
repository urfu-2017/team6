// @flow

import LRUCache from 'lru-cache'

import * as hrudb from '../hrudb'
import Event, { types, filters } from '../../../models/Event'
import Message from '../../../models/Message'

const CACHE_LIMIT_SIZE: number = 100 * 100 * 100
const MESSAGES_PER_PAGE: number = 50

type CacheType = {
    clustersCount: number,
    messagesCount: number
}

const clusterCache: LRUCache<number, CacheType> = new LRUCache(CACHE_LIMIT_SIZE)

export default class MessagesAPI {
    static async fetch(chatId: number, clusterId?: number): Promise<Array<Message>> {
        const cache: CacheType = clusterCache.get(chatId)

        return (cache) ?
            this._fetchMessages(chatId, clusterId, cache.clustersCount) :
            this._fetchNoCached(chatId, clusterId)
    }

    static async add(message: Message): Promise<Message> {
        const cache: CacheType = clusterCache.get(message.chatId)
        const eventAddKey: string = `events${message.chatId}_${cache.clustersCount}`
        cache.messagesCount++

        message.clusterId = cache.clustersCount

        if (cache.messagesCount === MESSAGES_PER_PAGE) {
            cache.clustersCount++
            cache.messagesCount = 0

            hrudb.update(`events${message.chatId}_cluster`, `${cache.clustersCount}`)
        }

        const event: Event = new Event(types.NEW_MESSAGE, message)
        await hrudb.add(eventAddKey, JSON.stringify(event))

        return message
    }

    static async edit(message: Message): Promise<void> {
        const event: Event = new Event(types.EDIT_MESSAGE, message)
        return hrudb.add(`events${message.chatId}_${message.clusterId}`, JSON.stringify(event))
    }

    static async delete(message: Message): Promise<void> {
        const event: Event = new Event(types.DELETE_MESSAGE, message.createdAt)
        return hrudb.add(`events${message.chatId}_${message.clusterId}`, JSON.stringify(event))
    }

    static async _fetchNoCached(chatId: number, clusterId?: number): Promise<Array<Message>> {
        const clustersCount: number = await this._fetchClusterCount(chatId)
        return this._fetchMessages(chatId, clusterId, clustersCount)
    }

    static async _fetchClusterCount(chatId: number): Promise<number> {
        try {
            return Number(await hrudb.get(`events${chatId}_cluster`))
        } catch (e) {
            hrudb.update(`events${chatId}_cluster`, `${1}`)
            return 1
        }
    }

    static async _fetchMessages(chatId: number, clusterId?: number, clustersCount: number): Promise<Array<Message>> {
        const eventsRaw: string = await hrudb.getAll(`events${chatId}_${clusterId || clustersCount}`)
        const events: Array<Event> = JSON.parse(eventsRaw).map(event => JSON.parse(event))

        const editedDict: Object = events
            .filter(filters.isEditing)
            .map(event => event.payload)
            .reduce((res, cur) => ({ ...res, [cur.createdAt]: cur }), {})

        const deletedDict: Object = events
            .filter(filters.isDeleting)
            .map(event => event.payload)
            .reduce((res, cur) => ({ ...res, [cur]: true }), {})

        const messageEvents: Array<Event> = events.filter(filters.isMessage)

        if (!clusterCache.has(chatId)) {
            const cached: CacheType = { clustersCount, messagesCount: messageEvents.length }
            clusterCache.set(chatId, cached)
        }

        return messageEvents
            .map(event => event.payload)
            .filter(message => !deletedDict[message.createdAt])
            .map(message => editedDict[message.createdAt] || message)
    }
}
