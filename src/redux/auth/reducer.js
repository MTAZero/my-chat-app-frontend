import { key_const } from '../../const';
import { getLocalData, getSessionKey } from '../../utils/helper';
import actions from './actions'

const default_user = {
    fullname: "",
    phone: "",
    sex: 1,
    dob: new Date(),
    address: "",
    email: "",
    file: null,
    groupCustomerId: null
}

const initState = {
    isLoggedIn: getSessionKey() !== null,
    token: getSessionKey(),
    userInfo: default_user
}

const reducer = (state = initState, action) => {
    switch (action.type){
        case actions.type.UPDATE_STATE:
            return {
                ...state,
                ...action.payload.state
            }

        case actions.type.LOGIN:
            return state 

        case actions.type.LOGOUT:
            return state

        case actions.type.CHECK_SESSION:
            return state

        default:
            return state 
    }
}

export default reducer