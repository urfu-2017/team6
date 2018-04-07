// @flow

import { combineReducers, Reducer } from 'redux'

import sessionReducer from './sessionReducer'
import UserProfile from '../models/UserProfile'

export default (session: UserProfile): Reducer => combineReducers({
    session: sessionReducer(session)
})
