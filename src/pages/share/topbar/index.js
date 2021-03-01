import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// const
import { RouterLinks } from '../../../const';

// lib
import { Layout, Menu, Popover } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';

import './index.scss';
import { useActions } from '../../../redux';

// icon
import { FaLock, FaSignOutAlt } from 'react-icons/fa';

const { Header } = Layout;

const TopBar = () => {
    const userInfo = useSelector((state) => state.auth.userInfo);

    const dispatch = useDispatch();
    const actions = useActions();

    const collapse = useSelector((state) => state.ui_global.sidebar_collapse);

    /// handle
    const _handleLogout = () => {
        dispatch(actions.AuthActions.logout());
    };

    const _handleUpdateCollapse = () => {
        dispatch(actions.UIGlobalActions.updateSidebarCollapse(!collapse));
    };

    // render
    const renderUserInfo = () => {
        return (
            <div className="TB_InfoPopOver">
                <div className="AvatarPanel">
                    <img
                        className="TB_InfoAvatarInPanel"
                        src={userInfo.avatar}
                    />
                    <div className="TB_InfoFullName">{userInfo.fullname}</div>
                </div>
                <div className="MenuPanel">
                    <div className="TB_MP_RowInfo">
                        <FaLock className="TB_MP_Icon" />
                        Đổi mật khẩu
                    </div>
                    <div className="TB_MP_RowInfo"
                        onClick={() => {
                            _handleLogout()
                        }}
                    >
                        <FaSignOutAlt className="TB_MP_Icon" />
                        Đăng xuất
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="TopBar">
            <div className="TB_SettingCollapse">
                <div
                    className="TB_IconControl"
                    onClick={() => {
                        _handleUpdateCollapse();
                    }}
                >
                    <UnorderedListOutlined />
                </div>
            </div>
            <div className="TB_UserInfo">
                <Popover
                    placement="bottomRight"
                    content={renderUserInfo}
                    trigger="click hover"
                >
                    <img className="TB_InfoAvatar" src={userInfo.avatar} />
                </Popover>
            </div>
        </div>
    );
};

export default TopBar;
