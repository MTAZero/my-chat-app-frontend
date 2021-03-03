import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RouterLinks } from '../../../const';

import { Layout, Menu, Breadcrumb } from 'antd';
import { SettingFilled, MessageFilled } from '@ant-design/icons';

import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useActions } from '../../../redux';
import { useLanguage } from '../../../context/language.context';
import { themes, useTheme } from '../../../context';
import { useWindowSize } from '../../../hooks';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const SideBar = () => {
    const collapsed = useSelector((state) => state.ui_global.sidebar_collapse);
    const dispatch = useDispatch();
    const actions = useActions();

    // widow size 
    let windowSize = useWindowSize()
    useEffect(() => {
        if (windowSize.width<800)
            setCollapsed(true)

        if (windowSize.width>1300)
            setCollapsed(false)
    }, [])

    // theme and lange
    const [mode, setMode] = useState('inline');
    let theme = ''

    const { t } = useLanguage();
    let themeLocal = useTheme()

    if (themeLocal.currentTheme === themes.dark)
        theme = 'dark'
    else 
        theme = 'light'

    const setCollapsed = (collapsed) => {
        dispatch(actions.UIGlobalActions.updateSidebarCollapse(collapsed));
    };

    const onCollapse = (collapsed) => {
        console.log(collapsed);
        setCollapsed(collapsed);
    };

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            width={250}
            className="SideBar"
        >
            <div
                className="SB_Logo"
                style={{
                    fontSize: collapsed ? 14 : 18,
                }}
                onClick={() => {
                    setCollapsed(!collapsed);
                }}
            >
                SPEEDX
            </div>
            <Menu theme={theme} defaultSelectedKeys={['1']} mode={mode}>
                <Menu.Item key="1" icon={<MessageFilled />}>
                    <Link to={RouterLinks.ChatPage}>{t('chatting')}</Link>
                </Menu.Item>

                <Menu.Item key="2" icon={<SettingFilled />}>
                    <Link to={RouterLinks.TestContext}>{t('setting')}</Link>
                </Menu.Item>

                {/* <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<FileOutlined />}>
                    Quản lý danh sách bot
                </Menu.Item> */}
            </Menu>
        </Sider>
    );
};

export default SideBar;
