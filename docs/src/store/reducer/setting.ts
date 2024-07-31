import {createSlice} from "@reduxjs/toolkit";

export interface SettingState {
    theme: "light" | "dark" | "system"
    showNotice: boolean
}

/* base */
const initialState: SettingState = {
    theme: "light",
    showNotice: true
}
const settingSlice= createSlice({
    name: "setting",
    initialState: {
        theme: "light",
        showNotice: true
    },
    reducers: {
        updatedSetting(state, action) {
        }
    }
})


/* selector */
const selectTheme = (state: SettingState) => state.theme

export const { updatedSetting } = settingSlice.actions
export default settingSlice.reducer