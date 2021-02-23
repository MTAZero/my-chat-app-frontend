import logo from './logo.svg';
import './App.css';

import React, { useState, useCallback, useEffect } from 'react';
import { setLocalData, setSessionKey } from './utils/helper';
import { getListMessage } from './utils/api/message';
import * as _ from 'lodash';
import useWebSocket, { ReadyState } from 'react-use-websocket';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Zindousm',
            messages: [],
            text: '',
        };

        setSessionKey(this.token);
    }

    token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoiNjAyZDRiMTU4ZjY1ZjdkNDhhYmQ5YzAxIiwiaWF0IjoxNjEzOTEwNjQxLCJleHAiOjE2MTM5OTcwNDF9.4tjxGPvUdlm1njl5rGUZJKZC8_JKVuDEdjYvC_3_ajs';
    ws = new WebSocket('ws://localhost:3001', this.token);

    // lifecycle
    componentDidMount = () => {
        this._connectSocket();
    };

    // api
    getOldMessage = async () => {
        try {
            let res = await getListMessage();

            let messages = _.map(res, (item) => {
                return _.pick(item, ['from', 'content', 'timestamp']);
            });

            this.setState({
                messages,
            });
        } catch (ex) {}
    };

    // socket handle
    _connectSocket = () => {
        if (!this.ws.CLOSED) return;

        try {
            this.ws = new WebSocket('ws://localhost:3001', this.token);
            this.ws.onopen = () => {
                // on connecting, do nothing but log it to the console
                console.log('connected');
            };
            this.ws.onmessage = this._handleOnMessage;
            this.ws.onclose = this._handleSocketClose;

            this.getOldMessage();
        } catch (ex) {
            if (!this.ws)
                setTimeout(() => {
                    this._reconnect();
                }, 5000);
        }
    };

    _handleSocketClose = () => {
        console.log('disconnected');

        // automatically try to reconnect on connection loss
        setTimeout(() => {
            this._connectSocket();
        }, 5000);
    };

    _handleOnMessage = (evt) => {
        // on receiving a message, add it to the list of messages
        const message = JSON.parse(evt.data);

        if (message.event === 'msgToClient') {
            try {
                let data = message.data;

                if (data.from && data.content)
                    this.addMessage({
                        from: data.from ? data.from : '',
                        content: data.content ? data.content : '',
                    });
            } catch (ex) {}
        }
    };

    addMessage = (message) =>
        this.setState((state) => ({ messages: [message, ...state.messages] }));

    // handle
    submitMessage = (messageString) => {
        // on submitting the ChatInput form, send the message, add it to the list and reset the input
        const message = {
            event: 'message',
            data: {
                content: messageString,
            },
        };
        this.ws.send(JSON.stringify(message));
    };

    render() {
        console.log('state : ', this.state);

        return (
            <div>
                <div>
                    <input
                        type="text"
                        value={this.state.text}
                        onChange={(e) =>
                            this.setState({ text: e.target.value })
                        }
                    />
                </div>

                <div>
                    <input
                        type="button"
                        value="Gửi"
                        onClick={() => {
                            this.submitMessage(this.state.text);
                            this.setState({ text: '' });
                        }}
                    />
                </div>

                {/* List chat message */}
                {this.state.messages.map((message, index) => {
                    return (
                        <div key={index}>
                            <b>{message.from}</b> : {message.content}
                        </div>
                    );
                })}
            </div>
        );
    }
}

const CountingComponent = () => {
    const [count, setCount] = useState(10);

    return (
        <div>
            Count number: {count}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                <div
                    style={{
                        cursor: 'pointer',
                        backgroundColor: '#f2f2f2',
                        color: 'black',
                        width: 50,
                        height: 50,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onClick={(e) => setCount(count + 1)}
                >
                    +
                </div>

                <div
                    style={{
                        cursor: 'pointer',
                        backgroundColor: '#f2f2f2',
                        color: 'black',
                        width: 50,
                        height: 50,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onClick={(e) => setCount(count - 1)}
                >
                    -
                </div>
            </div>
        </div>
    );
};

const randomColor = () => {
    let listColor = [
        'orange',
        'red',
        'green',
        'gray',
        'yello',
        'pink',
        'aqua',
        'lightblue',
    ];

    let i = Math.floor(Math.random() * 8);

    return listColor[i] ? listColor[i] : 'gray';
};

const RandomColorBox = () => {
    const RandomItem = (props) => {
        const [bgColor, setBgColor] = useState(props.color);

        return (
            <div
                className="RandomItem"
                style={{
                    backgroundColor: bgColor,
                }}
                onClick={() => {
                    setBgColor(randomColor());
                }}
            ></div>
        );
    };

    const initColors = [];
    let numberColor = Math.floor(Math.random() * 10);
    for (let index = 0; index < numberColor; index++)
        initColors.push(randomColor());

    const [colors, setColors] = useState(initColors);

    return (
        <>
            <div className="RandomColorBox">
                {colors.map((color, index) => {
                    return <RandomItem key={index} color={color} />;
                })}
            </div>
            <div
                className="ButtonBase"
                onClick={() => {
                    let newColors = [];
                    for (let index = 0; index < colors.length; index++)
                        newColors.push(randomColor());

                    setColors(newColors);
                }}
            >
                Random All
            </div>
        </>
    );
};

const MessageChatComponent = () => {
    let initMessages = [];

    const [chatText, setChatText] = useState('');
    let [messages, setMessages] = useState(initMessages);
    let token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJzdWIiOiI2MDJkNWYwMmU5Njc3N2Q3M2E0MTdlYjAiLCJpYXQiOjE2MTQwNzMxNTgsImV4cCI6MTYxNDE1OTU1OH0.15Sp-2vxAqJLfl6-i_08UnYaQ6NMhmWSZ72uAZz825U';
    setSessionKey(token);

    let socketUrl = 'ws://localhost:3001';

    useEffect(async () => {
        getOldMessage();
    }, []);

    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
        protocols: token,
        onMessage: (evt) => {
            const message = JSON.parse(evt.data);

            if (message.event === 'msgToClient') {
                try {
                    let data = message.data;

                    if (data.from && data.content) {
                        let _messages = messages;
                        _messages.push({
                            from: data.from ? data.from : '',
                            content: data.content ? data.content : '',
                        });

                        setMessages(_messages);

                    }
                } catch (ex) {}
            }
        },
    });

    const getOldMessage = async () => {
        // alert('anc');

        try {
            let res = await getListMessage();

            let messages = _.map(res, (item) => {
                return _.pick(item, ['from', 'content', 'timestamp']);
            });
            messages = _.slice(messages, 0, 5);
            messages = _.reverse(messages);

            setMessages(messages);
        } catch {}
    };

    const _handleClickAddMessage = () => {
        let text = chatText;
        if (text === '') return;

        const message = {
            event: 'message',
            data: {
                content: text,
            },
        };
        sendMessage(JSON.stringify(message));

        setChatText('');
    };

    return (
        <div className="ChatApp">
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

const Main = () => {
    return (
        <React.Fragment>
            {/* <CountingComponent />
            <RandomColorBox /> */}
            <MessageChatComponent />
        </React.Fragment>
    );
};

export default Main;
