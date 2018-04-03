// @flow

import * as hrudb from '../hrudb'
import Message from '../../../models/Message'

const MESSAGES_PER_PAGE = 50

export default class MessagesAPI {
    static async _fetch(chatId: number, options: Object): Promise<Array<Message>> {
        const messagesRaw: string = await hrudb.getAll(`messages${chatId}`, { ...options, sort: 'alph' })
        const messagesRawArray: Array<string> = JSON.parse(messagesRaw)
        return messagesRawArray.map(message => JSON.parse(message))
    }

    static async fetchNext(chatId: number, page: number): Promise<Array<Message>> {
        return this._fetch(chatId, {
            offset: (page - 1) * MESSAGES_PER_PAGE,
            limit: MESSAGES_PER_PAGE
        })
    }

    static async add(message: Message): Promise<void> {
        return hrudb.add(`messages${message.chatId}`, JSON.stringify(message))
    }
}
