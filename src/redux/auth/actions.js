const prefix = 'auth/'

const type = {
    UPDATE_STATE: prefix + 'update_state',

    LOGIN: prefix + 'LOGIN',
    LOGOUT: prefix + 'LOGOUT'
}

const action = {
    updateState: (state = {}) => {
        return {
            type: type.UPDATE_STATE,
            payload: {
                state
            }
        }
    },

    login: (username = "", password = "") => {
        return {
            type: type.LOGIN,
            payload: {
                username,
                password
            }
        }
    },
    logout: () => {
        return {
            type: type.LOGOUT,
            payload: {

            }
        }
    }
}

export const AuthActions = action

export default {
    type,
    action
}