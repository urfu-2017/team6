// @flow

import { applyMiddleware, createStore, Store, Middleware } from 'redux'
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

import initReducers from '../reducers'
import { rootSaga } from '../sagas'

import UserProfile from '../models/UserProfile'

export default (session: UserProfile): Store => {
    const sagaMiddleware: SagaMiddleware = createSagaMiddleware()
    const middleware: Middleware = composeWithDevTools(applyMiddleware(sagaMiddleware))

    const store: Store = createStore(initReducers(session), middleware)

    sagaMiddleware.run(rootSaga)

    return store
}
