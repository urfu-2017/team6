// @flow

import * as view from '../actions/viewActions'

import UserInfo from '../models/UserInfo'

type StateType = {
    user: UserInfo,
    isShow: boolean
}

type ActionType = {
    type: string,
    payload: UserInfo
}

export default (state: StateType = { user: new UserInfo({}), isShow: false }, { type, payload }: ActionType): StateType => {
    switch (type) {
        case view.CLOSE_PROFILE_MODAL:
            return { ...state, isShow: false }
        case view.SHOW_PROFILE_MODAL:
            return payload
        default:
            return state
    }
}
