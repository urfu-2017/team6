// @flow

import computeId from '../utils/cantor-pairing'

interface MessageType {
    _id: number,
    chatId: number,
    text: string,
    imageUrl: string,
    authorGid: number,
    createdAt: number,
}

export default class Message implements MessageType {
    _id: number
    chatId: number
    text: string
    imageUrl: string
    authorGid: number
    createdAt: number

    constructor({ text, imgUrl, chatId, authorGid, createdAt = Date.now() }: MessageType) {
        this.text = text
        this.imgUrl = imgUrl
        this.chatId = chatId
        this.createdAt = createdAt
        this.setAuthorGid(authorGid)
    }

    setAuthorGid(gid) {
        if (gid) {
            this.authorGid = gid
            this._id = computeId(gid, this.createdAt)
        }
    }
}
