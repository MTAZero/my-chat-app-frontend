import createApiServices from '../createApiServices'

const api = createApiServices()

const getListMessage = () => {
    return api.makeAuthRequest({
        url: 'manager-messages',
        method: 'GET'
    })
}

export const Messages = {
    getListMessage
}