// @flow

import * as actions from '../actions/contactsActions'

import UserInfo from '../models/UserInfo'

type ActionType = {
    type: string,
    payload: Array<number & UserInfo> & UserInfo
}

export default (state: Array<UserInfo> = [], { type, payload }: ActionType) => {
    switch (type) {
        case actions.FETCH_ALL_SUCCESS:
            return payload
        case actions.ADD_SUCCESS:
            return [...state, ...payload]
        case actions.ADD_FAILED:
            return payload
        case actions.REMOVE_SUCCESS:
            return state.filter(x => !payload.includes(x.gid))
        case actions.REMOVE_FAILED:
            return payload
        case actions.SOCKET_UPDATE_ACTION: // eslint-disable-line no-case-declarations
            const newState = [...state]
            const index = newState.findIndex(x => x.gid === payload.gid)
            newState[index] = payload

            return newState
        default:
            return state
    }
}
