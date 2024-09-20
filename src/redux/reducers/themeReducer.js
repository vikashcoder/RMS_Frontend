import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: {theme : "light"},
    reducers: {
        changeTheme(state,action){
            state.theme = action.payload
        }
    }
})

export default themeSlice.reducer;

export const { 
    changeTheme
} = themeSlice.actions;
