import { createAsyncThunk } from "@reduxjs/toolkit";

//Include Both Helper File with needed methods
import {
    uploadFile as onUploadFileApi,
    getUploadStatus as onGetUploadStatusApi,
} from "../../helpers/local_backend_helper";

import {
    changeFileState as changeFileStateAction,
    changeFileStatusState as changeFileStatusStateAction,
} from "./reducer";

export const changeFileState = (payload) => async (dispatch) => {
    try {
        dispatch(changeFileStateAction(payload));
    } catch (error) {}
};
export const changeFileStatusState = (payload) => async (dispatch) => {
    try {
        dispatch(changeFileStatusStateAction(payload));
    } catch (error) {}
};

export const uploadFile = createAsyncThunk(
    "files/uploadFile",
    async (payload: any) => {
        try {
            const response: any = await onUploadFileApi(payload);
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const getUploadStatus = createAsyncThunk(
    "files/getUploadStatus",
    async (payload: any) => {
        try {
            const response: any = await onGetUploadStatusApi(payload);
            return response;
        } catch (error) {
            return error;
        }
    }
);
