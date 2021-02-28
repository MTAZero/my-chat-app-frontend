import React, { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useDispatch, useSelector } from 'react-redux'
import * as _ from 'lodash';

// api
import APIServices from '../../utils/api'
import { useSock } from '../../hooks';
import { useActions } from '../../redux';

function useCustomTimeHooks() {
    function getCurrentTime() {
        let date = new Date();
        return (
            date.getHours() +
            ': ' +
            date.getMinutes() +
            ': ' +
            date.getSeconds()
        );
    }

    let [time, setTime] = useState(getCurrentTime());

    setTimeout(() => {
        setTime(getCurrentTime());
    }, 1000);

    return [time];
}

const ChatPage = () => {
    let time = useCustomTimeHooks()

    const [chatText, setChatText] = useState('');
    const messages = useSelector(state => state.realtime.messages)

    // let token = useSelector(state => state.auth.token)
    let socketUrl = 'ws://localhost:3001';
    let dispatch = useDispatch()
    let actions = useActions()

    useEffect(() => {
        dispatch(actions.RealtimeActions.connect(socketUrl))
    }, [])

    const _handleClickAddMessage = () => {
        let text = chatText;
        if (text === '') return;

        let message = {
            event: 'message',
            data: {
                content: text,
            },
        };
        message = JSON.stringify(message)

        dispatch(actions.RealtimeActions.sendMessage(message))
        setChatText('');
    }

    return (
        <div>
            <h2>Chat page: {time}</h2>
            {messages.map((message, index) => {
                return (
                    <div className="MessageItem" key={index}>
                        <div className="MessageTitle">{message.from}: </div>
                        <div className="MessageContent">{message.content}</div>
                    </div>
                );
            })}
            <div className="InputBox">
                <textarea
                    value={chatText}
                    type="text"
                    className="InputTextInput"
                    onChange={(e) => {
                        setChatText(e.target.value);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') _handleClickAddMessage();
                    }}
                />
                <div
                    style={{
                        margin: 0,
                    }}
                >
                    <div
                        className="ButtonSend"
                        onClick={() => {
                            _handleClickAddMessage();
                        }}
                    >
                        Gửi
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
