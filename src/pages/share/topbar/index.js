import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouterLinks } from '../../../const';
import { NotificationsService } from '../../../utils/helper';

import { Link } from 'react-router-dom';

import './index.scss';
import { useActions } from '../../../redux';

const TopBar = () => {
    const userInfo = useSelector((state) => state.auth.userInfo);

    const dispatch = useDispatch();
    const actions = useActions();

    /// handle
    const _handleLogout = () => {
        dispatch(actions.AuthActions.logout());
    };

    return (
        <div className="TopBar">
            {userInfo.fullname}

            <Link onClick={() => _handleLogout()}>Đăng xuất </Link>
        </div>
    );
};

export default TopBar;
