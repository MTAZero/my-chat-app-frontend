import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Redirect,
    useHistory,
    useLocation,
    Switch,
    Route,
} from 'react-router-dom';
import { RouterLinks } from '../const';
import { useActions } from '../redux';

export const LoginRequireComponent = (props) => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const location = useLocation();

    const dispatch = useDispatch();
    const actions = useActions();

    useEffect(() => {
        dispatch(actions.AuthActions.checkSession());
    });

    if (!isLoggedIn) {
        if (props.redirect)
            // return <Redirect to={props.redirect} from={location.pathname} />;
            return (
                <Redirect
                    to={{
                        pathname: props.redirect,
                        state: {
                            from: location.pathname,
                        },
                    }}
                />
            );
        else
            return (
                <Redirect
                    to={{
                        pathname: RouterLinks.Login,
                        state: {
                            from: location.pathname,
                        },
                    }}
                />
            );
    }

    return (
        <Switch>
            <Route
                {...props}
                onEnter={() => {
                    dispatch(actions.AuthActions.checkSession());
                }}
            />
        </Switch>
    );
};
