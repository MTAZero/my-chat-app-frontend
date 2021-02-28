const prefix = 'realtime/'

const type = {
    CONNECT: prefix + 'connect',
    SEND_MESSAGE: prefix + 'send_message',
    DISCONNECT: prefix + 'disconnect',
    SET_LIST_MESSAGE: prefix + 'set_list_message',
    PUSH_MESSAGE: prefix + 'push_message'
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
    }
}

export const RealtimeActions = action

export default {
    type,
    action
}