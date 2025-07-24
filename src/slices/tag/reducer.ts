import { createSlice } from "@reduxjs/toolkit";
import { getTags } from "./thunk";

// interface Item {
//     contacts: [];
//     error: {};
// }

// export const initialState = {} as Item;

export const initialState = {
    tags: [],
    error: null,
};

const tagSlice = createSlice({
    name: "tag",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //  GET CONVESATIONS
        builder.addCase(getTags.fulfilled, (state, action: any) => {
            state.tags = [];
            if (action.payload.status == "success") {
                state.tags = action.payload.data;
            } else {
                state.error = action.payload?.message;
            }
        });
        builder.addCase(getTags.rejected, (state, action: any) => {
            state.error = action.payload?.message || null;
        });
    },
});
export const {} = tagSlice.actions;
export default tagSlice.reducer;
