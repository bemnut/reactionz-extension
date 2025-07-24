import { createAsyncThunk } from "@reduxjs/toolkit";

//Include Both Helper File with needed methods
import { getTemplates as onGetTemplatesApi } from "../../helpers/local_backend_helper";

export const getTemplates = createAsyncThunk(
    "templates/getTemplates",
    async (payload?: any) => {
        try {
            const response = onGetTemplatesApi(payload);
            return response;
        } catch (error) {
            return error;
        }
    }
);
