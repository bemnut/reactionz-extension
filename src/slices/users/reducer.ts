import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "./thunk";

// interface Item {
//     contacts: [];
//     error: {};
// }

// export const initialState = {} as Item;

export const initialState = {
    users: [],
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //  GET CONVESATIONS
        builder.addCase(getUsers.fulfilled, (state, action: any) => {
            state.users = [];
            if (action.payload.status == "success") {
                state.users = action.payload.data;
            } else {
                state.error = action.payload?.message;
            }
        });
        builder.addCase(getUsers.rejected, (state, action: any) => {
            state.error = action.payload?.message || null;
        });
    },
});
export const {} = userSlice.actions;
export default userSlice.reducer;
