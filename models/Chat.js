// @flow

import UserInfo from './UserInfo'
import ChatInfo from './ChatInfo'

interface ChatType {
    common: ChatInfo,
    owner?: UserInfo,
    members?: Array<UserInfo>,
}

export default class Chat {
    common: ChatInfo
    owner: UserInfo
    members: Array<UserInfo>

    constructor({ common, owner, members = [] }: ChatType) {
        this.common = common
        this.members = members

        if (owner instanceof UserInfo) {
            this.owner = owner

            if (this.members.length === 0) {
                this.members.push(owner)
            }
        }
    }
}
