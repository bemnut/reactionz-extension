import React, { useEffect, useState, useCallback, useRef } from "react";
import { Spinner } from "reactstrap";

import { useNavigate } from "react-router-dom";
import SimpleBar from "simplebar-react";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
    getTags as onGetTags,
    getLifeCycles as onGetLifeCycles,
    getChannels as onGetChannels,
    getUsers as onGetUsers,
    getContacts as onGetContacts,
    fireberryContactsSearchState,
} from "../../slices/thunks";

import { createSelector } from "reselect";

import { getNameInitials } from "./common_functions";
import { useTranslation } from "react-i18next";
import { getLoggedinUser } from "../../helpers/api_helper";
import { countries, setContact } from "./common_functions";
import { validate as isValidUUID } from "uuid";
import { isEmpty, map } from "lodash";

const ChatState = () => {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const selectChatState = (state) => state;
    const chatProperties = createSelector(selectChatState, (state) => ({
        user: state.Login.user,
        contacts: state.Contact.contacts,
        fireberryContactsSearch: state.Contact.fireberryContactsSearch,
    }));
    // Inside your component
    const { contacts, user, fireberryContactsSearch } =
        useSelector(chatProperties);

    useEffect(() => {
        const auth_user = user || getLoggedinUser();
        if (auth_user) {
            //
            navigate("/chat");
        } else {
            navigate("/login");
        }
    }, [user]);

    return (
        <React.Fragment>
            <div
                className="text-center my-4"
                style={{
                    height: "300px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div>
                    <Spinner color="success">Loading...</Spinner>
                    <div>{t("Loading...")}</div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ChatState;
