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
        default:
            return state
    }
}
