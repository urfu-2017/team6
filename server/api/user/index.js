// @flow

import * as hrudb from '../hrudb'
import UserProfile from '../../../models/UserProfile'
import SocketEvent, { types } from '../../../models/SocketEvent'

import socketManager from '../../socket'

export default class UserAPI {
    static async fetch(gid: number): Promise<UserProfile> {
        const userRaw: string = await hrudb.get(`user${gid}`)
        return JSON.parse(userRaw)
    }

    static async update(profile: UserProfile, broadcast?: boolean): Promise<void> {
        return hrudb.update(`user${profile.user.gid}`, JSON.stringify(profile)).then(() => {
            socketManager.sendEvent(`session_${profile.user.gid}`, new SocketEvent(types.USER_UPDATE, profile))

            if (broadcast) {
                socketManager.sendEvent(`user_${profile.user.gid}`,
                    new SocketEvent(types.CONTACT_UPDATE, profile.user)
                )
            }
        })
    }
}
