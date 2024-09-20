import { changeTheme } from "../reducers/themeReducer";

export const updateTheme = (theme,isDarkMode) => (dispatch) => {
    localStorage.setItem('isDarkMode', isDarkMode);
      dispatch(changeTheme(theme));
};