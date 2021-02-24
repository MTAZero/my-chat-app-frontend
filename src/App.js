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
import TestContextPage from './pages/test-context-page'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux/reducers';
import { ThemeProvider, themes } from './context';
import { LanguageProvider } from './context/language.context';

const store = createStore(rootReducer);

const Main = () => {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <Provider store={store}>

                    <Router>
                        <Switch>
                            <Route path="/test-context">
                                <TestContextPage />
                            </Route>
                            <Route path="/chat-page">
                                <ChatPage />
                            </Route>
                            <Route path="/login">
                                <LoginPage />
                            </Route>
                            <Redirect to="/login" />
                        </Switch>
                    </Router>

                </Provider>
            </LanguageProvider>
        </ThemeProvider>
    );
};

export default Main;
