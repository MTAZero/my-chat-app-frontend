import { getSessionKey } from '../../utils/helper';
import actions from './actions';

import * as _ from 'lodash'

const initState = {
    messages: [],
    isLoadingMore: false,
};

const _handlePushMessage = (state, message) => {
    let _message = _.filter(state.messages, (item) => {
        return item._id === message._id
    })

    if (_message.length > 0)
        return state

    return {
        ...state,
        ...{
            messages: [...state.messages, message],
        },
    };
};

const reducers = (state = initState, action) => {
    switch (action.type) {
        case actions.type.UPDATE_STATE:
            return {
                ...state,
                ...action.payload.state,
            };

        case actions.type.CONNECT:
            return state;

        case actions.type.DISCONNECT:
            return state;

        case actions.type.SEND_MESSAGE:
            return state;

        case actions.type.SET_LIST_MESSAGE:
            return {
                ...state,
                ...{
                    messages: action.payload.messages,
                },
            };

        case actions.type.PUSH_MESSAGE:
            return _handlePushMessage(state, action.payload.message);

        case actions.type.LOAD_MESSAGE_FROM_API:
            return state;

        case actions.type.LOAD_MESSAGE_SUCCESS:
            return {
                ...state,
                ...{
                    messages: action.payload.messages,
                },
            };

        case actions.type.LOAD_MORE_MESSAGE:
            return state;

        case actions.type.LOAD_MORE_MESSAGE_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingMore: false,
                    messages: [...action.payload.messages, ...state.messages],
                },
            };

        default:
            return state;
    }
};

export default reducers;
