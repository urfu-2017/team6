// @flow

import computeId from '../../utils/cantor-pairing'

interface MessageType {
    _id: number,
    text: string,
    chatId: number,
    authorGid: number,
    createdAt: number
}

export default class Message implements MessageType {
    _id: number
    text: string
    chatId: number
    authorGid: number
    createdAt: number

    constructor({ text, chatId, authorGid, createdAt = Date.now() }: MessageType) {
        this._id = computeId(authorGid, createdAt)
        this.text = text
        this.chatId = chatId
        this.authorGid = authorGid
        this.createdAt = createdAt
    }
}
