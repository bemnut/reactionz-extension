import React, { useEffect, useState } from "react";
import { Button, Row, Col, Label, Form, Input } from "reactstrap";
import Select from "react-select";

import { Link } from "react-router-dom";
import classnames from "classnames";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
    changeLanguage as onChangeLanguage,
    changeShowOnFireberry as onChangeShowOnFireberry,
    updateNotification as onUpdateNotification,
    changeIsNotificaitonUpdated as onChangeIsNotificaitonUpdated,
} from "../../slices/thunks";

import { createSelector } from "reselect";

import { useTranslation } from "react-i18next";
import i18n from "../../locales/i18n";
import {
    fontSizes,
    changeFontSize,
    NormalizeTextTitle,
} from "./common_functions";

const SettingsModal = ({
    settingsShow,
    backToUserChat,
    extensionWindowStatus,
}) => {
    const dispatch = useDispatch<any>();
    const { t } = useTranslation();

    const selectChatState = (state) => state;
    const chatProperties = createSelector(selectChatState, (state) => ({
        localLanguageState: state.Layout.language,
        showOnFireberryStatus: state.Layout.showOnFireberryStatus,
        notification: state.Notification.notification,
    }));
    // Inside your component
    const { localLanguageState, showOnFireberryStatus, notification } =
        useSelector(chatProperties);
    const [windowPosition, setWindowPosition] = useState<any>("");
    const [language, setLanguage] = useState<any>("");
    const [fontSize, setFontSize] = useState<any>("");
    const [showOnFireberry, setShowOnFireberry] = useState<any>("");
    const [windowPositionOptions, setWindowPositionOptions] = useState([
        { label: t("Top-Left"), value: "position-window-top-left-side" },
        {
            label: t("Bottom-Left"),
            value: "position-window-bottom-left-side",
        },
        { label: t("Center"), value: "position-window-center-side" },
        { label: t("Top-Right"), value: "position-window-top-right-side" },
        {
            label: t("Bottom-Right"),
            value: "position-window-bottom-right-side",
        },
    ]);
    const [languageOptions, setLanguageOptions] = useState([
        { label: t("English"), value: "US_en" },
        { label: t("Hebrew"), value: "IL_he" },
    ]);
    const [fontSizeOptions, setFontSizeOptions] = useState([
        { label: t("Big"), value: "big" },
        { label: t("Normal"), value: "normal" },
        { label: t("Small"), value: "small" },
    ]);

    const [showOnFireberryStatusOptions, setShowOnFireberryStatusOptions] =
        useState([
            { label: t("Show"), value: "show" },
            { label: t("Hide"), value: "hide" },
        ]);

    useEffect(() => {
        chrome.storage.local.get("window_position", function (result) {
            windowPositionOptions?.map((item) => {
                if (item.value == result.window_position) {
                    setWindowPosition(item);
                }
            });
        });
        chrome.storage.local.get("local_language", function (result) {
            languageOptions?.map((item) => {
                if (item.value == result.local_language) {
                    setLanguage(item);
                }
            });
        });
        chrome.storage.local.get("font_size", function (result) {
            fontSizeOptions?.map((item) => {
                if (item.value == result.font_size) {
                    setFontSize(item);
                }
            });
        });

        chrome.storage.local.get("show_on_fireberry", function (result) {
            result.show_on_fireberry &&
                showOnFireberryStatusOptions?.map((item) => {
                    if (item.value == result.show_on_fireberry) {
                        setShowOnFireberry(item);
                    }
                });
        });
    }, []);

    i18n.on("languageChanged", () => {
        setWindowPositionOptions([
            { label: t("Top-Left"), value: "position-window-top-left-side" },
            {
                label: t("Bottom-Left"),
                value: "position-window-bottom-left-side",
            },
            { label: t("Center"), value: "position-window-center-side" },
            { label: t("Top-Right"), value: "position-window-top-right-side" },
            {
                label: t("Bottom-Right"),
                value: "position-window-bottom-right-side",
            },
        ]);
        setLanguageOptions([
            { label: t("English"), value: "US_en" },
            { label: t("Hebrew"), value: "IL_he" },
        ]);
        setFontSizeOptions([
            { label: t("Big"), value: "big" },
            { label: t("Normal"), value: "normal" },
            { label: t("Small"), value: "small" },
        ]);
        setShowOnFireberryStatusOptions([
            { label: t("Show"), value: "show" },
            { label: t("Hide"), value: "hide" },
        ]);
    });

    const handleChangeWindowPosition = () => {
        chrome.storage.local.set({ window_position: windowPosition.value });
        windowPosition &&
            chrome.runtime.sendMessage({
                sendBack: true,
                data: { window_position: windowPosition.value },
            });
    };

    const handleChangeLanguage = () => {
        language?.value &&
            chrome.storage.local.set({ local_language: language.value });
        language?.value && dispatch(onChangeLanguage(language.value));
        chrome.runtime.sendMessage({
            sendBack: true,
            data: {
                show_conversation_pane: true,
            },
        });
    };

    const handleChangeFontSize = () => {
        fontSize != "" &&
            chrome.storage.local.set({ font_size: fontSize?.value });
        fontSize != "" &&
            chrome.runtime.sendMessage({
                sendBack: true,
                data: { font_size: fontSize?.value },
            });
        //
        const pane = document.getElementById("root");
        pane && changeFontSize(pane, fontSizes[fontSize?.value]);
    };

    const handleChangeShowOnFireberry = () => {
        chrome.storage.local.set({ show_on_fireberry: showOnFireberry.value });
        dispatch(onChangeShowOnFireberry(showOnFireberry.value));
    };

    useEffect(() => {
        windowPositionOptions?.map((item) => {
            if (item.value == windowPosition?.value) {
                setWindowPosition(item);
            }
        });
        languageOptions?.map((item) => {
            if (item.value == language?.value) {
                setLanguage(item);
            }
        });
        fontSizeOptions?.map((item) => {
            if (item.value == fontSize?.value) {
                setFontSize(item);
            }
        });
        showOnFireberryStatusOptions?.map((item) => {
            if (item.value == showOnFireberry.value) {
                setShowOnFireberry(item);
            }
        });
    }, [languageOptions]);

    useEffect(() => {
        if (fontSize != "" && extensionWindowStatus != "minimize-window") {
            handleChangeFontSize();
        }
    }, [fontSize]);
    useEffect(() => {
        if (language != "") {
            handleChangeLanguage();
        }
    }, [language]);
    useEffect(() => {
        if (windowPosition != "") {
            handleChangeWindowPosition();
        }
    }, [windowPosition]);

    useEffect(() => {
        if (showOnFireberry != "") {
            handleChangeShowOnFireberry();
        }
    }, [showOnFireberry]);

    // function changeFont(element){
    //     element.setAttribute("style",element.getAttribute("style")+";font-family: Courier New");
    //     for(var i=0; i < element.children.length; i++){
    //         changeFont(element.children[i]);
    //     }
    // }
    const handleUpdateNotification = (availableChannel) => {
        dispatch(onChangeIsNotificaitonUpdated(false));

        var availableChannelWrapper, availableChannelInputs;
        availableChannelWrapper = document.getElementById(availableChannel);
        availableChannelInputs =
            availableChannelWrapper &&
            availableChannelWrapper.getElementsByTagName("input");

        let arr = [];
        Array.prototype.forEach.call(availableChannelInputs, function (input) {
            arr.push({
                [input.id]: `${input.checked}`,
            });
        });

        let settings = Object.assign({}, ...arr);
        let payload = {
            channel: availableChannel,
            settings: settings,
        };

        dispatch(onUpdateNotification(payload));
    };

    return (
        <React.Fragment>
            <div
                className="settings-modal w-100 " //overflow-hidden
                ref={settingsShow}
            >
                <div className="px-4 py-3  settings-modal-topbar">
                    <Row className="align-items-center">
                        <Col sm={4} xs={8}>
                            <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 d-block d-lg-none me-3 user-chat-remove">
                                    <Link
                                        to="#"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            backToUserChat();
                                            // cleanup
                                            //setWindowPosition("");
                                            //setLanguage("");
                                            ("");
                                        }}
                                        className=" fs-18 p-1"
                                    >
                                        <i className="ri-arrow-left-s-line align-bottom"></i>
                                    </Link>
                                </div>
                                <h6 style={{ marginBottom: "0" }}>
                                    <i className="ri-tools-fill align-bottom me-2"></i>{" "}
                                    {t("Settings")}
                                </h6>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="pt-0 settings-modal-content scrollable">
                    <Row className="align-items-center px-2">
                        <Col sm={12}>
                            <div className="ps-4 p-2 ">
                                <Form className="pb-5 mb-5">
                                    <div className="mb-4 local-language">
                                        <Label
                                            htmlFor="group"
                                            className="form-label text-muted fs-12"
                                        >
                                            {t("Language")}
                                        </Label>

                                        <div
                                            className="input-group"
                                            style={{ alignItems: "center" }}
                                        >
                                            <Select
                                                className="basic-single form-control p-0"
                                                classNamePrefix="value"
                                                defaultValue
                                                isDisabled={false}
                                                isLoading={false}
                                                //isClearable={true}
                                                //isRtl={isRtl}
                                                isSearchable={true}
                                                name="language"
                                                placeholder={t("Set language")}
                                                options={languageOptions || []}
                                                onChange={(e: any) =>
                                                    e && setLanguage(e)
                                                }
                                                value={language}
                                            />
                                            {/* <Button
                                                color=""
                                                id="save-local-language"
                                                className="btn btn-soft-success btn-sm shadow-none "
                                                onClick={handleChangeLanguage}
                                                style={{ height: "40px" }}
                                            >
                                                <i className="ri-check-fill align-bottom"></i>
                                            </Button> */}
                                        </div>
                                    </div>

                                    <div className="mb-4 window-position">
                                        <Label
                                            htmlFor="group"
                                            className="form-label text-muted fs-12"
                                        >
                                            {t("Window Position")}
                                        </Label>

                                        <div
                                            className="input-group"
                                            style={{ alignItems: "center" }}
                                        >
                                            <Select
                                                className="basic-single form-control p-0"
                                                classNamePrefix="value"
                                                defaultValue
                                                isDisabled={false}
                                                isLoading={false}
                                                //isClearable={true}
                                                //isRtl={isRtl}
                                                isSearchable={true}
                                                name="window_position"
                                                placeholder={t(
                                                    "Set window position"
                                                )}
                                                options={
                                                    windowPositionOptions || []
                                                }
                                                onChange={(e: any) =>
                                                    e && setWindowPosition(e)
                                                }
                                                value={windowPosition}
                                            />
                                            {/* <Button
                                                color=""
                                                id="save-window-position"
                                                className="btn btn-soft-success btn-sm shadow-none "
                                                onClick={
                                                    handleChangeWindowPosition
                                                }
                                                style={{ height: "40px" }}
                                            >
                                                <i className="ri-check-fill align-bottom"></i>
                                            </Button> */}
                                        </div>
                                    </div>
                                    <div className="mb-4 font-size">
                                        <Label
                                            htmlFor="group"
                                            className="form-label text-muted fs-12"
                                        >
                                            {t("Font Size")}
                                        </Label>

                                        <div
                                            className="input-group"
                                            style={{ alignItems: "center" }}
                                        >
                                            <Select
                                                className="basic-single form-control p-0"
                                                classNamePrefix="value"
                                                defaultValue
                                                isDisabled={false}
                                                isLoading={false}
                                                //isClearable={true}
                                                //isRtl={isRtl}
                                                isSearchable={true}
                                                name="font-size"
                                                placeholder={t("Set font size")}
                                                options={fontSizeOptions || []}
                                                onChange={(e: any) =>
                                                    e && setFontSize(e)
                                                }
                                                value={fontSize}
                                            />
                                            {/* <Button
                                                color=""
                                                id="save-font-size"
                                                className="btn btn-soft-success btn-sm shadow-none "
                                                onClick={handleChangeFontSize}
                                                style={{ height: "40px" }}
                                            >
                                                <i className="ri-check-fill align-bottom"></i>
                                            </Button> */}
                                        </div>
                                    </div>

                                    <div className="mb-4 contact">
                                        <Label
                                            htmlFor="group"
                                            className="form-label text-muted fs-12"
                                        >
                                            {t("Show on Fireberry")}
                                        </Label>

                                        <div
                                            className="input-group"
                                            style={{ alignItems: "center" }}
                                        >
                                            <Select
                                                className="basic-single form-control p-0"
                                                classNamePrefix="value"
                                                defaultValue
                                                isDisabled={false}
                                                isLoading={false}
                                                //isClearable={true}
                                                //isRtl={isRtl}
                                                isSearchable={true}
                                                name="show-on-fireberry"
                                                placeholder={t(
                                                    "Show on Fireberry"
                                                )}
                                                options={
                                                    showOnFireberryStatusOptions ||
                                                    []
                                                }
                                                onChange={(e: any) =>
                                                    e && setShowOnFireberry(e)
                                                }
                                                value={showOnFireberry}
                                            />
                                        </div>
                                    </div>

                                    <div
                                        className={classnames(
                                            "mb-4 notifications ",
                                            {
                                                rtl:
                                                    localLanguageState ==
                                                    "IL_he",
                                                ltr:
                                                    localLanguageState !=
                                                    "IL_he",
                                            }
                                        )}
                                    >
                                        <Label
                                            htmlFor="group"
                                            className="form-label text-muted fs-12"
                                        >
                                            {t("Notifications")}
                                        </Label>
                                        <div className="border border-1 .rounded-2 p-2">
                                            {notification?.settings &&
                                                Object.entries(
                                                    notification?.settings
                                                )?.map(
                                                    ([
                                                        availableChannel,
                                                        value,
                                                    ]) => (
                                                        <>
                                                            <div
                                                                className={`mb-2 ${availableChannel} `}
                                                                id={
                                                                    availableChannel
                                                                }
                                                            >
                                                                <div className="mb-1 text-muted fs-12">
                                                                    {t(
                                                                        `${
                                                                            NormalizeTextTitle(
                                                                                availableChannel
                                                                            ) ==
                                                                            "Sms"
                                                                                ? "SMS"
                                                                                : NormalizeTextTitle(
                                                                                      availableChannel
                                                                                  )
                                                                        } Notifications`
                                                                    )}
                                                                </div>
                                                                <div className="mb-1">
                                                                    {Object.entries(
                                                                        value
                                                                    )?.map(
                                                                        ([
                                                                            key,
                                                                            val,
                                                                        ]) => (
                                                                            <div className="form-check  form-check-success ">
                                                                                <Input
                                                                                    className="form-check-input"
                                                                                    type="checkbox"
                                                                                    name="conversations-list-assigned-to-me"
                                                                                    id={`${key}`}
                                                                                    defaultChecked={
                                                                                        val ==
                                                                                        "true"
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    // onClick={() => {
                                                                                    //     setConversationsListAssignedTo(
                                                                                    //         "mine"
                                                                                    //     );
                                                                                    //     handleClearSearchInput();
                                                                                    // }}
                                                                                />
                                                                                &rlm;
                                                                                <Label
                                                                                    className="form-check-label"
                                                                                    for="flexRadioDefault1"
                                                                                >
                                                                                    {t(
                                                                                        NormalizeTextTitle(
                                                                                            key
                                                                                        )
                                                                                    )}
                                                                                </Label>
                                                                            </div>
                                                                        )
                                                                    )}
                                                                </div>
                                                                <div
                                                                    style={{
                                                                        alignItems:
                                                                            "center",
                                                                        display:
                                                                            "flex",
                                                                        justifyContent:
                                                                            "flex-end",
                                                                    }}
                                                                >
                                                                    <Button
                                                                        type="button"
                                                                        className="btn btn-sm btn-success"
                                                                        onClick={() =>
                                                                            handleUpdateNotification(
                                                                                availableChannel
                                                                            )
                                                                        }
                                                                        //disabled={campaign ? false : true}
                                                                    >
                                                                        {t(
                                                                            "Save"
                                                                        )}
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                )}
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </React.Fragment>
    );
};

export default SettingsModal;
