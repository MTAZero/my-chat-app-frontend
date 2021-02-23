import createApiServices from './createApiServices'

const api = createApiServices()

// auth 
export const login = (uname, password) => {
    const body = {
        password: password,
        email: uname,
    }
    return api.makeRequest({
        url: 'auth/login',
        method: 'POST',
        data: body,
    })
}

// export const logout = () => {
//     return api.makeAuthRequest({
//         url: 'auth/logout',
//         method: 'GET',
//     })
// }

export const getUserInfo = () => {
    return api.makeAuthRequest({
        url: 'auth/my-info',
        method: 'GET',
        data: {
        }
    })
}
