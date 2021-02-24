import React, { useState, useCallback, useEffect } from 'react';
import './App.scss';
import 'react-notifications-component/dist/theme.css';
import './resource/scss/notifycation.scss';
import * as _ from 'lodash';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

import LoginPage from './pages/login-page';
import ChatPage from './pages/chat-page';
import TestContextPage from './pages/test-context-page';
import { AdminRouter } from './routers';

import { Provider, useDispatch } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux/reducers';
import { ThemeProvider, themes } from './context';
import { LanguageProvider } from './context/language.context';
import { RouterLinks } from './const';

// lib
import ReactNotification from 'react-notifications-component';
import { NotificationsService } from './utils/helper';
import { store } from './redux/store';
import { LoginRequireComponent } from './components/login-require';

import Boot from './redux/boot'
import { useActions } from './redux';

// const store = createStore(rootReducer);

const Main = () => {
    const actions = useActions()

    useEffect(() => {
        // dispatch(actions.AuthActions.checkSession())
        store.dispatch(actions.AuthActions.checkSession())
    }, [])

    return (
        <>
            <ReactNotification />
            <ThemeProvider>
                <LanguageProvider>
                    <Provider store={store}>
                        <Router>
                            <Switch>
                                <LoginRequireComponent
                                    component={AdminRouter}
                                    path={RouterLinks.Admin}
                                />
                                <Route path={RouterLinks.Login}>
                                    <LoginPage />
                                </Route>
                                <Redirect to={RouterLinks.Login} />
                            </Switch>
                        </Router>
                    </Provider>
                </LanguageProvider>
            </ThemeProvider>
        </>
    );
};

Boot()
    .then(() => Main())
    .catch(error => console.log('render error : ', error))

export default Main;
