import { combineReducers } from 'redux'

import CounterReducer from './count-module/reducer'
import AuthReducer from './auth/reducer'
import RealtimeReducer from './realtime/reducer'
import UIGlobalReducer from './ui_global/reducer'

const rootReducer = {
    counter: CounterReducer,
    auth: AuthReducer,
    realtime: RealtimeReducer,
    ui_global: UIGlobalReducer
}

export default rootReducer