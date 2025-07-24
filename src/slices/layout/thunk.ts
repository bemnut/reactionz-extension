import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    changeLanguage as changeLanguageAction,
    changeExtensionWindowStatus as changeExtensionWindowStatusAction,
    changeShowOnFireberry as changeShowOnFireberryAction,
} from "./reducer";

export const changeLanguage = (payload) => async (dispatch) => {
    try {
        dispatch(changeLanguageAction(payload));
    } catch (error) {}
};

export const changeExtensionWindowStatus = (payload) => async (dispatch) => {
    try {
        dispatch(changeExtensionWindowStatusAction(payload));
    } catch (error) {}
};

export const changeShowOnFireberry = (payload) => async (dispatch) => {
    try {
        dispatch(changeShowOnFireberryAction(payload));
    } catch (error) {}
};
