import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme: "light"
    },
    reducers: {
        changeToDark: (state) => {
            state.theme = 'dark'
        },
        changeToLight: (state) => {
            state.theme = 'light'
        },
    }
})

export const { changeToDark, changeToLight } = themeSlice.actions

export default themeSlice.reducer