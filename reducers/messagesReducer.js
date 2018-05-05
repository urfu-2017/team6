import * as actions from '../actions/messagesActions'

import Message from '../server/models/Message'

export const statuses = {
    PENDING: 1,
    OK: 2,
    FAILED: 3
}

type StateType = {
    [key: number]: Array<Message>
}

type ActionType = {
    type: string,
    payload: StateType | Message | { chatId: number, messages: Array<Message> }
}

export default (state: StateType = {}, { type, payload }: ActionType): StateType => {
    const newState = {...state}
    let index

    switch (type) {
        case actions.FETCH_ALL_SUCCESS:
        case actions.EDIT_FAILED:
        case actions.REMOVE_FAILED:
            return payload
        case actions.FETCH_CLUSTER_SUCCESS:
            newState[payload.chatId] = [...payload.messages, ...state[payload.chatId]]
            return newState
        case actions.SEND_REQUEST:
        case actions.SEND_SUCCESS:
        case actions.SEND_FAILED:
        case actions.SOCKET_NEW_MESSAGE:
        case actions.SOCKET_EDIT_MESSAGE:
            index = newState[payload.chatId].findIndex(x => x.createdAt === payload.createdAt)

            if (index === -1) {
                newState[payload.chatId].push(payload)
            } else {
                newState[payload.chatId][index] = payload
            }

            newState[payload.chatId] = newState[payload.chatId].sort((a, b) => a.createdAt - b.createdAt)
            return newState
        case actions.SOCKET_DELETE_MESSAGE:
            index = newState[payload.chatId].findIndex(x => x.createdAt === payload.createdAt)
            delete newState[payload.chatId][index]
            return newState
        default:
            return state
    }
}
