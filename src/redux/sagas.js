import { all } from 'redux-saga/effects'

import authSaga from './auth/saga'
import realtimeSaga from './realtime/saga'

export default function* rootSaga() {
    yield all([
        authSaga(),
        realtimeSaga()
    ])
}
