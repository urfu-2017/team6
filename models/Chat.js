// @flow

import ChatInfo from './ChatInfo'
import UserInfo from './UserInfo'

export default class Chat extends ChatInfo {
    members: Array<UserInfo>

    constructor(id: number, name: string, members: Array<UserInfo>) {
        super(id, name)

        this.id = id
        this.name = name
        this.members = members
    }
}
