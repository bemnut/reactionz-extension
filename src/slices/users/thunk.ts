import { createAsyncThunk } from "@reduxjs/toolkit";

//Include Both Helper File with needed methods
import { getUsers as onGetUsersApi } from "../../helpers/local_backend_helper";

export const getUsers = createAsyncThunk(
    "users/getUsers",
    async (payload: any) => {
        try {
            const response = onGetUsersApi(payload);
            return response;
        } catch (error) {
            return error;
        }
    }
);
