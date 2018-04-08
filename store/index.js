// @flow

import { applyMiddleware, createStore, Store, Middleware } from 'redux'
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

import initReducers from '../reducers'
import { rootSaga } from '../sagas'

import UserProfile from '../models/UserProfile'

let reduxStore: Store

export default (session: UserProfile): Store => {
    const sagaMiddleware: SagaMiddleware = createSagaMiddleware()
    const middleware: Middleware = composeWithDevTools(applyMiddleware(sagaMiddleware))

    reduxStore = createStore(initReducers(session), middleware)

    sagaMiddleware.run(rootSaga)

    return reduxStore
}

export const dispatch = (action: Object) => reduxStore.dispatch(action)
