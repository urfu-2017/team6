// @flow

import ChatInfo from './ChatInfo'
import computeId from '../utils/cantor-pairing'

interface ChatType {
    _id: number,
    common: ChatInfo,
    owner?: number,
    members?: Array<number>,
}

export default class Chat implements ChatType {
    _id: number
    common: ChatInfo
    owner: number
    members: Array<number>

    constructor({ common, owner, members = [] }: ChatType) {
        this._id = owner ? computeId(owner, common.createdAt) : -1
        this.common = common
        this.members = members
        this.setOwner(owner)
    }

    setOwner(gid?: number) {
        if (gid) {
            this.owner = gid

            if (!this.members.find(member => member === gid)) {
                this.members.push(gid)
            }

            this._id = computeId(gid, this.common.createdAt)
        }
    }
}
