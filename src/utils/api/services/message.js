import createApiServices from '../createApiServices'

const api = createApiServices()

const getListMessage = (from = new Date().getTime(), number = 10) => {
    return api.makeAuthRequest({
        url: `manager-messages?from=${from}&number=${number}`,
        method: 'GET'
    })
}

export const Messages = {
    getListMessage
}