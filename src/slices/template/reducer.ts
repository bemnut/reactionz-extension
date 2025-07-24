import { createSlice } from "@reduxjs/toolkit";
import { getTemplates } from "./thunk";

// interface Item {
//     contacts: [];
//     error: {};
// }

// export const initialState = {} as Item;

export const initialState = {
    templates: [],
    error: null,
};

const templateSlice = createSlice({
    name: "template",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //  GET TEMPLATES
        builder.addCase(getTemplates.fulfilled, (state, action: any) => {
            state.templates = [];
            if (action.payload.status == "success") {
                state.templates = action.payload.data;
            } else {
                state.error = action.payload?.message;
            }
        });
        builder.addCase(getTemplates.rejected, (state, action: any) => {
            state.error = action.payload?.message || null;
        });
    },
});

export default templateSlice.reducer;
