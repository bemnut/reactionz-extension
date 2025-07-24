import { createAsyncThunk } from "@reduxjs/toolkit";

//Include Both Helper File with needed methods
import { getCampaigns as onGetCampaignsApi } from "../../helpers/local_backend_helper";

export const getCampaigns = createAsyncThunk(
    "campaigns/getCampaigns",
    async (user: any) => {
        try {
            const response = onGetCampaignsApi(user);
            return response;
        } catch (error) {
            return error;
        }
    }
);
