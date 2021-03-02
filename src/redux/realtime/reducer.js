import { getSessionKey } from '../../utils/helper';
import actions from './actions';

const initState = {
    messages: []
};

const reducers = (state = initState, action) => {
    switch (action.type) {
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
            return {
                ...state,
                ...{
                    messages: [...state.messages, action.payload.message],
                },
            };

        case actions.type.LOAD_MESSAGE_FROM_API:
            return state 

        case actions.type.LOAD_MESSAGE_SUCCESS:
            return {
                ...state,
                ...{
                    messages: action.payload.messages
                }
            }

        case actions.type.LOAD_MORE_MESSAGE:
            return state 

        case actions.type.LOAD_MORE_MESSAGE_SUCCESS:
            return {
                ...state,
                ...{
                    messages: [
                        ...action.payload.messages,
                        ...state.messages
                    ]
                }
            }

        default:
            return state;
    }
};

export default reducers;
