// @flow

import * as hrudb from '../hrudb'
import UserInfo from '../../../models/UserInfo'

export default class UserAPI {
    static async fetch(id: number): Promise<UserInfo> {
        const userRaw: string = await hrudb.get(`user_${id}`)
        const userObject = JSON.parse(userRaw)

        return new UserInfo(userObject)
    }

    static async update(user: UserInfo): Promise<void> {
        return hrudb.update(`user_${user.gid}`, JSON.stringify(user))
    }
}
