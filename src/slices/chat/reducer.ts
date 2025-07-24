import { createSlice } from "@reduxjs/toolkit";
import { getDirectContact, addMessage, deleteMessage } from "./thunk";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Item {
    chats: [];
    messages: [];
    channels: [];
    error: {};
}

export const initialState = {} as Item;

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getDirectContact.fulfilled, (state, action) => {
            state.chats = action.payload;
        });
        builder.addCase(getDirectContact.rejected, (state, action) => {
            state.error = action.payload || null;
        });

        builder.addCase(addMessage.fulfilled, (state, action) => {
            //state.messages.push(action.payload);
        });
        builder.addCase(addMessage.rejected, (state, action) => {
            state.error = action.payload || null;
        });

        builder.addCase(deleteMessage.fulfilled, (state, action) => {
            //state.messages = (state.messages || []).filter((message) => message.id.toString() !== action.payload.toString());
        });
        builder.addCase(deleteMessage.rejected, (state, action) => {
            state.error = action.payload || null;
        });
    },
});

export default chatSlice.reducer;
