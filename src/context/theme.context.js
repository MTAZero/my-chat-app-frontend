import React, { useState, useContext } from 'react';

export const themes = {
    light: {
        foreground: '#000000',
        background: '#eeeeee',
    },
    dark: {
        foreground: '#ffffff',
        background: '#222222',
    },
};
const default_theme = themes.dark;
const ThemeContext = React.createContext(default_theme);

export const ThemeProvider = ({ children, theme }) => {
    const [currentTheme, saveCurrentTheme] = useState(
        theme ? theme : default_theme,
    );

    const saveTheme = (theme) => {
        saveCurrentTheme(theme);
    };

    return (
        <ThemeContext.Provider
            value={{
                currentTheme,
                saveTheme,
            }}
        >
            {
                children
            }
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext)

    return context
}
