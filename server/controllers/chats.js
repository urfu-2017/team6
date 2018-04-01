// @flow

import { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } from 'http-status-codes'

import ChatsAPI from '../api/chats'
import UserAPI from '../api/user'

import Chat from '../../models/Chat'
import ChatInfo from '../../models/ChatInfo'
import UserProfile from '../../models/UserProfile'

const CHAT_NOT_EXIST: number = -1

const _assignChatToMembers = (chatId: number, members: Array<number>): Promise<void[]> => Promise.all(
    members.map(gid => UserAPI.fetch(gid).then(profile => {
        const index = profile.chats.findIndex(id => id === chatId)

        if (index === CHAT_NOT_EXIST) {
            profile.chats.push(chatId)
        } else {
            profile.chats[index] = chatId
        }

        return UserAPI.update(profile)
    }))
)

export const fetchChat = async ({ params: { id } }: {
    params: { id: string }
}, res: Object) => {
    try {
        const chat: Chat = await ChatsAPI.fetch(Number(id))

        return res.status(OK).json(chat)
    } catch (e) {
        return res.sendStatus(NOT_FOUND)
    }
}

export const fetchAllChats = async ({ body: ids }: {
    ids: Array<number>,
    body: Object
}, res: Object) => {
    try {
        const fetchedChats: Array<Chat> = await Promise.all(ids.map(ChatsAPI.fetch))

        return res.status(OK).json(fetchedChats)
    } catch (e) {
        return res.sendStatus(NOT_FOUND)
    }
}

export const createChat = async ({ user, body: { name, members } }: {
    user: UserProfile,
    name: string,
    members: Array<number>,
    body: Object
}, res: Object) => {
    try {
        const owner: number = user.user.gid
        const common: ChatInfo = new ChatInfo({ name })
        const chat: Chat = new Chat({ owner, members, common })

        await Promise.all([
            ChatsAPI.update(chat),
            _assignChatToMembers(chat.common.id, chat.members)
        ])

        // TODO рассылка по сокету о созданном чате

        user.chats.push(chat.common.id)

        return res.status(OK).json(user)
    } catch (e) {
        return res.sendStatus(INTERNAL_SERVER_ERROR)
    }
}

export const updateChatInfo = async ({ body }: {
    user: UserProfile,
    body: Chat
}, res: Object) => {
    try {
        await ChatsAPI.update(body)

        // TODO рассылка по сокету об изменении ChatInfo

        return res.sendStatus(OK)
    } catch (e) {
        return res.sendStatus(INTERNAL_SERVER_ERROR)
    }
}

export const addMemberToChat = async ({ body: { chat, member } }: {
    chat: Chat,
    member: number,
    body: Object
}, res: Object) => {
    try {
        chat.members = [...chat.members, member]

        const profileUpdate: Promise<void> = UserAPI.fetch(member).then(profile => {
            profile.chats.push(chat.common.id)
            return UserAPI.update(profile)
        })

        await Promise.all([ChatsAPI.update(chat), profileUpdate])

        // TODO рассылка по сокету о новом участнике

        return res.status(OK).json(chat)
    } catch (e) {
        return res.sendStatus(INTERNAL_SERVER_ERROR)
    }
}

export const deleteMemberFromChat = async ({ body: { chat, member } }: {
    chat: Chat,
    member: number,
    body: Object
}, res: Object) => {
    try {
        chat.members = chat.members.filter(gid => gid !== member)

        const profileUpdate: Promise<void> = UserAPI.fetch(member).then(profile => {
            profile.chats = profile.chats.filter(chatId => chatId !== chat.common.id)
            return UserAPI.update(profile)
        })

        await Promise.all([ChatsAPI.update(chat), profileUpdate])

        // TODO рассылка по сокету об исключении участника

        return res.status(OK).json(chat)
    } catch (e) {
        return res.sendStatus(INTERNAL_SERVER_ERROR)
    }
}

export const deleteChat = async ({ user, params: { id } }: {
    user: UserProfile,
    id: string,
    params: Object
}, res: Object) => {
    try {
        const chatId: number = Number(id)

        await ChatsAPI.delete(chatId)
        // TODO вероятно, удаление сообщений в чате

        // TODO рассылка по сокету об удалении чата
        user.chats = user.chats.filter(id => id !== chatId)

        return res.status(OK).json(user)
    } catch (e) {
        return res.sendStatus(INTERNAL_SERVER_ERROR)
    }
}
