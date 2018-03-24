// @flow

import Chat from './Chat'
import UserInfo, { type UserInfoType } from './UserInfo'

type UserProfileType = UserInfoType & {
    chats: Array<Chat>,
    contacts: Array<UserInfo>
}

export default class UserProfile extends UserInfo {
    chats: Array<Chat>
    contacts: Array<UserInfo>

    constructor({ gid, name, phone, avatar, chats = [], contacts = [] }: UserProfileType) {
        super({ gid, name, phone, avatar })

        this.chats = chats
        this.contacts = contacts
    }
}
