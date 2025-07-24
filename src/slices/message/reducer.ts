import { createSlice } from "@reduxjs/toolkit";
import {
    getConversations,
    updateConversationStatus,
    getContactConversations,
    markConversationAsRead,
    sendTextMessage,
    sendAttachment,
    sendTemplateMessage,
    sendCampaignMessage,
    getMessageSnippets,
} from "./thunk";

// interface Item {
//     contacts: [];
//     error: {};
// }

// export const initialState = {} as Item;

export const initialState = {
    conversations: [],
    messages: [],
    messageSnippets: [],
    error: null,
    isMessageSent: false,
    isConversationUpdated: false,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        changeIsMessageSent(state, action) {
            state.isMessageSent = action.payload;
        },
        changeIsConversationStatusUpdated(state, action) {
            state.isConversationUpdated = action.payload;
        },
        changeMessageSnippet(state, action) {
            state.messageSnippets = action.payload;
        },
    },
    extraReducers: (builder) => {
        //  GET CONVESATIONS
        builder.addCase(getConversations.fulfilled, (state, action: any) => {
            state.conversations = [];
            state.isConversationUpdated = false;
            if (action.payload?.status == "success") {
                state.conversations = action.payload.data;
            } else {
                state.error = action.payload?.message;
            }
        });
        builder.addCase(getConversations.rejected, (state, action: any) => {
            state.error = action.payload?.message || null;
        });

        // UPDATE CONVERSATION

        builder.addCase(
            updateConversationStatus.fulfilled,
            (state, action: any) => {
                state.isConversationUpdated = false;
                state.messages = [];
                if (action.payload.status == "success") {
                    state.isConversationUpdated = true;
                } else {
                    state.error = action.payload?.message;
                }
            }
        );
        builder.addCase(
            updateConversationStatus.rejected,
            (state, action: any) => {
                state.isConversationUpdated = false;
                state.error = action.payload?.errMsg || null;
            }
        );

        // GET MESSAGES
        builder.addCase(
            getContactConversations.fulfilled,
            (state, action: any) => {
                state.isMessageSent = false;
                state.messages = [];
                if (action.payload.status == "success") {
                    state.messages = action.payload.data;
                } else {
                    state.error = action.payload?.message;
                }
            }
        );
        builder.addCase(
            getContactConversations.rejected,
            (state, action: any) => {
                state.error = action.payload?.message || null;
            }
        );

        // MARK CONVERSATION AS READ
        builder.addCase(
            markConversationAsRead.fulfilled,
            (state, action: any) => {
                if (action.payload.status == "success") {
                    //state.messages = action.payload.data;
                } else {
                    state.error = action.payload?.message;
                }
            }
        );
        builder.addCase(
            markConversationAsRead.rejected,
            (state, action: any) => {
                state.error = action.payload?.message || null;
            }
        );

        // SEND TEXT MESSAGE
        builder.addCase(sendTextMessage.fulfilled, (state, action) => {
            state.isMessageSent = false;
            if (action.payload.status == "success") {
                state.isMessageSent = true;
            } else {
                state.error = action.payload?.message;
            }
        });
        builder.addCase(sendTextMessage.rejected, (state, action: any) => {
            state.error = action.payload?.message || null;
        });

        // SEND ATTACHMENT MESSAGE
        builder.addCase(sendAttachment.fulfilled, (state, action) => {
            state.isMessageSent = false;
            if (action.payload.status == "success") {
                state.isMessageSent = true;
            } else {
                state.error = action.payload?.message;
            }
        });
        builder.addCase(sendAttachment.rejected, (state, action: any) => {
            state.error = action.payload?.message || null;
        });

        // SEND TEMPLATE MESSAGE
        builder.addCase(sendTemplateMessage.fulfilled, (state, action) => {
            state.isMessageSent = false;
            if (action.payload.status == "success") {
                state.isMessageSent = true;
            } else {
                state.error = action.payload?.message;
            }
        });
        builder.addCase(sendTemplateMessage.rejected, (state, action: any) => {
            state.error = action.payload?.message || null;
        });

        // SEND CAMPAIGN MESSAGE
        builder.addCase(sendCampaignMessage.fulfilled, (state, action) => {
            state.isMessageSent = false;
            if (action.payload.status == "success") {
                state.isMessageSent = true;
            } else {
                state.error = action.payload?.message;
            }
        });
        builder.addCase(sendCampaignMessage.rejected, (state, action: any) => {
            state.error = action.payload?.message || null;
        });

        // SEND CAMPAIGN MESSAGE
        builder.addCase(getMessageSnippets.fulfilled, (state, action) => {
            state.messageSnippets = [];
            if (action.payload.status == "success") {
                state.messageSnippets = action.payload.data;
            } else {
                state.error = action.payload?.message;
            }
        });
        builder.addCase(getMessageSnippets.rejected, (state, action: any) => {
            state.error = action.payload?.message || null;
        });
    },
});
export const {
    changeIsMessageSent,
    changeIsConversationStatusUpdated,
    changeMessageSnippet,
} = chatSlice.actions;
export default chatSlice.reducer;
