// @flow

import computeId from '../utils/cantor-pairing'

interface MessageType {
    _id: number,
    chatId: number,
    text: string,
    imgUrl: string,
    authorGid: number,
    createdAt: number,
    reactions: Object,
    forwarded: Object[]
}

export default class Message implements MessageType {
    _id: number
    chatId: number
    text: string
    imgUrl: string
    authorGid: number
    createdAt: number
    reactions: Object
    forwarded: Object[]

    constructor({ text, imgUrl, chatId, reactions = {}, authorGid, createdAt = Date.now(), forwarded = [] }: MessageType) {
        this.text = text
        this.imgUrl = imgUrl
        this.chatId = chatId
        this.createdAt = createdAt
        this.reactions = reactions
        this.forwarded = forwarded
        this.setAuthorGid(authorGid)
    }

    setAuthorGid(gid: number) {
        if (gid) {
            this.authorGid = gid
            this._id = computeId(gid, this.createdAt)
        }
    }
}
