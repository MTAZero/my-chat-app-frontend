import { combineReducers } from 'redux'

import CounterReducer from './count-module/reducer'
import AuthReducer from './auth/reducer'
import RealtimeReducer from './realtime/reducer'

const rootReducer = {
    counter: CounterReducer,
    auth: AuthReducer,
    realtime: RealtimeReducer
}

export default rootReducer