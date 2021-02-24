import { key_const } from '../../const';
import { getLocalData } from '../../utils/helper';
import actions from './actions'

const _getSessionKey = () => {
    const session_key = getLocalData(key_const.session_key, null);
    return session_key ? session_key : null;
};


const default_user = {
    fullName: "",
    phone: "",
    sex: 1,
    dob: new Date(),
    address: "",
    email: "",
    file: null,
    groupCustomerId: null
}

const initState = {
    isLoggedIn: _getSessionKey() !== null,
    token: _getSessionKey(),
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