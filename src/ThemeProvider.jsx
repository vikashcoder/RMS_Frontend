import React from 'react';
import { useSelector } from 'react-redux';

function ThemeProvider({ children }) {
    const {theme} = useSelector((state) => state.theme);

    const themeVariables = {
        light: {
            primaryColor: "#ffffff",
            secondaryColor: "#302D3D",
            lightgrey3: "#626573",
            lightgrey2: "#C3CDE4",
            darkviolet2: "#604BE8",
            lightgrey: "#f4f7ff",
            lightViolet2: "#f1f3ff",
            darkgrey2: "#585858"
        },
        dark: {
            primaryColor: "#000000",
            secondaryColor: "#ffffff",
            lightgrey3: "#d6d6d6",
            lightgrey2: "#787878",
            darkviolet2: "#ffffff",
            lightgrey: "#1c1c1c",
            lightViolet2: "#1f1f1f",
            darkgrey2: "#494949"
        }
    }

    const rootStyle = {
        '--white': themeVariables[theme]?.primaryColor,
        '--black': themeVariables[theme]?.secondaryColor,
        '--lightgrey3': themeVariables[theme]?.lightgrey3,
        '--lightgrey2': themeVariables[theme]?.lightgrey2,
        '--darkviolet2': themeVariables[theme]?.darkviolet2,
        '--lightgrey': themeVariables[theme]?.lightgrey,
        '--darkgrey2': themeVariables[theme]?.darkgrey2,
    }

    return (
        <div style={rootStyle}>{children}</div>
    )
}

export default ThemeProvider