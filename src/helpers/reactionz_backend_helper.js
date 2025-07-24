import { ReactionzAPIClient } from "./api_helper";
import * as url from "./reactionz_url_helper";
import * as Reactionz from "./common-functions/common_functions";

const api = new ReactionzAPIClient();

//  COMMENTS
export const createComment = (comment) =>
    api.create(`${url.CREATE_A_COMMENT}/${comment.identifier}/comment`, {
        comment,
    });

//  CONTACTS
export const getContact = (identifier) =>
    api.get(`${url.GET_A_CONTACT}/id:${identifier}`);

export const addContact = ({ identifier, contact }) =>
    api.create(`${url.CREATE_A_CONTACT}/email:${identifier}`, contact);

export const updateContact = ({ identifier, contact }) =>
    api.update(`${url.UPATE_A_CONTACT}/id:${identifier}`, contact);
export const deleteContact = (identifier) =>
    api.delete(`${url.DELETE_A_CONTACT}/id:${identifier}`);

export const addOrUpdateContact = (contact) =>
    api.create(`${url.CREATE_OR_UPDATE_A_CONTACT}/${contact.identifier}`, {
        contact,
    });
export const mergeContacts = (data) =>
    api.create(`${url.MERGE_TWO_CONTACTS}/${data.identifier}`, {
        data,
    });
export const listContacts = () =>
    Reactionz.getAllPaginatedResponseFromReactionz("contacts");
//Reactionz.getTheContactsList();
//Reactionz.getAllPaginatedResponseFromReactionz("contacts");

export const addContactTags = ({ identifier, tags }) =>
    api.create(`${url.ADD_CONTACT_TAGS}/id:${identifier}/tag`, tags);

export const deleteContactTags = ({ identifier, tags }) =>
    api.delete(`${url.DELETE_CONTACT_TAGS}/id:${identifier}/tag`, tags);

export const listContactChannels = (identifier) =>
    Reactionz.getAllPaginatedResponseFromReactionz(
        "contact channels",
        identifier
    );
//await Reactionz.getTheContactChannelsList(identifier);
//api.get(`${url.LIST_CONTACT_CHANNELS}/id:${identifier}/channels`);

//  CONVERSATIONS
export const assignUnassignAConversation = ({ identifier, assignee }) =>
    api.create(
        `${url.ASSIGN_UNASSIGN_A_CONVERSATION}/id:${identifier}/conversation/assignee`,
        assignee
    );
export const changeConversationStatus = ({ identifier, status }) =>
    api.create(
        `${url.ASSIGN_UNASSIGN_A_CONVERSATION}/id:${identifier}/conversation/status`,
        { status }
    );

//  MESSAGES
export const sendAMessage = ({ identifier, message }) =>
    api.create(`${url.SEND_A_MESSAGE}/id:${identifier}/message`, message);
export const getAMessage = ({ identifier, sentMessageId }) =>
    api.get(`${url.GET_A_MESSAGE}/id:${identifier}/message/${sentMessageId}`);

//  SPACE
export const listUsers = () =>
    Reactionz.getAllPaginatedResponseFromReactionz("users");
//Reactionz.getAllPaginatedResponseFromReactionz("users");

//Reactionz.getTheUsersList();
//
export const getUser = (userId) => api.get(`${url.LIST_USERS}/${userId}`);

export const createACustomField = (customField) =>
    api.create(url.CREATE_A_CUSTOM_FIELD, customField);
export const getACustomField = (customFieldId) =>
    api.get(`${url.GET_A_CUSTOM_FIELD}/${customFieldId}`);
export const listCustomFields = (cursorId, limit) =>
    api.get(url.LIST_CUSTOM_FIELDS, {
        params: { cursorId, limit },
    });
export const listClosingNotes = (cursorId, limit) =>
    api.get(url.LIST_CLOSING_NOTES, {
        params: { cursorId, limit },
    });
export const listChannels = () =>
    Reactionz.getAllPaginatedResponseFromReactionz("channels");
// api.get(url.LIST_CHANNELS, {
//     params: { cursorId, limit },
// });
export const listMessageTemplates = (channelId, cursorId, limit) =>
    api.get(`${url.LIST_CHANNELS}/${channelId}/template`, {
        params: { cursorId, limit },
    });
    export const onGetAllUsers = () => api.get(`${url.LIST_USERS}/${userId}`);
