// @flow

import { INTERNAL_SERVER_ERROR, OK } from 'http-status-codes'
import Message from '../../models/Message'
import MessagesAPI from '../api/messages'

export const addMessage = async ({ body: message }: {
    message: Message,
    body: Object
}, res: Object) => {
    try {
        await MessagesAPI.add(message)

        return res.sendStatus(OK)
    } catch (e) {
        return res.sendStatus(INTERNAL_SERVER_ERROR)
    }
}

export const getMessages = async ({ params: { chatId }, query: { page } }: {
    params: { chatId: number },
    query: { page: number }
}, res: Object) => {
    try {
        const messages: Array<Message> = await MessagesAPI.fetchNext(chatId, page)
        messages.reverse()

        return res.status(OK).json(messages)
    } catch (e) {
        return res.sendStatus(INTERNAL_SERVER_ERROR)
    }
}
