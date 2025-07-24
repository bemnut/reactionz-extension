import { createSlice } from "@reduxjs/toolkit";
import { getCampaigns } from "./thunk";

// interface Item {
//     contacts: [];
//     error: {};
// }

// export const initialState = {} as Item;

export const initialState = {
    campaigns: [],
    error: null,
};

const campaignSlice = createSlice({
    name: "campaign",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //  GET TEMPLATES
        builder.addCase(getCampaigns.fulfilled, (state, action: any) => {
            state.campaigns = [];
            if (action.payload.status == "success") {
                state.campaigns = action.payload.items;
            } else {
                state.error = action.payload?.errMsg;
            }
        });
        builder.addCase(getCampaigns.rejected, (state, action: any) => {
            state.error = action.payload?.errMsg || null;
        });
    },
});

export default campaignSlice.reducer;
