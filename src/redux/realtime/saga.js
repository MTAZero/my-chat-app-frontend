import {
    all,
    takeEvery,
    fork,
    put,
    select,
    take,
    delay,
} from 'redux-saga/effects';
import { getSessionKey, NotificationsService } from '../../utils/helper';
import actions from './actions';
import { channel } from 'redux-saga';

import { store } from '../store';
import APIServices from '../../utils/api';

let ws = null;
const coreChannel = channel();

const reconnect = (url) => {
    try {
        coreChannel.put(actions.action.connect(url));
    } catch (ex) {
        setTimeout(() => {
            reconnect(url);
        }, 5000);
    }
};

const onMessage = async (evt) => {
    const message = JSON.parse(evt.data);

    if (message.event === 'msgToClient') {
        console.log('onMessage ', message);

        try {
            let data = message.data;

            let info = store.getState().auth.userInfo;

            if (data.from && data.content) {
                let _message = {
                    ...data,
                    ...{
                        from: data.from ? data.from : '',
                        content: data.content ? data.content : '',
                        user: data.user ? data.user : { avatar: '' },
                    },
                };

                coreChannel.put(actions.action.pushMessage(_message));

                if (_message.from !== info.fullname)
                    NotificationsService.success(
                        _message.content,
                        _message.from,
                    );
            }
        } catch (ex) {}

        console.log('onMessage 2', message);
    }
};

const onClose = (url) => {
    console.log('disconnected');

    setTimeout(() => {
        reconnect(url);
    }, 5000);
};

function* saga_Connect(action) {
    try {
        let url = action.payload.url;

        let token = getSessionKey();
        ws = new WebSocket(url, token);

        ws.onopen = () => {
            console.log('connected');
        };

        ws.onmessage = onMessage;

        ws.onclose = () => {
            onClose(url);
        };
    } catch (ex) {
        console.log('[Saga_Auth] saga_Connect error ', ex.message);
    }
}

function* saga_Disconnect() {
    try {
        if (ws) {
            ws.close();
        }
    } catch (ex) {
        console.log('[Saga_Auth] saga_Disconnect error ', ex.message);
    }
}

function* saga_SendMessage(action) {
    try {
        let message = action.payload.message;

        if (ws) {
            ws.send(message);
        }

        // yield put(actions.action.pushMessage(message));
    } catch (ex) {
        console.log('[Saga_Auth] saga_SendMessage error ', ex.message);
    }
}

function* saga_LoadMessageFromAPI(action) {
    try {
        let res = yield APIServices.Messages.getListMessage();

        let messages = res;
        yield put(actions.action.loadMessageSuccess(messages));
    } catch (ex) {
        console.log('[Saga_Auth] saga_LoadMessageFromAPI error ', ex.message);
    }
}

function* saga_LoadMoreMessages(action) {
    try {
        let { number } = action.payload;

        let isLoadingMore = yield select(
            (state) => state.realtime.isLoadingMore,
        );
        let old_messages = yield select(state => state.realtime.messages)
        let from = old_messages[0] ? old_messages[0].timestamp - 1 : new Date().getTime()

        let messages = [];
        if (!isLoadingMore){
            yield put(actions.action.updateState({
                isLoadingMore: true
            }))

            messages = yield APIServices.Messages.getListMessage(from, number);

            yield put(actions.action.updateState({
                isLoadingMore: false
            }))
        }

        let _oldMessages = yield select((state) => state.realtime.messages);
        if (
            messages.length >= 1 &&
            messages[messages.length - 1].timestamp < _oldMessages[0].timestamp
        ){
            yield put(actions.action.loadMoreMessageSuccess(messages));
        }
    } catch (ex) {
        console.log('[Saga_Auth] saga_LoadMoreMessages error ', ex.message);

        yield put(actions.action.updateState({
            isLoadingMore: false
        }))
    }
}

function* listen() {
    yield takeEvery(actions.type.CONNECT, saga_Connect);
    yield takeEvery(actions.type.SEND_MESSAGE, saga_SendMessage);
    yield takeEvery(actions.type.DISCONNECT, saga_Disconnect);
    yield takeEvery(
        actions.type.LOAD_MESSAGE_FROM_API,
        saga_LoadMessageFromAPI,
    );
    yield takeEvery(actions.type.LOAD_MORE_MESSAGE, saga_LoadMoreMessages);

    while (true) {
        const action = yield take(coreChannel);
        yield put(action);
        yield delay(300);
    }
}

export default function* authSaga() {
    yield all([fork(listen)]);
}
