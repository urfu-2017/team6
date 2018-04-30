// @flow

import metascraper from 'metascraper'
import got from 'got'

import Event, { types as eventTypes } from '../../models/Event'
import Message from '../../models/Message'
import { messageModel } from '../mongodb'
import SocketEvent, { types as socketEventTypes } from '../../models/SocketEvent'

import socketManager from '../../socket'

type OptionsType = {
    limit: number,
    offset: number
}

export default class MessagesAPI {
    static fetch(chatId: number, options?: OptionsType = { limit: 50, offset: 0 }): Promise<Array<Message>> {
        return messageModel.getAll({ ...options, where: { chatId } })
    }

    static add(message: Message): Promise<void> {
        return messageModel.updateOrCreate(message._id, message).then(() => {
            socketManager.sendEvent(`chat_${message.chatId}`,
                new SocketEvent(socketEventTypes.CHAT_EVENT, new Event(eventTypes.NEW_MESSAGE, message))
            )
        })
    }

    static edit(message: Message): Promise<void> {
        // TODO: edit message
    }

    static delete(message: Message): Promise<void> {
        // TODO: delete message
    }

    static async getMeta(targetUrl: string): Promise<Object> {
        const { body: html, url } = await got(targetUrl)
        return metascraper({ html, url })
    }
}
