// @flow

import * as actions from '../actions/messagesActions'

import Message from '../models/Message'

type ActionType = {
    type: string,
    payload: { chatId: number, messages: Array<Message> } & Message & Object
}

export default (state: Object = {}, { type, payload }: ActionType) => {
    const newState = {...state}
    let index

    switch (type) {
        case actions.FETCH_CLUSTER_SUCCESS:
            newState[payload.chatId] = [...payload.messages, ...state[payload.chatId]]
            return newState
        case actions.SEND_SUCCESS:
            newState[payload.chatId].push(payload)
            return newState
        case actions.SOCKET_NEW_MESSAGE:
        case actions.SOCKET_EDIT_MESSAGE: // eslint-disable-line no-case-declarations
            index = newState[payload.chatId].findIndex(x => x.createdAt === payload.createdAt)

            if (index === -1) {
                newState[payload.chatId].push(payload)
            } else {
                newState[payload.chatId][index] = payload
            }

            return newState
        case actions.SOCKET_DELETE_MESSAGE: // eslint-disable-line no-case-declarations
            index = newState[payload.chatId].findIndex(x => x.createdAt === payload.createdAt)
            delete newState[payload.chatId][index]
            return newState
        case actions.FETCH_ALL_SUCCESS:
        case actions.SEND_FAILED:
        case actions.EDIT_FAILED:
        case actions.REMOVE_FAILED:
            return payload
        default:
            return state
    }
}
