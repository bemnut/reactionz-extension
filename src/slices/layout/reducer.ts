import { createSlice } from "@reduxjs/toolkit";

var lang = null;
chrome.storage.local.get("local_language", function (result) {
    lang = result.local_language;
});

var extWindowStatus = null;
chrome.storage.local.get("extension_window_status", function (result) {
    extWindowStatus = result.local_language;
});

export const initialState = {
    language: lang,
    extensionWindowStatus: "minimize-window",
    showOnFireberryStatus: "show",
};

const layoutSlice = createSlice({
    name: "layout",
    initialState,
    reducers: {
        changeLanguage(state, action) {
            state.language = action.payload;
        },
        changeExtensionWindowStatus(state, action) {
            state.extensionWindowStatus = action.payload;
        },
        changeShowOnFireberry(state, action) {
            state.showOnFireberryStatus = action.payload;
        },
    },
    extraReducers: (builder) => {
        //  GET CONVESATIONS
    },
});
export const {
    changeLanguage,
    changeExtensionWindowStatus,
    changeShowOnFireberry,
} = layoutSlice.actions;
export default layoutSlice.reducer;
