import { createAsyncThunk } from "@reduxjs/toolkit";

//Include Both Helper File with needed methods
import {
    getContacts as onGetContactsApi,
    getGroups as onGetGroupsApi,
    getCountries as onGetConuntriesApi,
    addContact as onAddContactApi,
    assignAgentToContact as onAssignAgentToContactApi,
    deleteContact as onDeleteContactApi,
    blockContact as onBlockContactApi,
    unblockContact as onUnblockContactApi,
    updateContact as onUpdateContactApi,
    updateContactTags as onUpdateContactTagsApi,
    updateContactLifeCycle as onUpdateContactLifeCycleApi,
    searchContact as onSearchContactApi,
    fireberryContactsSearch as onFireberryContactsSearchApi,
} from "../../helpers/local_backend_helper";

import {
    changeIsContactAdded as changeIsContactAddedAction,
    changeIsContactUpdated as changeIsContactUpdatedAction,
    changeIsContactDeleted as changeIsContactDeletedAction,
    changeSearchContact as changeSearchContactAction,
    fireberryContactsSearchState as changeFireberryContactsSearchAction,
} from "./reducer";

export const changeIsContactAdded = (payload) => async (dispatch) => {
    try {
        dispatch(changeIsContactAddedAction(payload));
    } catch (error) {}
};
export const changeIsContactUpdated = (payload) => async (dispatch) => {
    try {
        dispatch(changeIsContactUpdatedAction(payload));
    } catch (error) {}
};

export const changeIsContactDeleted = (payload) => async (dispatch) => {
    try {
        dispatch(changeIsContactDeletedAction(payload));
    } catch (error) {}
};
export const changeSearchContact = (payload) => async (dispatch) => {
    try {
        dispatch(changeSearchContactAction(payload));
    } catch (error) {}
};
export const fireberryContactsSearchState = (payload) => async (dispatch) => {
    try {
        dispatch(changeFireberryContactsSearchAction(payload));
    } catch (error) {}
};

// get contacts
export const getContacts = createAsyncThunk(
    "contacts/getContacts",
    async (payload?: any) => {
        try {
            const response = onGetContactsApi(payload);
            return response;
        } catch (error) {
            return error;
        }
    }
);

// get groups
export const getGroups = createAsyncThunk(
    "contacts/getGroups",
    async (user: any) => {
        try {
            const response = onGetGroupsApi(user);
            return response;
        } catch (error) {
            return error;
        }
    }
);

// get countries
export const getCountries = createAsyncThunk(
    "contacts/getCountries",
    async (user: any) => {
        try {
            const response = onGetConuntriesApi(user);
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const addContact = createAsyncThunk(
    "contacts/addContact",
    async (payload: any) => {
        try {
            const response: any = await onAddContactApi(payload);
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

export const assignAgentToContact = createAsyncThunk(
    "contacts/assignAgentToContact",
    async (payload: any) => {
        try {
            const response: any = await onAssignAgentToContactApi(payload);
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const deleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async (payload: any) => {
        try {
            const response: any = await onDeleteContactApi(payload);
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const blockContact = createAsyncThunk(
    "contacts/blockContact",
    async (payload: any) => {
        try {
            const response: any = await onBlockContactApi(payload);
            return response;
        } catch (error) {
            return error;
        }
    }
);
export const unblockContact = createAsyncThunk(
    "contacts/unblockContact",
    async (payload: any) => {
        try {
            const response: any = await onUnblockContactApi(payload);
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const updateContact = createAsyncThunk(
    "contacts/updateContact",
    async (payload: any) => {
        try {
            const response: any = await onUpdateContactApi(payload);
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const updateContactTags = createAsyncThunk(
    "contacts/updateContactTags",
    async (payload: any) => {
        try {
            const response: any = await onUpdateContactTagsApi(payload);
            return response;
        } catch (error) {
            return error;
        }
    }
);
export const updateContactLifeCycle = createAsyncThunk(
    "contacts/updateContactLifeCycle",
    async (payload: any) => {
        try {
            const response: any = await onUpdateContactLifeCycleApi(payload);
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const searchContact = createAsyncThunk(
    "contacts/searchContact",
    async (payload?: any) => {
        try {
            const response = onSearchContactApi(payload);
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const fireberryContactsSearch = createAsyncThunk(
    "contacts/fireberryContactsSearch",
    async (payload?: any) => {
        try {
            const response = onFireberryContactsSearchApi(payload);
            return response;
        } catch (error) {
            return error;
        }
    }
);
