import { createSlice } from "@reduxjs/toolkit";
import { getLifeCycles } from "./thunk";

// interface Item {
//     contacts: [];
//     error: {};
// }

// export const initialState = {} as Item;

export const initialState = {
    lifeCycles: [],
    error: null,
};

const lifeCycleSlice = createSlice({
    name: "lifeCycle",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //  GET CONVESATIONS
        builder.addCase(getLifeCycles.fulfilled, (state, action: any) => {
            state.lifeCycles = [];
            if (action.payload.status == "success") {
                state.lifeCycles = action.payload.data;
            } else {
                state.error = action.payload?.message;
            }
        });
        builder.addCase(getLifeCycles.rejected, (state, action: any) => {
            state.error = action.payload?.message || null;
        });
    },
});
export const {} = lifeCycleSlice.actions;
export default lifeCycleSlice.reducer;
