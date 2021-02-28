import actions from './actions'
import { store } from '../store'

// handle socket
export const _handleOnMessage = (message) => {
    console.log("new messages : ", message)

    store.dispatch(actions.action.pushMessage(message))
}

export const _handleClose = () => {
    console.log("disconnected")
}

export const _handleOnOpen = () => {
    console.log("connected")
}