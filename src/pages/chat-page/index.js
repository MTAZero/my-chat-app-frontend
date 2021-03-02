import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useDispatch, useSelector } from 'react-redux';

import * as _ from 'lodash';
import moment from 'moment';
import 'moment/locale/vi';

// api
import APIServices from '../../utils/api';
import { useSock } from '../../hooks';
import { useActions } from '../../redux';

// scss
import './index.scss';
import { usePrevious } from '../../hooks/usePrevious';

moment.locale('vi');

// moment.lang("vi").format('dd/MM/yyyy');

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
    let time = useCustomTimeHooks();

    const [chatText, setChatText] = useState('');
    const messages = useSelector((state) => state.realtime.messages);

    const messagesRef = useRef(null);
    const messageTopRef = useRef(null);

    let prv_messages = usePrevious(messages);

    // let token = useSelector(state => state.auth.token)
    let socketUrl = 'ws://localhost:3001';
    let dispatch = useDispatch();
    let actions = useActions();

    const userInfo = useSelector((state) => state.auth.userInfo);

    useEffect(() => {
        dispatch(actions.RealtimeActions.connect(socketUrl));

        dispatch(actions.RealtimeActions.loadMessageFromApi());
    }, []);

    // scroll to bot message
    useEffect(() => {
        try {
            // scroll to bottom
            if (
                prv_messages.length ===0 ||
                prv_messages[prv_messages.length - 1]._id !==
                    messages[messages.length - 1]._id
            )
                messagesRef.current?.scrollIntoView({ behavior: 'smooth' });

            // scroll to top
            if (prv_messages[0]._id !== messages[0]._id)
                messageTopRef.current?.scrollIntoView({ behavior: 'smooth' });
        } catch (ex) {}
    }, [messages]);

    useLayoutEffect(() => {
        const throttledFunc = () => {
            console.log('scroll');
        };

        console.log("laa")

        window.addEventListener('scroll', throttledFunc, false);
        return () => {
            window.removeEventListener('scroll', throttledFunc);
        };
    });

    const _handleClickAddMessage = () => {
        let text = chatText;
        if (text === '') return;

        let message = {
            event: 'message',
            data: {
                content: text,
            },
        };
        message = JSON.stringify(message);

        dispatch(actions.RealtimeActions.sendMessage(message));
        setChatText('');
    };

    const _handleLoadMoreMessages = () => {
        let from = new Date().getTime();

        if (messages.length > 0) from = messages[0].timestamp - 1;

        dispatch(actions.RealtimeActions.loadMoreMessage(from));
    };

    return (
        <div className="ChatPage">
            {/* <h2>Chat page: {time}</h2> */}

            <div
                onClick={() => {
                    _handleLoadMoreMessages();
                }}
            >
                load thêm
            </div>

            <div className="CP_MessagePanel">
                <div ref={messageTopRef} />
                {messages.map((message, index) => {
                    let className = 'MessageItem';
                    if (message.user && message.user._id === userInfo._id)
                        className = className + ' OwnMessage';

                    let avatar = '';
                    if (message.user && message.user.avatar)
                        avatar = message.user.avatar;

                    // let _time = new Date(message.timestamp)

                    // console.log("avatar : ", avatar)

                    return (
                        <div className={className} key={index}>
                            <img className="CP_Avatar" src={avatar} />
                            <div className="CP_ContentPanel">
                                <div className="MessageTitle">
                                    {message.from}
                                </div>
                                <div className="MessageContent">
                                    {message.content}

                                    <div className="MessageDateTime">
                                        {moment(message.timestamp).fromNow()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesRef} />
            </div>
            <div className="CP_InputPanel">
                <textarea
                    value={chatText}
                    type="text"
                    className="InputTextInput"
                    onChange={(e) => {
                        setChatText(e.target.value);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            _handleClickAddMessage();
                        }
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
