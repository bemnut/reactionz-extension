import { createAsyncThunk } from "@reduxjs/toolkit";

//Include Both Helper File with needed methods
import {
    getNotifications as onGetNotificationsApi,
    updateNotification as onUpdateNotificationApi,
} from "../../helpers/local_backend_helper";

import {
    changeIsNotificaitonUpdated as changeIsNotificaitonUpdatedAction,
} from "./reducer";

export const changeIsNotificaitonUpdated =
    (payload) => async (dispatch) => {
        try {
            dispatch(changeIsNotificaitonUpdatedAction(payload));
        } catch (error) {}
    };

export const getNotifications = createAsyncThunk(
    "notifications/getNotifications",
    async () => {
        try {
            const response = onGetNotificationsApi();
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const updateNotification = createAsyncThunk(
    "notifications/updateNotifications",
    async (payload: any) => {
        try {
            const response = onUpdateNotificationApi(payload);
            return response;
        } catch (error) {
            return error;
        }
    }
);

