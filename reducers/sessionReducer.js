// @flow

import * as actions from '../actions/userActions'

import UserProfile from '../models/UserProfile'

type ActionType = {
    type: string,
    payload: UserProfile
}

export default (session: UserProfile) => (state: UserProfile = session, { type, payload }: ActionType) => {
    switch (type) {
        case actions.FETCH_PROFILE_SUCCESS:
            return payload
        case actions.UPDATE_USER_SUCCESS:
        case actions.UPDATE_USER_FAILED:
            return { ...payload, user: payload }
        default:
            return state
    }
}
