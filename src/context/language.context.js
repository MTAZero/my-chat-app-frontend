import React, { useState, useContext } from 'react';
import LanguageTranslater from '../locales'

export const languages = {
    vi: 'VI',
    en: 'EN',
    cn: 'CN'
};

const default_language = languages.vi;
const LanguageContext = React.createContext(default_language);

export const useLanguage = () => {
    const context = useContext(LanguageContext);

    return context;
};

export const LanguageProvider = ({ children, language }) => {
    const [currentLanguage, setLanguage] = useState(
        language ? language : default_language,
    );

    const saveLanguage = (language) => {
        setLanguage(language);
    };

    const t = (key) => {
        return LanguageTranslater[currentLanguage][key]
    };

    return (
        <LanguageContext.Provider
            value={{
                currentLanguage: currentLanguage,
                saveLanguage,
                t,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
};
