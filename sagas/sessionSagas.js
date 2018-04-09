import { put, call, takeLatest } from 'redux-saga/effects'
import * as actions from '../actions/userActions'
import API from '../api'

import UserProfile from '../models/UserProfile'
import { types } from '../models/SocketEvent'

import { dispatch } from '../store'

const fetchSelf = function * ({ payload: socket }) {
    const payload: UserProfile = yield call(API.fetchSelf)

    socket.emit('connect_auth', payload)
    socket.on(types.USER_UPDATE, (payload: UserProfile) => {
        dispatch({ type: actions.FETCH_PROFILE_SUCCESS, payload })
        socket.emit('connect_auth', payload)
    })

    yield put({ type: actions.FETCH_PROFILE_SUCCESS, payload })
}

const sessionSagas = function * () {
    yield takeLatest(actions.FETCH_PROFILE_ACTION, fetchSelf)
}

export default sessionSagas
