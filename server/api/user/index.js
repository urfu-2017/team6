// @flow

import Identicon from 'identicon.js'
import fs, { readFileSync } from 'fs'

import UserProfile from '../../models/UserProfile'
import SocketEvent, { types } from '../../models/SocketEvent'
import { userModel } from '../mongodb'

import socketManager from '../../socket'

export default class UserAPI {
    static fetch(gid: number): Promise<UserProfile> {
        return userModel.get(gid)
    }

    static update(profile: UserProfile, broadcast?: boolean): Promise<void> {
        return userModel.updateOrCreate(profile.user.gid, profile).then(() => {
            socketManager.sendEvent(`session_${profile.user.gid}`, new SocketEvent(types.USER_UPDATE, profile))

            if (broadcast) {
                socketManager.sendEvent(`user_${profile.user.gid}`,
                    new SocketEvent(types.CONTACT_UPDATE, profile.user)
                )
            }
        })
    }

    static async getAvatar(gid: string): Buffer {
        try {
            const avatar = readFileSync(`./static/avatars/${gid}.jpg`)
            return avatar
        } catch (e) {
            gid = (Number(gid) * Math.pow(10, (15 - gid.length))).toString()
            const img = 'data:image/jpg;base64,' + new Identicon(gid, 150).toString()
            const data = img.replace(/^data:image\/\w+;base64,/, '')
            return Buffer.from(data, 'base64')
        }
    }

    static async uploadAvatar(gid: string, files: Object) {
        const sampleFile = files.sampleFile
        sampleFile.mv(`./static/avatars/${gid}.jpg`)
    }
}
