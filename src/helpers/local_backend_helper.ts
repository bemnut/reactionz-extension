import { ReactionzAPIClient } from "./api_helper";
import * as url from "./local_url_helper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const api = new ReactionzAPIClient();

export const uploadProfilePicture = async (data) =>
    await api
        .create(url.UPLOAD_PROFILE_PICTURE, data)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            toast.error(
                "Profile picture is NOT uploaded due to: " + err.message,
                {
                    autoClose: 3000,
                }
            );

            return err;
        });

export const storeMessage = (message) => api.create(url.STORE_MESSAGE, message);
//getMessages

export const getUsersEmails = (emails) =>
    api.create(url.GET_USERS_EMAILS, emails);

export const getCompanyRegistrationIds = (companyRegistraionIds) =>
    api.create(url.GET_USERS_COMPANY_REGISTRAION_IDS, companyRegistraionIds);

/**
 *
 * @param {*} user
 * @returns
 */
export const loginUser = (user) => api.create(url.USER_LOGIN, user);
/**
 *
 * @returns
 */
//export const logoutUser = (user) => api.create(url.USER_LOGOUT, user);
export const logoutUser = () => api.create(url.USER_LOGOUT);

/**
 *  Contact helpers
 *
 */
export const getContacts = (payload) => api.get(url.CONTACTS_GET, payload);
export const searchContact = (payload) => api.get(url.CONTACTS_GET, payload);
export const fireberryContactsSearch = (payload) =>
    api.get(url.CONTACTS_GET, payload);

// export const getContacts = (payload?) => {
//     if (payload?.parameter) {
//         return api.get(`${url.CONTACTS_GET}${payload.parameter}`, payload);
//     } else {
//         return api.get(`${url.CONTACTS_GET}`, payload);
//     }
// };

export const getGroups = (payload) => api.get(url.GROUPS_GET, payload);
export const getCountries = (payload) =>
    api.get(url.COUNTRIES_GET, { token: payload.token });
export const addContact = (payload) => api.create(url.CONTACTS_ADD, payload);
export const assignAgentToContact = (payload) =>
    api.create(
        `${url.CONTACTS_AGENT_ASSIGN}/${payload.contactId}/assign`,
        payload
    );
export const deleteContact = (payload) =>
    api.delete(`${url.CONTACTS_DELETE}/${payload.contactId}`);

export const blockContact = (payload) =>
    api.create(`${url.CONTACTS_BLOCK}/${payload.contactId}/block`);
export const unblockContact = (payload) =>
    api.create(`${url.CONTACTS_UNBLOCK}/${payload.contactId}/unblock`);

export const updateContact = (payload) =>
    api.update(`${url.CONTACTS_UPDATE}/${payload.contactId}`, payload);
export const updateContactTags = (payload) =>
    api.create(
        `${url.CONTACTS_UPDATE_TAGS}/${payload.contactId}/tags`,
        payload
    );
export const updateContactLifeCycle = (payload) =>
    api.create(
        `${url.CONTACTS_UPDATE_LIFECYCLE}/${payload.contactId}/life-cycle`,
        payload
    );

/**
 *  Channel helpers
 * @returns
 */
export const getChannels = () => api.get(url.CHANNELS_GET);

/**
 *
 *  User helpers
 */
export const getUsers = (payload) => api.get(url.USERS_GET, payload);

/**
 *
 *  Tag helpers
 */
export const getTags = () => api.get(url.TAGS_GET);

/**
 *
 *  LifeCylce helpers
 */
export const getLifeCycles = () => api.get(url.LIFECYCLES_GET);

/**
 *  Message helpers
 */
export const getConversations = (payload) => {
    if (payload.parameter) {
        return api.create(
            `${url.CONVERSATIONS_GET}${payload.parameter}`,
            payload
        );
    } else {
        return api.create(`${url.CONVERSATIONS_GET}`, payload);
    }
};
export const updateConversationStatus = (payload) =>
    api.create(
        `${url.CONVERSATION_STATUS_UPDATE}/${payload.contactId}/conversation/status`,
        payload.status
    );

export const getContactConversations = (payload) =>
    api.get(`${url.MESSAGES_GET}/${payload}`);

export const markConversationAsRead = (payload) =>
    api.create(`${url.CONVERSATIONS_MARK_AS_READ}/${payload}/read`);
export const markConversationAsUnRead = (payload) =>
    api.create(`${url.CONVERSATIONS_MARK_AS_READ}/${payload}/unread`);

export const sendTextMessage = (payload) =>
    api.create(
        `${url.MESSAGES_TEXT_SEND}/${payload.contactId}/message`,
        payload
    );
export const sendAttachment = (payload) =>
    api.create(
        `${url.MESSAGES_ATTACHMENT_SEND}/${payload.contactId}/message`,
        payload
    );

export const sendTemplateMessage = (payload) =>
    api.create(
        `${url.MESSAGES_TEMPLATE_SEND}/${payload.contactId}/message`,
        payload
    );

export const sendCampaignMessage = (payload) =>
    api.create(url.MESSAGES_CAMPAIGN_SEND, payload);

/**
 *  Template helpers
 */
export const getTemplates = (payload) => api.get(url.TEMPLATES_GET, payload);

/**
 *  Template helpers
 */
export const getCampaigns = (payload) =>
    api.get(url.CAMPAIGNS_GET, { token: payload.token });

/**
 *  File helpers
 */
export const uploadFile = (payload) => api.create(url.UPLOAD_FILE, payload);
export const getUploadStatus = (uuid) =>
    api.create(`${url.GET_FILE_UPLOAD_STATUS}/${uuid}`);

/**
 *  Snippets
 */
export const getMessageSnippets = (payload) =>
    api.get(url.MESSAGE_SNIPPETS_GET, payload);

/**
 *  Notification helpers
 */

export const getNotifications = () => api.get(url.NOTIFICATIONS_GET);
export const updateNotification = (payload) =>
    api.update(`${url.NOTIFICATION_UPDATE}`, payload);
