// @flow

import { combineReducers, Reducer } from 'redux'

import UserProfile from '../models/UserProfile'

import sessionReducer from './sessionReducer'
import contactsReducer from './contactsReducer'
import chatsReducer from './chatsReducer'
import messagesReducer from './messagesReducer'

export default (session: UserProfile): Reducer => combineReducers({
    session: sessionReducer(session),
    contacts: contactsReducer,
    chats: chatsReducer,
    messages: messagesReducer
})
