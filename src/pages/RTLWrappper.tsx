import React, { useEffect } from "react";

import { createSelector } from "reselect";

import { useSelector, useDispatch } from "react-redux";

import {
    changeLanguage as onChangeLanguage,
    changeShowOnFireberry as onChangeShowOnFireberry,
} from "../slices/thunks";

import "../locales/i18n";
import i18n from "../locales/i18n";

const RTLWrapper = ({ children }) => {
    const dispatch = useDispatch<any>();
    const selectChatState = (state) => state;
    const chatProperties = createSelector(selectChatState, (state) => ({
        language: state.Layout.language,
    }));
    const { language } = useSelector(chatProperties);
    //

    chrome.storage.local.get("local_language", function (result) {
        result.local_language
            ? dispatch(onChangeLanguage(result.local_language))
            : chrome.storage.local.set({ local_language: "IL_he" });
    });

    chrome.storage.local.get("show_on_fireberry", function (result) {
        result.show_on_fireberry
            ? dispatch(onChangeShowOnFireberry(result.show_on_fireberry))
            : chrome.storage.local.set({ show_on_fireberry: "show" });
    });

    //
    useEffect(() => {
        language && i18n.changeLanguage(language);
    }, [language]);

    //

    return (
        <React.Fragment>
            <div
                className="rtl-wrapper"
                id="rtl-wrapper"
                dir={language == "IL_he" ? "rtl" : "ltr"}
            >
                {children}
            </div>
        </React.Fragment>
    );
};

export default RTLWrapper;
