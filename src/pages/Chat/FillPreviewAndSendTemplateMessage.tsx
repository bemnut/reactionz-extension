import React, { useEffect, useState } from "react";
import { Button, Input, Label, Form } from "reactstrap";

import * as Yup from "yup";
import { useFormik } from "formik";

import { Link } from "react-router-dom";

import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import { sendTemplateMessage as onSendTemplateMessage } from "../../slices/thunks";

import templateMessagePreviewBG from "../../assets/images/reactionz/template_message_preview_bg.png";

import { createSelector } from "reselect";
import { getLoggedinUser } from "../../helpers/api_helper";
import { getTemplateTypeFromChannel } from "./common_functions";
import { useTranslation } from "react-i18next";

const FillPreviewAndSendTemplateMessage = ({
    selectedContact,
    templates,
    template,
    toggleSendTemplateModal,
    togglePreviewAndSendTemplateMessageModal,
    setTemplate,
    selectedChannel,
}) => {
    const dispatch = useDispatch<any>();
    const { t } = useTranslation();

    const selectChatState = (state) => state;
    const chatProperties = createSelector(selectChatState, (state) => ({
        user: state.Login.user,
    }));
    // Inside your component
    const { user } = useSelector(chatProperties);

    const [templateOptions, setTemplateOptions] = useState([]);

    const [templateComponents, setTemplateComponents] = useState<any>(null);

    const [previewHeaderText, setPreviewHeaderText] = useState<any>(null);
    const [previewBodyText, setPreviewBodyText] = useState<any>(null);
    const [previewButtons, setPreviewButtons] = useState<any>(null);
    const [previewFooterText, setPreviewFooterText] = useState<any>(null);

    const validation: any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            //template_name: template || [],
        },
        validationSchema: Yup.object({
            // template_name: Yup.string().required(
            //     "Please select a template to send."
            // ),
        }),
        onSubmit: (values) => {},
    });

    // handle send template message
    const handleSendTemplateMessage = () => {
        const auth_user = user || getLoggedinUser();
        if (
            !isEmpty(selectedContact) &&
            !isEmpty(selectedChannel) &&
            !isEmpty(template)
        ) {
            const payload = {
                contactId: selectedContact.id,
                channelId: selectedChannel.id,
                message: {
                    type: getTemplateTypeFromChannel(selectedChannel),
                    template:
                        templateComponentHasVariables(
                            templateComponents,
                            previewButtons
                        ) == true
                            ? {
                                  name: template.label,
                                  languageCode: templates?.data?.find(
                                      (item) => item.id == template.value
                                  )?.language,
                                  components:
                                      getComponentParameters(
                                          templateComponents
                                      ),
                              }
                            : {
                                  name: template.label,
                                  languageCode: templates?.data?.find(
                                      (item) => item.id == template.value
                                  )?.language,
                                  //components: getComponentParameters(),
                              },
                },
            };
            //console.log("payload: ", payload);
            dispatch(onSendTemplateMessage(payload));

            //cleanup data and close modal
            setTemplate("");
            togglePreviewAndSendTemplateMessageModal(false);
            toggleSendTemplateModal();
        }
    };

    const templateComponentHasVariables = (
        templateComponents: any,
        preview_buttons: any
    ) => {
        let componentHasVariables = false;
        templateComponents?.map((component) => {
            if (
                component.type?.toUpperCase() == "HEADER" &&
                component.format?.toUpperCase() == "TEXT"
            ) {
                if (component.example?.header_text?.length > 0) {
                    componentHasVariables = true;
                }
            }
            if (component.type?.toUpperCase() == "BODY") {
                if (component.example?.body_text[0]?.length > 0) {
                    componentHasVariables = true;
                }
            }
            if (component.type?.toUpperCase() == "FOOTER") {
                //
                if (component.example?.footer_text?.length > 0) {
                    componentHasVariables = true;
                }
            }
            if (component.type?.toUpperCase() == "BUTTONS") {
                preview_buttons && (componentHasVariables = true);
            }
        });
        return componentHasVariables;
    };
    const getComponentParameters = (templateComponents: any) => {
        let components = [];
        templateComponents?.map((component) => {
            if (
                component.type?.toUpperCase() == "HEADER" &&
                component.format?.toUpperCase() == "TEXT"
            ) {
                let temp_component = {};
                let text = component.text;
                temp_component["type"] = "HEADER";
                temp_component["format"] = "TEXT";
                if (component.example?.header_text) {
                    temp_component["parameters"] = [];
                    component.example?.header_text?.map((value, key) => {
                        let temp_val = document.querySelector<HTMLInputElement>(
                            `input[name="header-variable-${key}"]`
                        )
                            ? document.querySelector<HTMLInputElement>(
                                  `input[name="header-variable-${key}"]`
                              ).value
                            : null;
                        temp_component["parameters"].push({
                            text: temp_val ? temp_val : value,
                            type: "text",
                        });
                    });
                }
                temp_component["parameters"]?.length > 0 &&
                    components.push(temp_component);
            }
            if (component.type?.toUpperCase() == "BODY") {
                let temp_component = {};
                temp_component["type"] = "BODY";
                if (component.example?.body_text[0]) {
                    temp_component["parameters"] = [];
                    component.example?.body_text[0]?.map((value, key) => {
                        let temp_val = document.querySelector<HTMLInputElement>(
                            `input[name="body-variable-${key}"]`
                        )
                            ? document.querySelector<HTMLInputElement>(
                                  `input[name="body-variable-${key}"]`
                              ).value
                            : null;
                        temp_component["parameters"].push({
                            text: temp_val ? temp_val : value,
                            type: "text",
                        });
                    });
                }
                temp_component["parameters"]?.length > 0 &&
                    components.push(temp_component);
            }
            if (component.type?.toUpperCase() == "FOOTER") {
                //
                let temp_component = {};
                temp_component["type"] = "FOOTER";
                if (component.example?.footer_text) {
                    temp_component["parameters"] = [];
                    component.example?.footer_text?.map((value, key) => {
                        let temp_val = document.querySelector<HTMLInputElement>(
                            `input[name="footer-variable-${key}"]`
                        )
                            ? document.querySelector<HTMLInputElement>(
                                  `input[name="footer-variable-${key}"]`
                              ).value
                            : null;
                        temp_component["parameters"].push({
                            text: temp_val ? temp_val : value,
                            type: "text",
                        });
                    });
                }
                temp_component["parameters"]?.length > 0 &&
                    components.push(temp_component);
            }
            if (component.type?.toUpperCase() == "BUTTONS") {
                //
                //console.log("component: ", component);
                let temp_component = {};
                temp_component["type"] = "BUTTONS";
                previewButtons &&
                    (temp_component["parameters"] = previewButtons);
                //console.log("previewButtons: ", previewButtons);

                previewButtons?.map((btn, idx) => {
                    let tmp = {};
                    if (btn.type?.toUpperCase() == "QUICK_REPLY") {
                        tmp = {
                            type: "BUTTON",
                            sub_type: btn.type?.toLowerCase(),
                            index: idx, // Index of the second button
                            parameters: [
                                {
                                    type: "payload",
                                    payload: btn.text, // Optional: Custom payload for the button
                                },
                                {
                                    type: "text",
                                    text: "Stop All Messages", // New text for the second button
                                },
                            ],
                        };
                    } else if (btn.type?.toUpperCase() == "URL") {
                    }
                    components.push(tmp);
                });

                // previewButtons &&
                //     temp_component["parameters"]?.length > 0 &&
                //     components.push(temp_component);
            }
        });
        return components;
    };

    // handle update preview
    const handleUpdatePreview = () => {
        templateComponents?.map((component) => {
            if (
                component.type?.toUpperCase() == "HEADER" &&
                component.format?.toUpperCase() == "TEXT"
            ) {
                let text = component.text;
                component.example?.header_text?.map((value, key) => {
                    let temp_val = document.querySelector<HTMLInputElement>(
                        `input[name="header-variable-${key}"]`
                    )
                        ? document.querySelector<HTMLInputElement>(
                              `input[name="header-variable-${key}"]`
                          ).value
                        : null;
                    if (temp_val && temp_val != "") {
                        text = text.replace(`{{${key + 1}}}`, temp_val);
                    }
                });
                setPreviewHeaderText(text);
            }
            if (component.type?.toUpperCase() == "BODY") {
                let text = component.text;
                (
                    component.example?.body_text[0] ||
                    component.example?.body_text
                )?.map((value, key) => {
                    let temp_val = document.querySelector<HTMLInputElement>(
                        `input[name="body-variable-${key}"]`
                    )
                        ? document.querySelector<HTMLInputElement>(
                              `input[name="body-variable-${key}"]`
                          ).value
                        : null;
                    if (temp_val && temp_val != "") {
                        text = text.replace(`{{${key + 1}}}`, temp_val);
                    }
                });
                setPreviewBodyText(text);
            }
            if (component.type?.toUpperCase() == "FOOTER") {
                let text = component.text;
                component.example?.footer_text?.map((value, key) => {
                    let temp_val = document.querySelector<HTMLInputElement>(
                        `input[name="footer-variable-${key}"]`
                    )
                        ? document.querySelector<HTMLInputElement>(
                              `input[name="footer-variable-${key}"]`
                          ).value
                        : null;
                    if (temp_val && temp_val != "") {
                        text = text.replace(`{{${key + 1}}}`, temp_val);
                    }
                });
                setPreviewFooterText(text);
            }

            if (component.type?.toUpperCase() == "BUTTONS") {
                let buttons = component.buttons;
                let btns = [];
                buttons?.map((button, key) => {
                    let tmp_btn = null;
                    let temp_btn_txt = document.querySelector<HTMLInputElement>(
                        `input[name="button-variable-${key}"]`
                    )
                        ? document.querySelector<HTMLInputElement>(
                              `input[name="button-variable-${key}"]`
                          ).value
                        : null;

                    if (button.type.toUpperCase() == "URL") {
                        let temp_btn_url =
                            document.querySelector<HTMLInputElement>(
                                `input[name="button-variable-${key}-url"]`
                            )
                                ? document.querySelector<HTMLInputElement>(
                                      `input[name="button-variable-${key}-url"]`
                                  ).value
                                : null;
                        tmp_btn = {
                            type: button.type,
                            text: temp_btn_txt || button.text,
                            url: temp_btn_url || button.url,
                        };
                    } else {
                        tmp_btn = {
                            type: button.type,
                            text: temp_btn_txt || button.text,
                        };
                    }
                    btns.push(tmp_btn);
                });
                //console.log("btn: ", btns);
                btns && setPreviewButtons(btns);
            }
        });
    };

    //
    useEffect(() => {
        if (template && templates) {
            templates?.data?.map((item) => {
                if (item.id == template.value)
                    setTemplateComponents(item.components);
            });
        }
    }, [template, templates]);

    useEffect(() => {
        templateComponents?.map((component) => {
            if (
                component.type?.toUpperCase() == "HEADER" &&
                component.format == "TEXT"
            ) {
                let text = component.text;
                // component.example?.header_text?.map((value, key) => {
                //     text = text.replace(`{{${key + 1}}}`, value);
                // });
                setPreviewHeaderText(text);
            }
            if (component.type?.toUpperCase() == "BODY") {
                let text = component.text;
                // (
                //     component.example?.body_text[0] ||
                //     component.example?.body_text
                // )?.map((value, key) => {
                //     text = text.replace(`{{${key + 1}}}`, value);
                // });
                setPreviewBodyText(text);
            }
            if (component.type?.toUpperCase() == "FOOTER") {
                let text = component.text;
                // component.example?.footer_text?.map((value, key) => {
                //     text = text.replace(`{{${key + 1}}}`, value);
                // });
                setPreviewFooterText(text);
            }
            if (component.type?.toUpperCase() == "BUTTONS") {
                let btns = [];
                component?.buttons?.map((item) => {
                    item.type?.toUpperCase() == "QUICK_REPLY"
                        ? btns.push({
                              type: item.type,
                              text: item.text,
                          })
                        : btns.push({
                              type: item.type,
                              url: item.url,
                          });
                });
                setPreviewButtons(btns);
            }
            //setPreviewButtons;
        });
    }, [templateComponents]);

    return (
        <React.Fragment>
            <div
                className="send-template-message-form template-components-container" //overflow-hidden
            >
                <div className="ps-3 pe-1 py-2  send-template-message-form-topbar">
                    <h6 className="me-3" style={{}}>
                        {t("Send Template Message")}
                    </h6>
                    <div className="flex-shrink-0 d-block  send-template-message-form-topbar-close-button">
                        <Button
                            className="btn  btn-light btn-sm shadow-none"
                            onClick={() => {
                                togglePreviewAndSendTemplateMessageModal(false);
                                setTemplate("");
                            }}
                        >
                            <i className="ri-close-line align-bottom"></i>
                        </Button>
                    </div>
                </div>

                <div className=" send-template-message-form-content  ">
                    <div className="template-message-preview">
                        <h6 className="template-message-preview-header">
                            {t("Preview")}
                        </h6>
                        <div
                            style={{
                                background: templateMessagePreviewBG,
                                backgroundImage: `url(${templateMessagePreviewBG})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                            }}
                            className="template-message-preview-content"
                        >
                            <div className=" p-3 ">
                                {previewHeaderText && (
                                    <div className="header mb-2">
                                        {previewHeaderText}
                                    </div>
                                )}
                                {previewBodyText && (
                                    <div className="body mb-2">
                                        {previewBodyText}
                                    </div>
                                )}
                                {previewButtons?.length > 0 && (
                                    <div className="buttons mb-2">
                                        {previewButtons?.map((button) => (
                                            <>
                                                {button.type.toLowerCase() ==
                                                    "url" && (
                                                    <Link
                                                        className="ctext-btn url btn btn-sm btn-outline-primary w-100 mb-2"
                                                        to={button.url}
                                                        target="_blank"
                                                    >
                                                        {button.text}
                                                    </Link>
                                                )}

                                                {button.type?.toUpperCase() ==
                                                    "QUICK_REPLY" && (
                                                    <Button className="ctext-btn reply btn btn-sm btn-outline-secondary w-100 mb-2">
                                                        {button.text}
                                                    </Button>
                                                )}
                                            </>
                                        ))}
                                    </div>
                                )}

                                {previewFooterText && (
                                    <div className="footer mb-2">
                                        {previewFooterText}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="p-3 ">
                        <Form
                        // onSubmit={(e) => {
                        //     e.preventDefault();
                        //     validation.handleSubmit();
                        //     return false;
                        // }}
                        //action="#"
                        >
                            {templateComponents?.map(
                                (component) =>
                                    component.type?.toUpperCase() == "HEADER" &&
                                    component.format == "TEXT" && (
                                        <div className="template-message-header-component mb-4">
                                            {component.example?.header_text && (
                                                <h6 className="template-message-header-component-header">
                                                    {t("Header")}
                                                </h6>
                                            )}
                                            {component.example?.header_text?.map(
                                                (item, key) => (
                                                    <div className="mb-2">
                                                        <Label
                                                            htmlFor={`header-variable-${key}`}
                                                            className="form-label text-muted fs-12"
                                                        >
                                                            {t(
                                                                `Variable ${
                                                                    key + 1
                                                                }`
                                                            )}
                                                        </Label>
                                                        <Input
                                                            name={`header-variable-${key}`}
                                                            className="form-control"
                                                            placeholder={`{{${
                                                                key + 1
                                                            }}}`}
                                                            type="text"
                                                            // onChange={(e) =>
                                                            //     setName(e.target.value)
                                                            // }
                                                            // value={name || ""}
                                                            onChange={
                                                                handleUpdatePreview
                                                            }
                                                        />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )
                            )}

                            {templateComponents?.map(
                                (component) =>
                                    component.type?.toUpperCase() == "BODY" && (
                                        <div className="template-message-body-component mb-4">
                                            {(component.example?.body_text[0] ||
                                                component.example
                                                    ?.body_text) && (
                                                <h6 className="template-message-body-component-header">
                                                    {t("Body")}
                                                </h6>
                                            )}
                                            {(
                                                component.example
                                                    ?.body_text[0] ||
                                                component.example?.body_text
                                            )?.map((item, key) => (
                                                <div className="mb-2">
                                                    <Label
                                                        htmlFor={`body-variable-${key}`}
                                                        className="form-label text-muted fs-12"
                                                    >
                                                        {t(
                                                            `Variable ${
                                                                key + 1
                                                            }`
                                                        )}
                                                    </Label>
                                                    <Input
                                                        name={`body-variable-${key}`}
                                                        className="form-control"
                                                        placeholder={`{{${
                                                            key + 1
                                                        }}}`}
                                                        type="text"
                                                        // onChange={(e) =>
                                                        //     setName(e.target.value)
                                                        // }
                                                        // value={name || ""}
                                                        onChange={
                                                            handleUpdatePreview
                                                        }
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )
                            )}

                            {templateComponents?.map(
                                (component) =>
                                    component.type?.toUpperCase() ==
                                        "BUTTONS" && (
                                        <div className="template-message-button-component ">
                                            {component.buttons?.length > 0 && (
                                                <h6 className="template-message-footer-component-header">
                                                    {t("Buttons")}
                                                </h6>
                                            )}
                                            {component.buttons?.map(
                                                (button, key) => (
                                                    <div className="mb-2">
                                                        <Label
                                                            //htmlFor={`footer-variable-${key}`}
                                                            className="form-label text-muted fs-12"
                                                        >
                                                            {t(
                                                                `Button ${
                                                                    key + 1
                                                                }`
                                                            )}
                                                        </Label>
                                                        <Input
                                                            name={`button-variable-${key}`}
                                                            className="form-control mb-1"
                                                            placeholder={
                                                                button?.text ||
                                                                t(
                                                                    "Enter button text"
                                                                )
                                                            }
                                                            type="text"
                                                            // onChange={(e) =>
                                                            //     setName(e.target.value)
                                                            // }
                                                            // value={name || ""}
                                                            onChange={
                                                                handleUpdatePreview
                                                            }
                                                        />
                                                        {button.type?.toUpperCase() ==
                                                            "URL" && (
                                                            <Input
                                                                name={`button-variable-${key}-url`}
                                                                className="form-control"
                                                                placeholder={
                                                                    button?.url ||
                                                                    t(
                                                                        "Enter URL"
                                                                    )
                                                                }
                                                                type="text"
                                                                // onChange={(e) =>
                                                                //     setName(e.target.value)
                                                                // }
                                                                // value={name || ""}
                                                                onChange={
                                                                    handleUpdatePreview
                                                                }
                                                            />
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )
                            )}

                            {templateComponents?.map(
                                (component) =>
                                    component.type?.toUpperCase() ==
                                        "FOOTER" && (
                                        <div className="template-message-footer-component ">
                                            {component.example?.footer_text && (
                                                <h6 className="template-message-footer-component-header">
                                                    {t("Footer")}
                                                </h6>
                                            )}
                                            {component.example?.footer_text?.map(
                                                (item, key) => (
                                                    <div className="mb-2">
                                                        <Label
                                                            htmlFor={`footer-variable-${key}`}
                                                            className="form-label text-muted fs-12"
                                                        >
                                                            {t(
                                                                `Variable ${
                                                                    key + 1
                                                                }`
                                                            )}
                                                        </Label>
                                                        <Input
                                                            name={`footer-variable-${key}`}
                                                            className="form-control"
                                                            placeholder={`{{${
                                                                key + 1
                                                            }}}`}
                                                            type="text"
                                                            // onChange={(e) =>
                                                            //     setName(e.target.value)
                                                            // }
                                                            // value={name || ""}
                                                            onChange={
                                                                handleUpdatePreview
                                                            }
                                                        />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )
                            )}

                            <div
                                className="mt-4 send-template-message-form-buttons"
                                style={{ justifyContent: "flex-end" }}
                            >
                                <div className="hstack gap-2 justify-content-end">
                                    <Button
                                        type="button"
                                        className="btn btn-sm btn-light"
                                        onClick={() => {
                                            //toggleSendTemplateModal();
                                            togglePreviewAndSendTemplateMessageModal(
                                                false
                                            );
                                            setTemplate("");
                                        }}
                                    >
                                        {" "}
                                        {t("Cancel")}
                                    </Button>
                                    <Button
                                        type="button"
                                        className="btn btn-sm btn-success"
                                        onClick={handleSendTemplateMessage}
                                        disabled={
                                            isEmpty(template) ? true : false
                                        }
                                    >
                                        {t("Send Message")}
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default FillPreviewAndSendTemplateMessage;
