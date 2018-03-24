// @flow

type MessageType = {
    text: string,
    chatId: number,
    authorGid: number,
    createdAt: Date
}

export default class Message {
    text: string
    chatId: number
    authorGid: number
    createdAt: Date

    constructor({ text, chatId, authorGid, createdAt }: MessageType) {
        this.text = text
        this.chatId = chatId
        this.authorGid = authorGid
        this.createdAt = createdAt
    }
}
