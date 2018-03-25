// @flow

import UserInfo from './UserInfo'
import ChatInfo from './ChatInfo'

export interface UserProfileType {
    user: UserInfo,
    contacts?: Array<UserInfo>,
    chats?: Array<ChatInfo>
}

export default class UserProfile implements UserProfileType {
    user: UserInfo
    contacts: Array<UserInfo>
    chats: Array<ChatInfo>

    constructor({ user, contacts = [], chats = [] }: UserProfileType) {
        this.user = user
        this.contacts = contacts
        this.chats = chats
    }
}
