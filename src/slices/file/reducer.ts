import { createSlice } from "@reduxjs/toolkit";
import { uploadFile,getUploadStatus } from "./thunk";
import type { PayloadAction } from "@reduxjs/toolkit";

// interface Item {
//     contacts: [];
//     error: {};
// }

// export const initialState = {} as Item;

export const initialState = {
    file: null,
    fileStatus: null,
    error: null,
};

const channelSlice = createSlice({
    name: "channel",
    initialState,
    reducers: {
        changeFileState(state, action) {
            state.file = action.payload;
        },
        changeFileStatusState(state, action) {
            state.fileStatus = action.payload;
        },
    },
    extraReducers: (builder) => {
        //  GET CONVESATIONS
        builder.addCase(uploadFile.fulfilled, (state, action: any) => {
            state.file = null;
            if (action.payload.status == "success") {
                state.file = action.payload.data;
            } else {
                state.error = action.payload?.message;
            }
        });
        builder.addCase(uploadFile.rejected, (state, action: any) => {
            state.error = action.payload?.message || null;
        });

        builder.addCase(getUploadStatus.fulfilled, (state, action: any) => {
            state.fileStatus = null;
            if (action.payload.status == "success") {
                state.fileStatus = action.payload.data;
            } else {
                state.error = action.payload?.message;
            }
        });
        builder.addCase(getUploadStatus.rejected, (state, action: any) => {
            state.error = action.payload?.message || null;
        });
    },
});
export const { changeFileState, changeFileStatusState } = channelSlice.actions;
export default channelSlice.reducer;
