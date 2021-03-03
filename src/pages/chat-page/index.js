import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useDispatch, useSelector } from 'react-redux';

import * as _ from 'lodash';
import moment from 'moment';
import 'moment/locale/vi';

// api
import APIServices from '../../utils/api';
import { useCurrentTimeHooks, useSock, usePrevious } from '../../hooks';
import { useActions } from '../../redux';

// scss
import './index.scss';
import { AppConfigs } from '../../configs';

// setting moment
moment.locale('vi');

const ChatPage = () => {
    const [chatText, setChatText] = useState('');

    const messages = useSelector((state) => state.realtime.messages);
    const isLoadingMore = useSelector((state) => state.realtime.isLoadingMore);

    const messagesRef = useRef(null);
    const messageTopRef = useRef(null);

    const [messageHeight, setMessageHeight] = useState(0);

    let prv_messages = usePrevious(messages);

    let socketUrl = AppConfigs.ServerConfigs.socket_server;
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
            let element = document.getElementById('CP_MessagePanel');
            let height = element.scrollHeight;

            // scroll old position
            let current = element.scrollTop;
            element.scrollTop = current + height - messageHeight;

            // update height message panel
            setMessageHeight(height);

            // scroll to bottom
            if (
                prv_messages.length === 0 ||
                prv_messages[prv_messages.length - 1]._id !==
                    messages[messages.length - 1]._id
            )
                messagesRef.current?.scrollIntoView({ behavior: 'smooth' });

            // scroll to top
            // if (prv_messages[0]._id !== messages[0]._id)
            //     messageTopRef.current?.scrollIntoView({ behavior: 'smooth' });
        } catch (ex) {}
    }, [messages]);

    const [scrollTop, setScrollTop] = useState(0);
    useLayoutEffect(() => {
        let element = document.getElementById('CP_MessagePanel');

        const onScroll = (e) => {
            if (element.scrollTop <= 100 && !isLoadingMore) {
                _handleLoadMoreMessages();
            }

            setScrollTop(e.scrollTop);
        };

        element.addEventListener('scroll', onScroll);

        return () => {
            element.removeEventListener('scroll', onScroll);
        };
    }, [scrollTop]);

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
        if (!isLoadingMore) dispatch(actions.RealtimeActions.loadMoreMessage());
    };

    return (
        <div className="ChatPage">
            <div className="CP_MessagePanel" id="CP_MessagePanel">
                <div ref={messageTopRef} />
                {messages.map((message, index) => {
                    let className = 'MessageItem';
                    if (message.user && message.user._id === userInfo._id)
                        className = className + ' OwnMessage';

                    let avatar = '';
                    if (message.user && message.user.avatar)
                        avatar = message.user.avatar;

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
