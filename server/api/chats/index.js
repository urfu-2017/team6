// @flow

import { chat } from '../mongodb'
import Chat from '../../models/Chat'
import SocketEvent, { types } from '../../models/SocketEvent'
import socketManager from '../../socket'

export default class ChatsAPI {
    static fetch(chatId: number): Promise<Chat> {
        return chat.get(chatId)
    }

    static update(chat: Chat): Promise<void> {
        return chat.updateOrCreate(chat.common.id, chat).then(() => {
            socketManager.sendEvent(`chat_${chat.common.id}`, new SocketEvent(types.CHAT_UPDATE, chat))
        })
    }

    static delete(chatId: number): Promise<void> {
        return chat.remove(chatId).then(() => {
            socketManager.sendEvent(`chat_${chatId}`, new SocketEvent(types.CHAT_REMOVE, chatId))
        })
    }
}
