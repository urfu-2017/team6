// @flow

import { INTERNAL_SERVER_ERROR, OK } from 'http-status-codes'
import Message from '../../models/Message'
import MessagesAPI from '../api/messages'
import UserProfile from '../../models/UserProfile'

export const addMessage = async ({ user, body }: {
    user: UserProfile,
    body: Message
}, res: Object) => {
    try {
        body.authorGid = user.user.gid

        const response: Message = await MessagesAPI.add(body)

        return res.status(OK).json(response)
    } catch (e) {
        return res.sendStatus(INTERNAL_SERVER_ERROR)
    }
}

export const getMessages = async ({ params: { chatId }, query: { clusterId } }: {
    params: { chatId: string },
    query: { clusterId?: string }
}, res: Object) => {
    try {
        const messages: Array<Message> = await MessagesAPI.fetch(Number(chatId), Number(clusterId))

        return res.status(OK).json(messages)
    } catch (e) {
        return res.sendStatus(INTERNAL_SERVER_ERROR)
    }
}

export const editMessage = async ({ body }: {
    body: Message,
}, res: Object) => {
    try {
        await MessagesAPI.edit(body)

        return res.status(OK)
    } catch (e) {
        return res.sendStatus(INTERNAL_SERVER_ERROR)
    }
}

export const deleteMessage = async ({ body }: {
    body: Message
}, res: Object) => {
    try {
        await MessagesAPI.delete(body)

        return res.status(OK)
    } catch (e) {
        return res.sendStatus(INTERNAL_SERVER_ERROR)
    }
}
