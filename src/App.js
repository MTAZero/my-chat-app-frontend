import logo from './logo.svg';
import './App.scss';

import React, { useState, useCallback, useEffect } from 'react';
import { setLocalData, setSessionKey } from './utils/helper';
import { getListMessage } from './utils/api/message';
import * as _ from 'lodash';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import LoginPage from './pages/login-page';
import ChatPage from './pages/chat-page';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux/reducers'

const store = createStore(rootReducer);

const Main = () => {
    return (
        <Provider store={store}>
            <Router>
                <h1>My Chat Application</h1>
                <Switch>
                    <Route path="/login">
                        <LoginPage />
                    </Route>
                    <Route path="/chat-page">
                        <ChatPage />
                    </Route>
                    <Redirect to="/login" />
                </Switch>
            </Router>
        </Provider>
    );
};

export default Main;
