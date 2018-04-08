import { all, fork } from 'redux-saga/effects'

import sessionSagas from './sessionSagas'

export const rootSaga = function * () {
    yield all([
        fork(sessionSagas)
    ])
}
