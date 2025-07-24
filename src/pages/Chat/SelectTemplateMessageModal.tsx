import React, { useEffect, useState, useCallback } from "react";
import {
    Button,
    Label,
    Form,
    DropdownToggle,
    Input,
    DropdownItem,
    DropdownMenu,
    Dropdown,
    UncontrolledTooltip,
} from "reactstrap";
import Select from "react-select";
import * as Yup from "yup";
import { useFormik } from "formik";

import { isEmpty, map } from "lodash";

//Import Icons
import FeatherIcon from "feather-icons-react";
//import PersonalInfo from "./PersonalInfo";

import { messages, chatContactData } from "../../common/data";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
    getTemplates as onGetTemplatesApi,
    sendTemplateMessage as onSendTemplateMessage,
} from "../../slices/thunks";

import avatar2 from "../../assets/images/users/avatar-2.jpg";
import userDummayImage from "../../assets/images/users/user-dummy-img.jpg";

//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { createSelector } from "reselect";
import { getLoggedinUser } from "../../helpers/api_helper";
import { useTranslation } from "react-i18next";
import { getPageLinksPayload } from "./common_functions";

const SelectTemplateMessageModal = ({
    toggleSendTemplateModal,
    togglePreviewAndSendTemplateMessageModal,
    templates,
    template,
    setTemplate,
}) => {
    const dispatch = useDispatch<any>();
    const { t } = useTranslation();

    const selectChatState = (state) => state;
    const chatProperties = createSelector(selectChatState, (state) => ({
        user: state.Login.user,
    }));
    // Inside your component
    const { user } = useSelector(chatProperties);

    //const [template, setTemplate] = useState<any>("");
    const [templateOptions, setTemplateOptions] = useState([]);

    const [country, setCountry] = useState<any>("");
    const [filterText, setFilterText] = useState<any>("");
    const [showTemplatesPane, setShowTemplatesPane] = useState(false);

    const toggleTemplatesPane = () => {
        setShowTemplatesPane(!showTemplatesPane);
    };

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

    // useEffect(() => {
    //     //dispatch(onGetTemplatesApi());
    //     searchTemplates();
    // }, []);

    useEffect(() => {
        searchTemplates();
    }, [filterText]);

    const searchTemplates = useCallback(() => {
        filterText != null && filterText != ""
            ? dispatch(
                  onGetTemplatesApi({
                      search: filterText,
                      //page: templates?.meta?.current_page,
                  })
              )
            : dispatch(
                  onGetTemplatesApi({
                      //page: templates?.meta?.current_page,
                  })
              );
    }, [filterText]);

    useEffect(() => {
        !isEmpty(template) && togglePreviewAndSendTemplateMessageModal(true);
    }, [template]);

    return (
        <React.Fragment>
            <div
                className="send-template-message-form " //overflow-hidden
            >
                <div className="ps-3 pe-1 py-2  send-template-message-form-topbar">
                    <h6 className="me-3" style={{}}>
                        {t("Select A Template To Send")}
                    </h6>
                    <div className="flex-shrink-0 d-block  send-template-message-form-topbar-close-button">
                        <Button
                            className="btn  btn-light btn-sm shadow-none"
                            onClick={toggleSendTemplateModal}
                        >
                            <i className="ri-close-line align-bottom"></i>
                        </Button>
                    </div>
                </div>
                <div className="pt-0 send-template-message-form-content">
                    <div className="p-2 ">
                        <Form
                        // onSubmit={(e) => {
                        //     e.preventDefault();
                        //     validation.handleSubmit();
                        //     return false;
                        // }}
                        //action="#"
                        >
                            {/* <div className="my-3">
                                <Label
                                    htmlFor="template_name text-muted"
                                    className="form-label"
                                >
                                    {t("Template Messages")}
                                </Label>
                                <Select
                                    className="basic-single "
                                    classNamePrefix="value"
                                    defaultValue
                                    isDisabled={false}
                                    isLoading={false}
                                    isClearable={true}
                                    //isRtl={isRtl}
                                    isSearchable={true}
                                    name="template_name"
                                    placeholder={t("Select a template mesasge")}
                                    options={templateOptions || []}
                                    onChange={(e: any) => {
                                        e && e.value
                                            ? setTemplate(e)
                                            : setTemplate("");
                                    }}
                                    maxMenuHeight={160}
                                />
                            </div> */}

                            <div className="my-3">
                                <div className="templates-list-dropdown-wrapper ">
                                    <Dropdown
                                        isOpen={showTemplatesPane}
                                        toggle={toggleTemplatesPane}
                                        style={{
                                            position: "relative",
                                        }}
                                    >
                                        <DropdownToggle
                                            className="btn btn-ghost-secondary btn-icon"
                                            tag="a"
                                            style={{
                                                cursor: "pointer",
                                                width: "100%",
                                                justifyContent: "flex-start",
                                            }}
                                        >
                                            <i className="ri-arrow-down-s-line align-bottom mx-2"></i>
                                            {template ? (
                                                <span className="text-success mx-2">
                                                    {template?.label}
                                                </span>
                                            ) : (
                                                <span className="text-muted mx-2">
                                                    {" "}
                                                    {t("Select a template")}
                                                </span>
                                            )}
                                        </DropdownToggle>
                                        <DropdownMenu
                                            className="p-0 dropdown-menu-end dropdown-menu-lg"
                                            style={{
                                                left: "0",
                                                right: "auto",
                                                minWidth: "17rem",
                                                maxWidth: "17rem",
                                                height: "190px",
                                                overflow: "hidden",
                                                transform:
                                                    "translate3d(-24.33333px, 30.3333px, 0px)",
                                            }}
                                        >
                                            <>
                                                <div className="p-2">
                                                    <Input
                                                        onChange={(e) => {
                                                            setFilterText(
                                                                e.target.value
                                                            );
                                                            // console.log(
                                                            //     "e.target: ",
                                                            //     (
                                                            //         e.target as HTMLInputElement
                                                            //     ).value
                                                            // );
                                                            //searchTemplates();
                                                        }}
                                                        id="searchTemplate"
                                                        type="text"
                                                        className="form-control bg-light border-light"
                                                        placeholder={t(
                                                            `Search Templates...`
                                                        )}
                                                        value={
                                                            filterText
                                                                ? filterText
                                                                : ""
                                                        }
                                                    />
                                                </div>

                                                <div
                                                    className="templates-list"
                                                    style={{
                                                        maxHeight: "140px",
                                                        overflow: "auto",
                                                        left: "0",
                                                        right: "auto",
                                                    }}
                                                >
                                                    <>
                                                        {templates?.links
                                                            ?.prev && (
                                                            <>
                                                                <div
                                                                    className="d-flex"
                                                                    style={{
                                                                        justifyContent:
                                                                            "center",
                                                                        marginBottom:
                                                                            "1rem",
                                                                    }}
                                                                >
                                                                    <Button
                                                                        color=""
                                                                        id="previousPage"
                                                                        className="btn btn-soft-success btn-sm shadow-none me-2"
                                                                        onClick={() => {
                                                                            dispatch(
                                                                                onGetTemplatesApi(
                                                                                    getPageLinksPayload(
                                                                                        templates
                                                                                            ?.links
                                                                                            ?.prev,
                                                                                        filterText
                                                                                    )
                                                                                )
                                                                            );
                                                                        }}
                                                                    >
                                                                        <i className="ri-arrow-up-s-line align-bottom"></i>
                                                                    </Button>
                                                                </div>
                                                                <UncontrolledTooltip
                                                                    placement="bottom"
                                                                    target="previousPage"
                                                                >
                                                                    {t(
                                                                        "Previous List"
                                                                    )}
                                                                </UncontrolledTooltip>
                                                            </>
                                                        )}
                                                        {templates?.data?.map(
                                                            (template) => (
                                                                <DropdownItem
                                                                    onClick={() => {
                                                                        setTemplate(
                                                                            {
                                                                                label: template.name,
                                                                                value: template.id,
                                                                            }
                                                                        );
                                                                    }}
                                                                >
                                                                    <div className="template-name">
                                                                        {
                                                                            template.name
                                                                        }
                                                                    </div>
                                                                </DropdownItem>
                                                            )
                                                        )}
                                                        {templates?.links
                                                            ?.next && (
                                                            <>
                                                                <div
                                                                    className="d-flex"
                                                                    style={{
                                                                        justifyContent:
                                                                            "center",
                                                                        marginBottom:
                                                                            "1rem",
                                                                    }}
                                                                >
                                                                    <Button
                                                                        color=""
                                                                        id="nextPage"
                                                                        className="btn btn-soft-success btn-sm shadow-none me-2"
                                                                        onClick={() => {
                                                                            dispatch(
                                                                                onGetTemplatesApi(
                                                                                    getPageLinksPayload(
                                                                                        templates
                                                                                            ?.links
                                                                                            ?.next,
                                                                                        filterText
                                                                                    )
                                                                                )
                                                                            );
                                                                        }}
                                                                    >
                                                                        <i className="ri-arrow-down-s-line align-bottom"></i>
                                                                    </Button>
                                                                </div>
                                                                <UncontrolledTooltip
                                                                    placement="top"
                                                                    target="nextPage"
                                                                >
                                                                    {t(
                                                                        "Next List"
                                                                    )}
                                                                </UncontrolledTooltip>
                                                            </>
                                                        )}
                                                    </>
                                                </div>
                                            </>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            </div>

                            <div
                                className="mt-4 send-template-message-form-buttons"
                                style={{ justifyContent: "flex-end" }}
                            >
                                <div className="hstack gap-2 justify-content-end">
                                    <Button
                                        type="button"
                                        className="btn btn-sm btn-light"
                                        onClick={toggleSendTemplateModal}
                                    >
                                        {" "}
                                        {t("Cancel")}
                                    </Button>
                                    <Button
                                        type="button"
                                        className="btn btn-sm btn-success"
                                        onClick={() =>
                                            !isEmpty(template) &&
                                            togglePreviewAndSendTemplateMessageModal(
                                                true
                                            )
                                        }
                                        disabled={
                                            isEmpty(template) ? true : false
                                        }
                                    >
                                        {t("Apply")}
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

export default SelectTemplateMessageModal;
