// @flow

import * as hrudb from '../hrudb'
import Chat from '../../../models/Chat'

export default class ChatsAPI {
    static async fetch(chatId: number): Promise<Chat | null> {
        try {
            const chatRaw: string = await hrudb.get(`chat${chatId}`)
            return JSON.parse(chatRaw)
        } catch (e) {
            return null
        }
    }

    static async update(chat: Chat): Promise<void> {
        return hrudb.update(`chat${chat.common.id}`, JSON.stringify(chat))
    }

    static async delete(chatId: number): Promise<void> {
        return hrudb.remove(`chat${chatId}`)
    }
}
