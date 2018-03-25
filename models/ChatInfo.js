// @flow

import Message from './Message'
import UserInfo from './UserInfo'

interface ChatInfoType {
    id: number,
    name: string,
    members: Array<UserInfo>,
    lastMessage: ?Message
}

export default class ChatInfo implements ChatInfoType {
    id: number
    name: string
    members: Array<UserInfo>
    lastMessage: ?Message

    constructor({ id, name, members = [], lastMessage }: ChatInfoType) {
        this.id = id
        this.name = name
        this.members = members
        this.lastMessage = lastMessage
    }
}
