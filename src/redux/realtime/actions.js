const prefix = 'realtime/'

const type = {
    CONNECT: prefix + 'connect',
    SEND_MESSAGE: prefix + 'send_message',
    DISCONNECT: prefix + 'disconnect',
    SET_LIST_MESSAGE: prefix + 'set_list_message',
    PUSH_MESSAGE: prefix + 'push_message',

    LOAD_MESSAGE_FROM_API: prefix + 'load_message_from_api',
    LOAD_MESSAGE_SUCCESS: prefix + 'load_message_success',

    LOAD_MORE_MESSAGE: prefix + 'load_more_message',
    LOAD_MORE_MESSAGE_SUCCESS: prefix + 'load_more_message_success'
}

const action = {
    connect: (url = '') => {
        return {
            type: type.CONNECT,
            payload: {
                url
            }
        }
    },
    sendMessage: (message = {}) => {
        return {
            type: type.SEND_MESSAGE,
            payload: {
                message
            }
        }
    },
    disconnect: () => {
        return {
            type: type.DISCONNECT,
            payload: {
                
            }
        }
    },
    setListMessages: (messages = []) => {
        return {
            type: type.SET_LIST_MESSAGE,
            payload: {
                messages
            }
        }
    },
    pushMessage: (message) => {
        return {
            type: type.PUSH_MESSAGE,
            payload: {
                message
            }
        }
    },

    loadMessageFromApi: () => {
        return {
            type: type.LOAD_MESSAGE_FROM_API,
            payload: {

            }
        }
    },
    loadMessageSuccess: (messages = []) => {
        return {
            type: type.LOAD_MESSAGE_SUCCESS,
            payload: {
                messages
            }
        }
    },

    loadMoreMessage: (from = new Date().getTime(), number = 10) => {
        return {
            type: type.LOAD_MORE_MESSAGE,
            payload: {
                from,
                number
            }
        }
    },
    loadMoreMessageSuccess: (messages) => {
        return {
            type: type.LOAD_MORE_MESSAGE_SUCCESS,
            payload: {
                messages
            }
        }
    }
}

export const RealtimeActions = action

export default {
    type,
    action
}