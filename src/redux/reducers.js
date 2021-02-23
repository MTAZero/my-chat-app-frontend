import { combineReducers } from 'redux'
import CounterReducer from './count-module/reducer'

const rootReducer = combineReducers({
    counter: CounterReducer
})

export default rootReducer