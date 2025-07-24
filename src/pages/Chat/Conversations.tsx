import React, { useEffect, useState, useCallback, useRef } from "react";
import {
    Button,
    UncontrolledTooltip,
    Input,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Label,
} from "reactstrap";

import { useNavigate } from "react-router-dom";
import SimpleBar from "simplebar-react";

import { isEmpty, orderBy } from "lodash";
import moment from "moment";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
    getConversations as onGetConversations,
    updateConversationStatus as onUpdateConversationStatus,
} from "../../slices/thunks";

import { createSelector } from "reselect";
import classnames from "classnames";

import {
    getCountryByAreaCode,
    getCountryFlag,
    getPhoneNumberInfo,
    getPageLinksPayload,
    getNameInitials,
    isJsonString,
} from "./common_functions";
import { useTranslation } from "react-i18next";
import { getLoggedinUser } from "../../helpers/api_helper";

const Conversations = ({
    userChatOpen,
    setSelectedContact,
    setContact,
    countries,
    filter,
    conversationsListType,
    setConversationsListType,
    conversationsListAssignedTo,
    setConversationsListAssignedTo,
}) => {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const selectChatState = (state) => state;
    const chatProperties = createSelector(selectChatState, (state) => ({
        user: state.Login.user,
        conversations: state.Message.conversations,
        isConversationUpdated: state.Message.isConversationUpdated,
        language: state.Layout.language,
    }));
    // Inside your component
    const { conversations, isConversationUpdated, user, language } =
        useSelector(chatProperties);

    const [sortedConversations, setSortedConversations] = useState([]);

    useEffect(() => {
        //
        const auth_user = user || getLoggedinUser();

        let payload = {};

        if (
            conversationsListType == "open" ||
            conversationsListType == "closed"
        ) {
            payload["status"] = conversationsListType;
        }
        if (auth_user?.id && conversationsListAssignedTo == "mine") {
            payload["assignedTo"] = auth_user?.id;
        }
        if (filter != null && filter != "") {
            payload["parameter"] = `?search=${filter}&search_in=contact`;
        }

        dispatch(onGetConversations(payload));
    }, [conversationsListType, conversationsListAssignedTo]);

    useEffect(() => {
        const auth_user = user || getLoggedinUser();
        if (isConversationUpdated == true) {
            if (
                conversationsListType == "open" ||
                conversationsListType == "closed"
            ) {
                if (auth_user && conversationsListAssignedTo == "mine") {
                    dispatch(
                        onGetConversations({
                            assignedTo: auth_user?.id,
                        })
                    );
                } else {
                    dispatch(
                        onGetConversations({ status: conversationsListType })
                    );
                }
            } else {
                if (auth_user && conversationsListAssignedTo == "mine") {
                    dispatch(
                        onGetConversations({
                            assignedTo: auth_user?.id,
                        })
                    );
                } else {
                    dispatch(onGetConversations({}));
                }
            }
        }
    }, [isConversationUpdated]);

    // sort the conversations by date
    useEffect(() => {
        if (!isEmpty(conversations)) {
            setSortedConversations(
                orderBy(conversations?.data, "message.status.timestamp", "desc")
            );
        } else {
            setSortedConversations([]);
        }
    }, [conversations]);

    const handleUpdateConversationStatus = (contact_id, status) => {
        const payload = {
            contactId: contact_id,
            status: { status: status },
        };
        dispatch(onUpdateConversationStatus(payload));
    };

    const handleClearSearchInput = () => {
        const input: any = document.getElementById("search-user");
        input && (input.value = "");
    };

    const handleGetPaginatedConversations = (link, filter) => {
        const auth_user = user || getLoggedinUser();

        let payload = {};

        const pageLinks = getPageLinksPayload(link, filter);
        if (
            conversationsListType == "open" ||
            conversationsListType == "closed"
        ) {
            payload["status"] = conversationsListType;
        }
        if (auth_user?.id && conversationsListAssignedTo == "mine") {
            payload["assignedTo"] = auth_user?.id;
        }
        pageLinks?.search && (payload["search"] = pageLinks?.search);
        pageLinks?.page && (payload["page"] = pageLinks?.page);

        dispatch(onGetConversations(payload));
    };

    return (
        <React.Fragment>
            <div
                className="conversations-radio-buttons d-flex mb- "
                style={{ marginBottom: "-0.5rem" }}
            >
                <div className="all-mine py-1 px-2">
                    <div className="title small text-muted">
                        {t("Assigned To")}
                    </div>
                    <div className="wrapper d-flex ">
                        <div className="form-check ">
                            <Input
                                className="form-check-input"
                                type="radio"
                                name="conversations-list-assigned-to-all"
                                id="conversations-radio-1"
                                onClick={() => {
                                    setConversationsListAssignedTo("all");
                                    handleClearSearchInput();
                                }}
                                checked={
                                    conversationsListAssignedTo == "all"
                                        ? true
                                        : false
                                }
                            />
                            &rlm;
                            <Label
                                className="form-check-label"
                                for="flexRadioDefault1"
                            >
                                {t("All")}
                            </Label>
                        </div>
                        <div className="form-check ">
                            <Input
                                className="form-check-input"
                                type="radio"
                                name="conversations-list-assigned-to-me"
                                id="conversations-radio-2"
                                onClick={() => {
                                    setConversationsListAssignedTo("mine");
                                    handleClearSearchInput();
                                }}
                                checked={
                                    conversationsListAssignedTo == "mine"
                                        ? true
                                        : false
                                }
                            />
                            &rlm;
                            <Label
                                className="form-check-label"
                                for="flexRadioDefault1"
                            >
                                {t("Mine")}
                            </Label>
                        </div>
                    </div>
                </div>
                <div className="open-closed py-1 px-2">
                    <div className="title small text-muted">
                        {t("Conversation Status")}
                    </div>
                    <div className="wrapper d-flex ">
                        <div className="form-check ">
                            <Input
                                className="form-check-input"
                                type="radio"
                                name="conversations-list-all"
                                id="conversations-radio-3"
                                onClick={() => {
                                    setConversationsListType("all");
                                    handleClearSearchInput();
                                }}
                                checked={
                                    conversationsListType == "all"
                                        ? true
                                        : false
                                }
                                dir="rtl"
                            />
                            &rlm;
                            <Label
                                className="form-check-label"
                                for="flexRadioDefault1"
                            >
                                {t("All")}
                            </Label>
                        </div>
                        <div className="form-check ">
                            <Input
                                className="form-check-input"
                                type="radio"
                                name="conversations-list-open"
                                id="conversations-radio-4"
                                onClick={() => {
                                    setConversationsListType("open");
                                    handleClearSearchInput();
                                }}
                                checked={
                                    conversationsListType == "open"
                                        ? true
                                        : false
                                }
                            />
                            &rlm;
                            <Label
                                className="form-check-label"
                                for="flexRadioDefault1"
                            >
                                {t("Open")}
                            </Label>
                        </div>
                        <div className="form-check ">
                            <Input
                                className="form-check-input"
                                type="radio"
                                name="conversations-list-resolved"
                                id="conversations-radio-5"
                                onClick={() => {
                                    setConversationsListType("closed");
                                    handleClearSearchInput();
                                }}
                                checked={
                                    conversationsListType == "closed"
                                        ? true
                                        : false
                                }
                            />
                            &rlm;
                            <Label
                                className="form-check-label"
                                for="flexRadioDefault1"
                            >
                                {t("Closed")}
                            </Label>
                        </div>
                    </div>
                </div>
            </div>
            <SimpleBar
                className="conversations chat-room-list "
                //style={{ margin: "-16px 0px 0px" }}
                data-simplebar-direction={
                    language && language == "US_en" ? "ltr" : "rtl"
                }
            >
                <div className="sort-contact">
                    <div className="mt-3">
                        {conversations?.links?.prev && (
                            <>
                                <div
                                    className="d-flex"
                                    style={{
                                        justifyContent: "center",
                                        marginBottom: "1rem",
                                    }}
                                >
                                    <Button
                                        color=""
                                        id="previousPage"
                                        className="btn btn-soft-success btn-sm shadow-none me-2"
                                        onClick={() => {
                                            handleGetPaginatedConversations(
                                                conversations?.links?.prev,
                                                filter
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
                                    {t("Previous List")}
                                </UncontrolledTooltip>
                            </>
                        )}
                        <ul
                            id={"conversations-list"}
                            className="list-unstyled contact-list "
                        >
                            {sortedConversations?.map((conversation, key) => (
                                <li
                                    key={key}
                                    className={classnames({
                                        unread: conversation?.unreadCount != 0,
                                    })}
                                >
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0 me-3 position-relative">
                                            <div className="contact-list-avtar">
                                                {conversation.contact
                                                    ?.profilePicture ? (
                                                    <img
                                                        src={
                                                            conversation.contact
                                                                ?.profilePicture
                                                        }
                                                        className="img-fluid rounded-circle"
                                                        alt=""
                                                    />
                                                ) : (
                                                    <span className="avatar-title rounded-circle bg-primary ">
                                                        {getNameInitials(
                                                            conversation.contact
                                                                ?.firstName,
                                                            conversation.contact
                                                                ?.lastName
                                                        )}
                                                    </span>
                                                )}
                                                {countries &&
                                                    conversation?.contact && (
                                                        <div className="country-flag">
                                                            {countries &&
                                                                getCountryByAreaCode(
                                                                    countries,
                                                                    getPhoneNumberInfo(
                                                                        conversation
                                                                            ?.contact
                                                                            ?.phone
                                                                    )?.phoneInfo
                                                                        ?.areaCode
                                                                ) && (
                                                                    <img
                                                                        src={getCountryFlag(
                                                                            getCountryByAreaCode(
                                                                                countries,
                                                                                getPhoneNumberInfo(
                                                                                    conversation
                                                                                        ?.contact
                                                                                        ?.phone
                                                                                )
                                                                                    ?.phoneInfo
                                                                                    ?.areaCode
                                                                            )
                                                                                ?.iso2
                                                                        )}
                                                                        className=""
                                                                        alt=""
                                                                    />
                                                                )}
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                        <div
                                            className="conversation flex-grow-1"
                                            onClick={(e) => {
                                                setSelectedContact(
                                                    setContact(
                                                        conversation.contact,
                                                        countries
                                                    )
                                                );
                                                userChatOpen(
                                                    conversation.contact
                                                );
                                            }}
                                        >
                                            <p className="text-truncate contact-list-name mb-0 d-flex align-items-center">
                                                <div className="me-1">
                                                    {conversation.contact
                                                        ?.firstName
                                                        ? conversation.contact
                                                              ?.firstName
                                                        : conversation.contact
                                                              ?.phone}
                                                </div>
                                                <div className="mx-2">
                                                    {" - "}
                                                </div>
                                                <div className="contact-list-last-message-date text-muted ms-1">
                                                    {" "}
                                                    {moment
                                                        .unix(
                                                            conversation.message
                                                                ?.status
                                                                ?.timestamp
                                                        )
                                                        .local()
                                                        .fromNow()}
                                                </div>{" "}
                                            </p>
                                            <p className="text-muted text-truncate contact-list-last-message mb-0">
                                                {conversation.message?.message
                                                    ?.type == "text"
                                                    ? isJsonString(
                                                          conversation.message
                                                              ?.message?.text
                                                      )
                                                        ? JSON.parse(
                                                              conversation
                                                                  .message
                                                                  ?.message
                                                                  ?.text
                                                          )?.emoji
                                                        : conversation.message
                                                              ?.message?.text
                                                    : conversation.message
                                                          ?.message?.type ==
                                                      "attachment"
                                                    ? t("attachment")
                                                    : conversation.message?.message?.type?.includes(
                                                          "template"
                                                      )
                                                    ? t("template")
                                                    : ""}
                                            </p>
                                        </div>
                                        <div className="flex-shrink-0 conversation-actions">
                                            <UncontrolledDropdown>
                                                <DropdownToggle
                                                    tag="a"
                                                    className="text-muted"
                                                >
                                                    <i className="ri-more-2-fill" />
                                                </DropdownToggle>
                                                <DropdownMenu className="dropdown-menu-end conversation-dropdown-menus">
                                                    {conversation.contact?.status?.toLowerCase() ==
                                                    "open" ? (
                                                        <DropdownItem
                                                            onClick={() =>
                                                                handleUpdateConversationStatus(
                                                                    conversation
                                                                        .contact
                                                                        ?.id,
                                                                    "closed"
                                                                )
                                                            }
                                                        >
                                                            <i className="ri-chat-off-line text-muted me-2 align-bottom" />
                                                            {t(
                                                                "Close Conversation"
                                                            )}
                                                        </DropdownItem>
                                                    ) : (
                                                        <DropdownItem
                                                            onClick={() =>
                                                                handleUpdateConversationStatus(
                                                                    conversation
                                                                        .contact
                                                                        ?.id,
                                                                    "open"
                                                                )
                                                            }
                                                        >
                                                            <i className="ri-chat-4-line text-muted me-2 align-bottom" />

                                                            {t(
                                                                "Open Conversation"
                                                            )}
                                                        </DropdownItem>
                                                    )}
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {conversations?.links?.next && (
                            <>
                                <div
                                    className="d-flex"
                                    style={{
                                        justifyContent: "center",
                                        marginBottom: "1rem",
                                    }}
                                >
                                    <Button
                                        color=""
                                        id="nextPage"
                                        className="btn btn-soft-success btn-sm shadow-none me-2"
                                        onClick={() => {
                                            handleGetPaginatedConversations(
                                                conversations?.links?.next,
                                                filter
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
                                    {t("Next List")}
                                </UncontrolledTooltip>
                            </>
                        )}
                    </div>
                </div>
            </SimpleBar>
        </React.Fragment>
    );
};

export default Conversations;
