// @flow

import ChatInfo from './ChatInfo'

interface ChatType {
    common: ChatInfo,
    owner?: number,
    members?: Array<number>,
}

export default class Chat {
    common: ChatInfo
    owner: number
    members: Array<number>

    constructor({ common, owner, members = [] }: ChatType) {
        this.common = common
        this.members = members

        if (owner) {
            this.owner = owner

            if (!members.find(member => member === owner)) {
                this.members.push(owner)
            }
        }
    }
}
