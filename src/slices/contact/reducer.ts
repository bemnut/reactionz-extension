import { createSlice } from "@reduxjs/toolkit";
import {
    getContacts,
    getGroups,
    getCountries,
    addContact,
    assignAgentToContact,
    deleteContact,
    blockContact,
    unblockContact,
    updateContact,
    updateContactTags,
    updateContactLifeCycle,
    searchContact,
    fireberryContactsSearch,
} from "./thunk";
import type { PayloadAction } from "@reduxjs/toolkit";

// interface Item {
//     contacts: [];
//     error: {};
// }

// export const initialState = {} as Item;

export const initialState = {
    searchContact: null,
    fireberryContactsSearch: null,
    contacts: [],
    groups: [],
    countries: [],
    isContactAdded: false,
    isContactUpdated: false,
    isContactDeleted: false,
    error: null,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        changeIsContactAdded(state, action) {
            state.isContactAdded = action.payload;
        },
        changeIsContactUpdated(state, action) {
            state.isContactUpdated = action.payload;
        },
        changeIsContactDeleted(state, action) {
            state.isContactDeleted = action.payload;
        },
        changeSearchContact(state, action) {
            state.searchContact = action.payload;
        },
        fireberryContactsSearchState(state, action) {
            state.fireberryContactsSearch = action.payload;
        },
    },
    extraReducers: (builder) => {
        // get contacts
        builder.addCase(getContacts.fulfilled, (state, action: any) => {
            state.contacts = [];
            if (action.payload.status == "success") {
                state.contacts = action.payload.data;
            } else {
                state.error = action.payload?.message;
            }
        });
        builder.addCase(getContacts.rejected, (state, action: any) => {
            state.error = action.payload?.message || null;
        });

        // search contacts
        builder.addCase(searchContact.fulfilled, (state, action: any) => {
            state.searchContact = [];
            if (action.payload.status == "success") {
                state.searchContact = action.payload.data;
            } else {
                state.error = action.payload?.message;
            }
        });
        builder.addCase(searchContact.rejected, (state, action: any) => {
            state.error = action.payload?.message || null;
        });

        // search fireberry contacts
        builder.addCase(
            fireberryContactsSearch.fulfilled,
            (state, action: any) => {
                state.fireberryContactsSearch = [];
                if (action.payload.status == "success") {
                    //console.log("action.payload.data: ", action.payload.data);
                    state.fireberryContactsSearch = action.payload.data;
                } else {
                    state.error = action.payload?.message;
                }
            }
        );
        builder.addCase(
            fireberryContactsSearch.rejected,
            (state, action: any) => {
                state.error = action.payload?.message || null;
            }
        );

        // get groups
        builder.addCase(getGroups.fulfilled, (state, action: any) => {
            state.groups = [];
            if (action.payload.status == "success") {
                state.groups = action.payload.groups;
            } else {
                state.error = action.payload?.message;
            }
        });
        builder.addCase(getGroups.rejected, (state, action: any) => {
            state.error = action.payload?.message || null;
        });

        // get countries
        builder.addCase(getCountries.fulfilled, (state, action: any) => {
            state.countries = [];
            if (action.payload.status == "success") {
                state.countries = action.payload.countries;
            } else {
                state.error = action.payload?.message;
            }
        });
        builder.addCase(getCountries.rejected, (state, action: any) => {
            state.error = action.payload?.message || null;
        });

        // add contact
        builder.addCase(addContact.fulfilled, (state, action) => {
            state.isContactAdded = false;
            if (action.payload.status == "success") {
                state.isContactAdded = true;
            } else {
                state.error = action.payload?.message;
            }
        });
        builder.addCase(addContact.rejected, (state, action: any) => {
            state.error = action.payload?.message || null;
        });

        // assign agent to contact
        builder.addCase(assignAgentToContact.fulfilled, (state, action) => {
            state.isContactUpdated = false;
            if (action.payload.status == "success") {
                state.isContactUpdated = true;
            } else {
                state.error = action.payload?.message;
            }
        });
        builder.addCase(assignAgentToContact.rejected, (state, action: any) => {
            state.error = action.payload?.message || null;
        });

        // delete contact
        builder.addCase(deleteContact.fulfilled, (state, action) => {
            state.isContactDeleted = false;
            if (action.payload.status == "success") {
                state.isContactDeleted = true;
            } else {
                state.error = action.payload?.message;
            }
        });
        builder.addCase(deleteContact.rejected, (state, action: any) => {
            state.error = action.payload?.message || null;
        });

        // block contact
        builder.addCase(blockContact.fulfilled, (state, action) => {
            state.isContactUpdated = false;
            if (action.payload.status == "success") {
                state.isContactUpdated = true;
            } else {
                state.error = action.payload?.message;
            }
        });
        builder.addCase(blockContact.rejected, (state, action: any) => {
            state.error = action.payload?.message || null;
        });

        // unblock contact
        builder.addCase(unblockContact.fulfilled, (state, action) => {
            state.isContactUpdated = false;
            if (action.payload.status == "success") {
                state.isContactUpdated = true;
            } else {
                state.error = action.payload?.message;
            }
        });
        builder.addCase(unblockContact.rejected, (state, action: any) => {
            state.error = action.payload?.message || null;
        });

        // update Contact
        builder.addCase(updateContact.fulfilled, (state, action) => {
            state.isContactUpdated = false;
            if (action.payload.status == "success") {
                state.isContactUpdated = true;
            } else {
                state.error = action.payload?.message;
            }
        });
        builder.addCase(updateContact.rejected, (state, action: any) => {
            state.error = action.payload?.message || null;
        });

        // update Contact Tags
        builder.addCase(updateContactTags.fulfilled, (state, action) => {
            state.isContactUpdated = false;
            if (action.payload.status == "success") {
                state.isContactUpdated = true;
            } else {
                state.error = action.payload?.message;
            }
        });
        builder.addCase(updateContactTags.rejected, (state, action: any) => {
            state.error = action.payload?.message || null;
        });

        // update Contact LifeCycle
        builder.addCase(updateContactLifeCycle.fulfilled, (state, action) => {
            state.isContactUpdated = false;
            if (action.payload.status == "success") {
                state.isContactUpdated = true;
            } else {
                state.error = action.payload?.message;
            }
        });
        builder.addCase(
            updateContactLifeCycle.rejected,
            (state, action: any) => {
                state.error = action.payload?.message || null;
            }
        );
    }, //
});

export const {
    changeIsContactAdded,
    changeIsContactUpdated,
    changeIsContactDeleted,
    changeSearchContact,
    fireberryContactsSearchState,
} = chatSlice.actions;
export default chatSlice.reducer;
