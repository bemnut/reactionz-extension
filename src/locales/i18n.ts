import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import he from "./hb.json";

// the translations
const resources = {
    IL_he: {
        translation: he,
    },
    US_en: {
        translation: en,
    },
};

//const language = localStorage.getItem("I18N_LANGUAGE");
var language = null;
chrome.storage.local.get("local_language", function (result) {
    language = result.local_language;
});

// if (!language) {
//     chrome.storage.local.set({ local_language: "IL_he" });
// }

i18n.use(detector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: resources,
        lng: language || "IL_he",
        fallbackLng: "US_en", // use en if detected lng is not available

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
