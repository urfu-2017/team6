// @flow

import { OK, NOT_MODIFIED, NOT_FOUND } from 'http-status-codes'

import UserAPI from '../api/user'
import UserInfo from '../../models/UserInfo'
import UserProfile from '../../models/UserProfile'

export const fetchSelf = async ({ user }: {
    user: UserProfile
}, res: Object) => {
    try {
        const response: UserProfile = await UserAPI.fetch(user.user.gid)
        user.user = response.user
        user.contacts = response.contacts
        user.chats = response.chats

        return res.status(OK).json(user)
    } catch (e) {
        return res.sendStatus(NOT_FOUND)
    }
}

export const fetchUser = async ({ params: { gid } }: {
    params: { gid: string }
}, res: Object) => {
    try {
        const profile: UserProfile = await UserAPI.fetch(Number(gid))
        const user: UserInfo = profile.user

        return res.status(OK).json(user)
    } catch (e) {
        return res.sendStatus(NOT_FOUND)
    }
}

export const fetchAllUsers = async ({ body: gids }: {
    body: Object,
    gids: Array<number>
}, res: Object) => {
    try {
        const fetchedProfiles: Array<UserProfile> = await Promise.all(gids.map(UserAPI.fetch))

        return res.status(OK).json(fetchedProfiles.map(x => x.user))
    } catch (e) {
        return res.sendStatus(NOT_FOUND)
    }
}

export const updateUser = async ({ user, body }: {
    user: UserProfile,
    body: UserInfo
}, res: Object) => {
    try {
        await UserAPI.update(new UserProfile({ ...user, user: body }), true)

        user.user = body

        return res.sendStatus(OK)
    } catch (e) {
        return res.sendStatus(NOT_MODIFIED)
    }
}

export const addContacts = async ({ user, body }: {
    user: UserProfile,
    body: Array<number>
}, res: Object) => {
    try {
        const contacts: Array<number> = [...user.contacts, ...body]
        const profile: UserProfile = new UserProfile({ ...user, contacts })

        await Promise.all([
            UserAPI.update(profile),
            contacts.map(gid => UserAPI.fetch(gid).then(profile => {
                profile.contacts = [...profile.contacts, user.user.gid]
                return UserAPI.update(profile)
            }))
        ])

        user.contacts = contacts

        return res.sendStatus(OK)
    } catch (e) {
        return res.sendStatus(NOT_MODIFIED)
    }
}

export const removeContacts = async ({ user, body }: {
    user: UserProfile,
    body: Array<number>
}, res: Object) => {
    try {
        const contacts: Array<number> = user.contacts.filter(x => !body.includes(x))
        const profile: UserProfile = new UserProfile({ ...user, contacts })

        await Promise.all([
            UserAPI.update(profile),
            body.map(gid => UserAPI.fetch(gid).then(profile => {
                profile.contacts = profile.contacts.filter(x => x !== user.user.gid)
                return UserAPI.update(profile)
            }))
        ])

        user.contacts = contacts

        return res.sendStatus(OK)
    } catch (e) {
        return res.sendStatus(NOT_MODIFIED)
    }
}
