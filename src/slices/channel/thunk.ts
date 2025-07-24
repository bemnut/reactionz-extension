import { createAsyncThunk } from "@reduxjs/toolkit";

//Include Both Helper File with needed methods
import { getChannels as onGetChannelsApi } from "../../helpers/local_backend_helper";

export const getChannels = createAsyncThunk(
    "channels/getChannels",
    async () => {
        try {
            const response = onGetChannelsApi();
            return response;
        } catch (error) {
            return error;
        }
    }
);
