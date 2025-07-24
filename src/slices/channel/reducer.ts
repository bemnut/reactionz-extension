import { createSlice } from "@reduxjs/toolkit";
import { getChannels } from "./thunk";
import type { PayloadAction } from "@reduxjs/toolkit";

// interface Item {
//     contacts: [];
//     error: {};
// }

// export const initialState = {} as Item;

export const initialState = {
    channels: [],
    error: null,
};

const channelSlice = createSlice({
    name: "channel",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //  GET CONVESATIONS
        builder.addCase(getChannels.fulfilled, (state, action: any) => {
            state.channels = [];
            if (action.payload.status == "success") {
                state.channels = action.payload.data;
            } else {
                state.error = action.payload?.message;
            }
        });
        builder.addCase(getChannels.rejected, (state, action: any) => {
            state.error = action.payload?.message || null;
        });
    },
});
export const {} = channelSlice.actions;
export default channelSlice.reducer;
