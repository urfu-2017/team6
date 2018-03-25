// @flow

import * as hrudb from '../hrudb'
import UserProfile from '../../../models/UserProfile'

export default class UserAPI {
    static async fetch(gid: number): Promise<UserProfile> {
        const userRaw: string = await hrudb.get(`user${gid}`)
        return JSON.parse(userRaw)
    }

    static async update(profile: UserProfile): Promise<void> {
        return hrudb.update(`user${profile.user.gid}`, JSON.stringify(profile))
    }
}
