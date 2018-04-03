// @flow

interface MessageType {
    text: string,
    chatId: number,
    authorGid: number,
    createdAt: number
}

export default class Message implements MessageType {
    _: number
    text: string
    chatId: number
    authorGid: number
    createdAt: number

    constructor({ text, chatId, authorGid, createdAt = Date.now() }: MessageType) {
        this._ = 1 / createdAt
        this.text = text
        this.chatId = chatId
        this.authorGid = authorGid
        this.createdAt = createdAt
    }
}
