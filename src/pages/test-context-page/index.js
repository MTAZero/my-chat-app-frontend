import React, { useContext } from 'react';
import './index.scss';

// subcomponent
import CounterControlComponent from './counter_control';
import CounterComponent from './counter';

// context
import { useTheme, themes } from '../../context';
import { languages, useLanguage } from '../../context/language.context';

const LoginPage = () => {
    let theme = useTheme();
    let language = useLanguage();
    let t = language.t;

    return (
        <>
            <div className="TestContextPage">
                <div>Use Redux example</div>
                <CounterControlComponent />
                <CounterComponent />
            </div>
            <div
                style={{
                    backgroundColor: theme.currentTheme.background,
                    color: theme.currentTheme.foreground,
                    width: 200,
                    textAlign: 'center',
                    padding: 10,
                }}
            >
                {
                    theme.currentTheme === themes.light ? 'Light Theme' : 'Dark Theme'
                }
            </div>
            <a
                href="#"
                onClick={() => {
                    let currentTheme = theme.currentTheme;
                    let nextTheme = themes.light;

                    if (currentTheme === themes.light) nextTheme = themes.dark;

                    theme.saveTheme(nextTheme);
                }}
            >
                Đổi theme
            </a>

            <div>Ngôn ngữ: {language.currentLanguage}</div>
            <div
                href="#"
                // onClick={() => {
                //     let currentLanguage = language.currentLanguage;
                //     let nextLanguage = languages.vi;

                //     if (currentLanguage === languages.vi) nextLanguage = languages.en;

                //     language.saveLanguage(nextLanguage);
                // }}
            >
                <span>
                    <a
                        href="#"
                        style={{ marginRight: 5 }}
                        onClick={() => language.saveLanguage(languages.vi)}
                    >
                        {
                            t("vi")
                        }
                    </a>
                    <a
                        href="#"
                        style={{ margin: 5 }}
                        onClick={() => language.saveLanguage(languages.en)}
                    >
                        {
                            t("en")
                        }
                    </a>
                    <a
                        href="#"
                        style={{ margin: 5 }}
                        onClick={() => language.saveLanguage(languages.cn)}
                    >
                        {
                            t("cn")
                        }
                    </a>
                </span>
            </div>
            <h3>{t('hello')}</h3>
            <h2>{t('welcometitle')}</h2>
        </>
    );
};

export default LoginPage;
