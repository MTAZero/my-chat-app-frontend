const prefix = 'auth/'

const type = {
    LOGIN: prefix + 'LOGIN',
    LOGIN_SUCCESS: prefix + 'LOGIN_SUCCESS',

    LOGOUT: prefix + 'LOGOUT'
}

const action = {
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

export default {
    type,
    action
}