import React, { useEffect, useState } from 'react';
import './index.scss';

// context
import { useTheme, themes } from '../../context';
import { languages, useLanguage } from '../../context/language.context';
import { NotificationsService } from '../../utils/helper';
import { useDispatch } from 'react-redux';
import { useActions } from '../../redux';

const LoginPage = () => {
    const { t } = useLanguage();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch()
    const actions =  useActions()

    useEffect(() => {});

    const _handleLogin = () => {
        dispatch(actions.AuthActions.login(username, password))
    };

    return (
        <div className="LoginPage">
            <div className="LGP_LoginPanel">
                <div className="LGP_RowInfo" style={{ marginBottom: 0 }}>
                    <img
                        src="http://localhost:3002/upload/2ccf1bf0-1613853625503.png"
                        className="LGP_LogoImage"
                    />
                </div>

                <div className="LGP_RowInfo">
                    <div className="LGP_RowInfoTitle">{t('username')}</div>
                    <div className="LGP_RowInfoContent">
                        <input
                            value={username}
                            onChange={(e) => {
                                setUserName(e.target.value);
                            }}
                            type="text"
                            className="LGP_RowInfoTextBox"
                            onKeyPress={(e) => {
                                if (e.key === "Enter")
                                    _handleLogin()
                            }}
                        />
                    </div>
                </div>

                <div className="LGP_RowInfo">
                    <div className="LGP_RowInfoTitle">{t('password')}</div>
                    <div className="LGP_RowInfoContent">
                        <input
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            type="password"
                            className="LGP_RowInfoTextBox"
                            onKeyPress={(e) => {
                                if (e.key === "Enter")
                                    _handleLogin()
                            }}
                        />
                    </div>
                </div>

                <div
                    className="LGP_ControlPanel"
                    onClick={() => {
                        _handleLogin();
                    }}
                >
                    <div className="LGP_Button">{t('login')}</div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
