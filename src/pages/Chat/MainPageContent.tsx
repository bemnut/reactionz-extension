import React from "react";
import {
    Button,
    UncontrolledTooltip,
    Input,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
} from "reactstrap";

import { Link } from "react-router-dom";

import classnames from "classnames";

//redux
import { useDispatch } from "react-redux";
import {
    getContacts as onGetContacts,
    getConversations as onGetConversations,
} from "../../slices/thunks";

import { useTranslation } from "react-i18next";

import reactionzLogo from "../../assets/images/reactions_logo.jpg";
import Contacts from "./Contacts";
import Conversations from "./Conversations";

const MainPageContent = ({
    mainPageContentsShow,
    countries,
    handleAddContactModal,
    handleSettingsModal,
    handleLogout,
    setFilter,
    customActiveTab,
    conversationsListType,
    filter,
    toggleCustom,
    conversationsCount,
    contactsCount,
    userChatOpen,
    setSelectedContact,
    setContact,
    setConversationsListType,
    setContactForEditing,
    conversationsListAssignedTo,
    setConversationsListAssignedTo,
}) => {
    const dispatch = useDispatch<any>();
    const { t } = useTranslation();

    return (
        <React.Fragment>
            <div
                className="chat-leftsidebar main-page-contents w-100"
                ref={mainPageContentsShow}
            >
                <div className="px-4 pt-4 mb-2 pe-2">
                    <div className="d-flex align-items-start mb-3">
                        <div className="flex-grow-1">
                            {/* <h5 className="mb-4">Chats</h5> */}
                            <div className="site-logo">
                                <Link
                                    to={"https://staging.web.reactionz.io"}
                                    target="_blank"
                                >
                                    <img
                                        src={reactionzLogo}
                                        className="reactionz-logo"
                                        alt=""
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <UncontrolledTooltip
                                placement="bottom"
                                target="addcontact"
                            >
                                {t("Add Contact")}
                            </UncontrolledTooltip>

                            <UncontrolledTooltip
                                placement="bottom"
                                target="settings"
                            >
                                {t("Setting")}
                            </UncontrolledTooltip>

                            <UncontrolledTooltip
                                placement="bottom"
                                target="logout"
                            >
                                {t("Logout")}
                            </UncontrolledTooltip>

                            <Button
                                color=""
                                id="addcontact"
                                className="btn btn-soft-success btn-sm shadow-none me-2"
                                onClick={handleAddContactModal}
                            >
                                <i className="ri-user-add-line align-bottom"></i>
                            </Button>
                            <Button
                                color=""
                                id="settings"
                                className="btn btn-soft-primary btn-sm shadow-none me-2"
                                onClick={handleSettingsModal}
                            >
                                <i className="ri-tools-fill align-bottom"></i>
                            </Button>

                            <Button
                                color=""
                                id="logout"
                                className="btn btn-soft-danger btn-sm shadow-none"
                                onClick={handleLogout}
                            >
                                <i className="ri-shut-down-line align-bottom"></i>
                            </Button>
                        </div>
                    </div>
                    <div className="search-box">
                        <Input
                            onChange={(e) => {
                                setFilter(e.target.value);

                                // console.log(
                                //     "e.target: ",
                                //     (
                                //         e.target as HTMLInputElement
                                //     ).value
                                // );
                            }}
                            id="search-user"
                            type="text"
                            className="form-control bg-light border-light"
                            placeholder={t(
                                `Search ${
                                    customActiveTab == "conversations"
                                        ? conversationsListType
                                        : ""
                                } ${customActiveTab}...`
                            )}
                            value={filter ? filter : ""}
                        />
                        <i className="ri-search-2-line search-icon"></i>
                    </div>
                </div>

                <Nav
                    tabs
                    className="nav nav-tabs nav-tabs-custom nav-success nav-justified mb-3"
                >
                    <NavItem>
                        <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                                active: customActiveTab === "conversations",
                            })}
                            onClick={() => {
                                toggleCustom("conversations");
                                if (
                                    conversationsListType == "open" ||
                                    conversationsListType == "closed"
                                ) {
                                    dispatch(
                                        onGetConversations({
                                            status: conversationsListType,
                                        })
                                    );
                                } else {
                                    dispatch(onGetConversations({}));
                                }
                            }}
                        >
                            <div
                                className="d-flex align-items-center "
                                style={{
                                    justifyContent: "center",
                                }}
                            >
                                <i className="ri-question-answer-line me-2"></i>
                                <div>
                                    {t("Conversations")}{" "}
                                    {`(${conversationsCount})`}
                                </div>
                            </div>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                                active: customActiveTab === "contacts",
                            })}
                            onClick={() => {
                                toggleCustom("contacts");
                                dispatch(onGetContacts({}));
                            }}
                        >
                            <div
                                className="d-flex align-items-center "
                                style={{
                                    justifyContent: "center",
                                }}
                            >
                                <i className="ri-contacts-line me-2"></i>
                                {t("Contacts")} {`(${contactsCount})`}
                            </div>
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={customActiveTab} className="text-muted">
                    <TabPane tabId="conversations" id="conversations-pane">
                        <Conversations
                            userChatOpen={userChatOpen}
                            setSelectedContact={setSelectedContact}
                            setContact={setContact}
                            countries={countries}
                            filter={filter}
                            conversationsListType={conversationsListType}
                            setConversationsListType={setConversationsListType}
                            conversationsListAssignedTo={
                                conversationsListAssignedTo
                            }
                            setConversationsListAssignedTo={
                                setConversationsListAssignedTo
                            }
                        />
                    </TabPane>
                    <TabPane tabId="contacts" id="contacts-pane">
                        <Contacts
                            userChatOpen={userChatOpen}
                            setSelectedContact={setSelectedContact}
                            setContact={setContact}
                            countries={countries}
                            filter={filter}
                            setContactForEditing={setContactForEditing}
                            handleAddContactModal={handleAddContactModal}
                        />
                    </TabPane>
                </TabContent>
            </div>
        </React.Fragment>
    );
};

export default MainPageContent;
