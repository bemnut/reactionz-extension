import { createAsyncThunk } from "@reduxjs/toolkit";

//Include Both Helper File with needed methods
import { getLifeCycles as onGetLifeCyclesApi } from "../../helpers/local_backend_helper";

export const getLifeCycles = createAsyncThunk(
    "lifeCycles/getLifeCycles",
    async () => {
        try {
            const response = onGetLifeCyclesApi();
            return response;
        } catch (error) {
            return error;
        }
    }
);
