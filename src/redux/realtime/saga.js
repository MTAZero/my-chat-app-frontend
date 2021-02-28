import { all, takeEvery, fork, put, select, take, delay } from 'redux-saga/effects';
import { getSessionKey } from '../../utils/helper';
import actions from './actions';
import { channel } from 'redux-saga'

let ws = null;
const coreChannel = channel()

function* saga_Connect(action) {
    try {
        let url = action.payload.url;

        let token = getSessionKey();
        ws = new WebSocket(url, token);

        ws.onopen = () => {
            console.log('connected');
        };

        ws.onmessage = (evt) => {
            const message = JSON.parse(evt.data);

            if (message.event === 'msgToClient') {
                console.log('onMessage ', message);

                try {
                    let data = message.data;

                    if (data.from && data.content) {
                        let _message = {
                            from: data.from ? data.from : '',
                            content: data.content ? data.content : '',
                        }

                        coreChannel.put(
                            actions.action.pushMessage(_message)
                        )
                    }
                } catch (ex) {}

                console.log('onMessage 2', message);
            }
        };

        ws.onclose = () => {
            console.log('disconnected');
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

function* listen() {
    yield takeEvery(actions.type.CONNECT, saga_Connect);
    yield takeEvery(actions.type.SEND_MESSAGE, saga_SendMessage);
    yield takeEvery(actions.type.DISCONNECT, saga_Disconnect);

    while (true) {
        const action = yield take(coreChannel)
        yield put(action)
        yield delay(100)
    }
}

export default function* authSaga() {
    yield all([fork(listen)]);
}
