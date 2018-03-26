// @flow

import { OK, NOT_FOUND } from 'http-status-codes'

import ChatsAPI from '../api/chats'
import UserAPI from '../api/user'

import Chat from '../../models/Chat'
import UserInfo from '../../models/UserInfo'
import ChatInfo from '../../models/ChatInfo'
import UserProfile from '../../models/UserProfile'

const CHAT_NOT_EXIST: number = -1

const _assignChatToMembers = (chat: ChatInfo, members: Array<UserInfo>): Promise<void[]> => Promise.all(
    members.map(member => UserAPI.fetch(member.gid).then(profile => {
        const index = profile.chats.findIndex(x => x.id === chat.id)

        if (index === CHAT_NOT_EXIST) {
            profile.chats.push(chat)
        } else {
            profile.chats[index] = chat
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

export const createChat = ({ user, body: { name, members } }: {
    user: UserProfile,
    body: Object,
    name: string,
    members: Array<UserInfo>
}, res: Object) => {
    const owner: UserInfo = user.user

    const chat: Chat = new Chat({
        owner: user.user, members,
        common: new ChatInfo({ name })
    })

    const chatCreate: Promise<void> = ChatsAPI.update(chat)
    const profilesUpdate: Promise<void[]> = _assignChatToMembers(chat.common, [owner, ...members])

    Promise.all([chatCreate, profilesUpdate])

    // TODO рассылка по сокету о созданном чате

    user.chats.push(chat.common)

    return res.status(OK).json(user)
}

export const updateChatInfo = ({ user, body: updatedChat }: {
    user: UserProfile,
    body: Object,
    updatedChat: Chat,
}, res: Object) => {
    const chatUpdate: Promise<void> = ChatsAPI.update(updatedChat)
    const profilesUpdate: Promise<void[]> = _assignChatToMembers(updatedChat.common, updatedChat.members)

    Promise.all([chatUpdate, profilesUpdate])

    // TODO рассылка по сокету об изменении ChatInfo

    const index = user.chats.findIndex(x => x.id === updatedChat.common.id)
    user.chats[index] = updatedChat

    return res.status(OK).json(user)
}

export const addMemberChat = ({ body: { chat, member } }: {
    chat: Chat,
    body: Object,
    member: UserInfo
}, res: Object) => {
    chat.members = [...chat.members, member]

    const chatUpdate: Promise<void> = ChatsAPI.update(chat)
    const profileUpdate: Promise<void> = UserAPI.fetch(member.gid).then(profile => {
        profile.chats.push(chat.common)
        return UserAPI.update(profile)
    })

    Promise.all([chatUpdate, profileUpdate])

    // TODO рассылка по сокету о новом участнике

    return res.status(OK).json(chat)
}

export const deleteMemberChat = ({ body: { chat, member } }: {
    chat: Chat,
    body: Object,
    member: UserInfo
}, res: Object) => {
    chat.members = chat.members.filter(x => x.gid !== member.gid)

    const chatUpdate: Promise<void> = ChatsAPI.update(chat)
    const profileUpdate: Promise<void> = UserAPI.fetch(member.gid).then(profile => {
        profile.chats.push(chat.common)
        return UserAPI.update(profile)
    })

    Promise.all([chatUpdate, profileUpdate])

    // TODO рассылка по сокету об исключении участника

    return res.status(OK).json(chat)
}

export const deleteChat = ({ user, params: { id } }: {
    user: UserProfile,
    params: Object,
    id: string,
}, res: Object) => {
    ChatsAPI.delete(Number(id))
    // TODO вероятно, удаление сообщений в чате

    // TODO рассылка по сокету об удалении чата
    user.chats = user.chats.filter(chat => chat.id !== Number(id))

    return res.status(OK).json(user)
}
