import { createSlice } from "@reduxjs/toolkit";
import { getNotifications, updateNotification } from "./thunk";

// interface Item {
//     contacts: [];
//     error: {};
// }

// export const initialState = {} as Item;

export const initialState = {
    notification: [],
    isNotificationUpdated: false,
    error: null,
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        changeIsNotificaitonUpdated(state, action) {
            state.isNotificationUpdated = action.payload;
        },
    },
    extraReducers: (builder) => {
        //  GET NOTIFICATIONS
        builder.addCase(getNotifications.fulfilled, (state, action: any) => {
            state.notification = [];
            state.isNotificationUpdated = false;
            if (action.payload?.success == true) {
                state.notification = action.payload.data;
            } else {
                state.error = action.payload?.message;
            }
        });
        builder.addCase(getNotifications.rejected, (state, action: any) => {
            state.error = action.payload?.message || null;
        });

        // UPDATE NOTIFICATION

        builder.addCase(updateNotification.fulfilled, (state, action: any) => {
            state.isNotificationUpdated = false;
            state.notification = [];
            if (action.payload.success == true) {
                state.isNotificationUpdated = true;
            } else {
                state.error = action.payload?.message;
            }
        });
        builder.addCase(updateNotification.rejected, (state, action: any) => {
            state.isNotificationUpdated = false;
            state.error = action.payload?.errMsg || null;
        });
    },
});
export const { changeIsNotificaitonUpdated } = notificationSlice.actions;
export default notificationSlice.reducer;
