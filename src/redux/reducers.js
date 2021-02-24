import { combineReducers } from 'redux'

import CounterReducer from './count-module/reducer'
import AuthReducer from './auth/reducer'

const rootReducer = {
    counter: CounterReducer,
    auth: AuthReducer
}

export default rootReducer