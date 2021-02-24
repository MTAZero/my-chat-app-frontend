import React, { useContext } from 'react';
import './index.scss';

// context
import { useTheme, themes } from '../../context';
import { languages, useLanguage } from '../../context/language.context';

const LoginPage = () => {
    const { t } = useLanguage();

    return (
        <div className="LoginPage">
            <div className="LGP_LoginPanel">
                <div className="LGP_RowInfo" style={{marginBottom: 0}}>
                    <img
                        src="http://localhost:3002/upload/2ccf1bf0-1613853625503.png"
                        className="LGP_LogoImage"
                    />
                </div>

                <div className="LGP_RowInfo">
                    <div className="LGP_RowInfoTitle">{t('username')}</div>
                    <div className="LGP_RowInfoContent">
                        <input type="text" className="LGP_RowInfoTextBox" />
                    </div>
                </div>

                <div className="LGP_RowInfo">
                    <div className="LGP_RowInfoTitle">{t('password')}</div>
                    <div className="LGP_RowInfoContent">
                        <input type="password" className="LGP_RowInfoTextBox" />
                    </div>
                </div>

                <div className="LGP_ControlPanel">
                    <div className="LGP_Button">{t('login')}</div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
