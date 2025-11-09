import { createAsyncThunk } from "@reduxjs/toolkit";

//Include Both Helper File with needed methods
import {
    getConversations as onGetConversationsApi,
    getContactConversations as onGetContactConversationsApi,
    sendTextMessage as onSendTextMessageApi,
    sendAttachment as onSendAttachmentApi,
    sendTemplateMessage as onSendTemplateMessageApi,
    sendCampaignMessage as onSendCampaignMessageApi,
    updateConversationStatus as onUpdateConversationStatusApi,
    markConversationAsRead as onMarkConversationAsReadApi,
    markConversationAsUnRead as onMarkConversationAsUnReadApi,
    getMessageSnippets as onGetMessageSnippetsApi,
} from "../../helpers/local_backend_helper";

import {
    changeIsMessageSent as changeIsMessageSentAction,
    changeIsConversationStatusUpdated as changeIsConversationStatusUpdatedAction,
    changeMessageSnippet as changeMessageSnippetAction,
} from "./reducer";

export const changeIsMessageSent = (payload) => async (dispatch) => {
    try {
        dispatch(changeIsMessageSentAction(payload));
    } catch (error) {}
};

export const changeIsConversationStatusUpdated =
    (payload) => async (dispatch) => {
        try {
            dispatch(changeIsConversationStatusUpdatedAction(payload));
        } catch (error) {}
    };
export const changeMessageSnippet = (payload) => async (dispatch) => {
    try {
        dispatch(changeMessageSnippetAction(payload));
    } catch (error) {}
};

export const getConversations = createAsyncThunk(
    "messages/getConversations",
    async (payload: any) => {
        try {
            const response = onGetConversationsApi(payload);
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const updateConversationStatus = createAsyncThunk(
    "messages/updateConversationStatus",
    async (payload: any) => {
        try {
            const response = onUpdateConversationStatusApi(payload);
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const getContactConversations = createAsyncThunk(
    "messages/getContactConversations",
    async (payload: any) => {
        try {
            const response = onGetContactConversationsApi(payload);
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const markConversationAsRead = createAsyncThunk(
    "messages/markConversationAsRead",
    async (payload: any) => {
        try {
            const response = onMarkConversationAsReadApi(payload);
            return response;
        } catch (error) {
            return error;
        }
    }
);
export const markConversationAsUnRead = createAsyncThunk(
    "messages/markConversationAsUnRead",
    async (payload: any) => {
        try {
            const response = onMarkConversationAsUnReadApi(payload);
            return response;
        } catch (error) {
            return error;
        }
    }
);



export const sendTextMessage = createAsyncThunk(
    "messages/sendTextMessage",
    async (payload: any) => {
        try {
            const response: any = await onSendTextMessageApi(payload);
            return response;
            // if (response.status === "success")
            //     toast.success(response.message, {
            //         autoClose: 3000,
            //     });
        } catch (error) {
            return error;
        }
    }
);

export const sendAttachment = createAsyncThunk(
    "messages/sendAttachment",
    async (payload: any) => {
        try {
            const response: any = await onSendAttachmentApi(payload);
        } catch (error) {
            return error;
        }
    }
);

export const sendTemplateMessage = createAsyncThunk(
    "messages/sendTemplateMessage",
    async (payload: any) => {
        try {
            const response: any = await onSendTemplateMessageApi(payload);
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const sendCampaignMessage = createAsyncThunk(
    "messages/sendCampaignMessage",
    async (payload: any) => {
        try {
            const response: any = await onSendCampaignMessageApi(payload);
            return response;
            // if (response.status === "success")
            //     toast.success(response.message, {
            //         autoClose: 3000,
            //     });
        } catch (error) {
            // toast.error(error.message, {
            //   autoClose: 3000,
            // });
            return error;
        }
    }
);

export const getMessageSnippets = createAsyncThunk(
    "messages/getMessageSnippets",
    async (payload: any) => {
        try {
            const response = onGetMessageSnippetsApi(payload);
            return response;
        } catch (error) {
            return error;
        }
    }
);
