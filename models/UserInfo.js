// @flow

export type UserInfoType = {
    gid: number,
    name: string,
    phone: string,
    avatar: string
}

export default class UserInfo {
    gid: number
    name: string
    phone: string
    avatar: string

    constructor({ gid, name, phone, avatar }: UserInfoType) {
        this.gid = gid
        this.name = name
        this.phone = phone
        this.avatar = avatar
    }
}
