import createApiServices from './createApiServices'

const api = createApiServices()

export const getListMessage = () => {
    return api.makeAuthRequest({
        url: 'manager-messages',
        method: 'GET'
    })
}