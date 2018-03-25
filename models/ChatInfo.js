// @flow

import Message from './Message'

interface ChatInfoType {
    id: number,
    name: string,
    lastMessage: Message
}

export default class ChatInfo implements ChatInfoType {
    id: number
    name: string
    lastMessage: Message

    constructor({ id, name, lastMessage }: ChatInfoType) {
        this.id = id
        this.name = name
        this.lastMessage = lastMessage
    }
}
