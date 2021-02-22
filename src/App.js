import logo from './logo.svg';
import './App.css';

import React from 'react';
import { setLocalData, setSessionKey } from './utils/helper';
import { getListMessage } from './utils/api/message';
import * as _ from "lodash"

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
        this._connectSocket()
    };

    // api
    getOldMessage = async () => {
        try {
            let res = await getListMessage()
            
            let messages = _.map(res, (item) => {
                return _.pick(item, ["from", "content", "timestamp"])
            })

            this.setState({
                messages
            })
        }
        catch (ex){

        }
    }

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

            this.getOldMessage()
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

export default App;
