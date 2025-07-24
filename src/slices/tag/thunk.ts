import { createAsyncThunk } from "@reduxjs/toolkit";

//Include Both Helper File with needed methods
import { getTags as onGetTagsApi } from "../../helpers/local_backend_helper";

export const getTags = createAsyncThunk("tags/getTags", async () => {
    try {
        const response = onGetTagsApi();
        return response;
    } catch (error) {
        return error;
    }
});
