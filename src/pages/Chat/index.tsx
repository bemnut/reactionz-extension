import React, { useEffect, useState, useCallback, useRef } from "react";
import {
    Container,
    Button,
    UncontrolledTooltip,
    Input,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
} from "reactstrap";

import { Link, useNavigate } from "react-router-dom";

import classnames from "classnames";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
    logoutUser as onLogout,
    getContacts as onGetContacts,
    getConversations as onGetConversations,
    getContactConversations as onGetContactConversationsApi,
    markConversationAsRead as onMarkConversationAsReadApi,
    //getCountries as onGetCountries,
    getTags as onGetTags,
    getLifeCycles as onGetLifeCycles,
    getChannels as onGetChannels,
    changeUserState as onChangeUserState,
    fireberryContactsSearchState,
    fireberryContactsSearch as onFireberryContactsSearch,
    changeExtensionWindowStatus as changeExtensionWindowStatusState,
    getNotifications as onGetNotificationsApi,
} from "../../slices/thunks";

import reactionzLogo from "../../assets/images/reactions_logo.jpg";
import reactionzMinimizedLogo from "../../assets/images/reactionz.png";

import "react-perfect-scrollbar/dist/css/styles.css";
import { createSelector } from "reselect";
import AddContact from "./addContact";
import Contacts from "./Contacts";
import Conversations from "./Conversations";
import ChatContent from "./ChatContent";
import SettingsModal from "./SettingsModal";
import { getLoggedinUser } from "../../helpers/api_helper";
import {
    getCountry,
    countries,
    getFireberryUUIDFromURL,
} from "./common_functions";

import { useTranslation } from "react-i18next";
import RTLWrapper from "../RTLWrappper";
import useEcho from "../../helpers/useEcho";
import notificationAudio from "../../assets/audio/whatsapp-message-for-iphone.mp3";
import { isEmpty } from "lodash";
import { validate as isValidUUID } from "uuid";

const Chat = () => {
    useEffect(() => {
        window.process = {
            ...window.process,
        };
    }, []);

    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const { t } = useTranslation();

    // {t("Columns")}

    const selectChatState = (state) => state;
    const chatProperties = createSelector(selectChatState, (state) => ({
        user: state.Login.user,
        conversations: state.Message.conversations,
        contacts: state.Contact.contacts,
        fireberryContactsSearch: state.Contact.fireberryContactsSearch,
        extensionWindowStatus: state.Layout.extensionWindowStatus,
        showOnFireberryStatus: state.Layout.showOnFireberryStatus,
        isNotificationUpdated: state.Notification.isNotificationUpdated,
        notification: state.Notification.notification,
    }));
    // Inside your component
    const {
        user,
        conversations,
        contacts,
        fireberryContactsSearch,
        extensionWindowStatus,
        showOnFireberryStatus,
        isNotificationUpdated,
        notification,
    } = useSelector(chatProperties);

    const userChatShow = useRef<HTMLInputElement>();
    const addContactShow = useRef<HTMLInputElement>();
    const chatSidebarShow = useRef<HTMLInputElement>();
    const settingsShow = useRef<HTMLInputElement>();

    const [selectedContact, setSelectedContact] = useState(null);
    const [incomingMesasgeContactID, setIncomingMesasgeContactID] =
        useState(null);
    const [customActiveTab, setcustomActiveTab] = useState("conversations");
    // const [extensionWindowStatus, setExtensionWindowStatus] =
    //     useState("minimize-window");
    const [conversationsListType, setConversationsListType] = useState("all");
    const [conversationsListAssignedTo, setConversationsListAssignedTo] =
        useState("all");
    const [filter, setFilter] = useState<any>(null);
    const [contactsCount, setContactsCount] = useState<any>(0);
    const [conversationsCount, setConversatiosCount] = useState<any>(0);
    const [contactForEditing, setContactForEditing] = useState<any>(null);
    const [uuid, setuuid] = useState<any>(null);

    const echo = useEcho();

    const playAudio = () => {
        new Audio(notificationAudio).play();
    };

    chrome.runtime.onMessage.addListener(function (
        message,
        sender,
        sendResponse
    ) {
        if (message.tabChanged === true) {
            const uuid = getFireberryUUIDFromURL(message?.url);
            // message.url?.split("/")?.pop() ||
            // message.url?.split("/")?.pop();
            //console.log("uuid in chrom runtime: ", uuid);
            isValidUUID(uuid) && setuuid(uuid);
            dispatch(fireberryContactsSearchState(null));
        }
    });

    useEffect(() => {
        setTimeout(() => {
            chrome.tabs.query({ currentWindow: true }, (tabs) => {
                const tab = tabs[0] || null;
                //console.log("tabs: ", tabs);
                tabs.forEach(function (tab) {
                    if (tab?.url && tab.url?.includes("app.fireberry.com")) {
                        //console.log("tab: ", tab);
                        const uuid = getFireberryUUIDFromURL(tab?.url);
                        //tab.url?.split("/")?.pop() || tab.url?.split("/")?.pop();
                        isValidUUID(uuid) && setuuid(uuid);
                        dispatch(fireberryContactsSearchState(null));
                    }
                });
            });
        }, 1000);
    }, []);

    // get notifications
    useEffect(() => {
        dispatch(onGetNotificationsApi());
    }, []);

    useEffect(() => {
        isNotificationUpdated && dispatch(onGetNotificationsApi());
    }, [isNotificationUpdated]);
    //
    useEffect(() => {
        // /uuid && dispatch();
        //console.log("uuid: ", uuid);
        if (uuid) {
            //dispatch(fireberryContactsSearchState(null));
            let val = uuid;
            const payload = {
                search: val,
            };
            dispatch(onFireberryContactsSearch(payload));
            setuuid(null);
        }
    }, [uuid]);

    useEffect(() => {
        //console.log("fireberryContactsSearch: ", fireberryContactsSearch);
        if (fireberryContactsSearch?.data[0]) {
            const contact = fireberryContactsSearch?.data[0];
            contact && setSelectedContact(setContact(contact, countries));
            contact && userChatOpen(contact);
            // console.log("showOnFireberryStatus: ", showOnFireberryStatus);
            // console.log(
            //     "contact && showOnFireberryStatus == 'show': ",
            //     contact && showOnFireberryStatus == "show"
            // );

            if (contact && showOnFireberryStatus == "show") {
                chrome.runtime.sendMessage({
                    sendBack: true,
                    data: {
                        show_conversation_pane: true,
                    },
                });
            } else {
                chrome.runtime.sendMessage({
                    sendBack: true,
                    data: {
                        show_conversation_pane: false,
                    },
                });
            }
        } else {
            chrome.runtime.sendMessage({
                sendBack: true,
                data: {
                    show_conversation_pane: false,
                },
            });
        }
    }, [fireberryContactsSearch, showOnFireberryStatus]);

    // useEffect(() => {
    //     chrome.runtime.sendMessage({
    //         sendBack: true,
    //         data: {
    //             show_conversation_pane: true,
    //         },
    //     });
    // }, []);

    useEffect(() => {
        const auth_user = user || getLoggedinUser();
        if (echo && auth_user) {
            // Subscribe to a channel and listen for events
            echo.private(`message.${auth_user?.id}`).listen(
                ".App\\Events\\IncomingMessage",
                (e) => {
                    setIncomingMesasgeContactID(null);
                    //console.log("Message received:", e);
                    if (e?.message?.traffic == "incoming") {
                        playAudio();

                        e?.message?.contact_id &&
                            setIncomingMesasgeContactID(e?.message?.contact_id);
                        let payload = {};

                        if (
                            auth_user?.id &&
                            conversationsListAssignedTo == "mine"
                        ) {
                            payload["assignedTo"] = auth_user?.id;
                        }
                        if (filter != null && filter != "") {
                            payload[
                                "parameter"
                            ] = `?search=${filter}&search_in=contact`;
                        }
                        if (
                            conversationsListType == "open" ||
                            conversationsListType == "closed"
                        ) {
                            payload["status"] = conversationsListType;
                        }
                        dispatch(onGetConversations(payload));
                    }
                }
            );
            echo.private(`message.${auth_user?.id}`).listen(
                ".App\\Events\\MessageStatus",
                (e) => {
                    setIncomingMesasgeContactID(null);
                    if (e?.message?.traffic == "outgoing") {
                        //playAudio();
                        // console.log(
                        //     "e?.message?.contact_id: ",
                        //     e?.message?.contact_id
                        // );
                        e?.message?.contact_id &&
                            setIncomingMesasgeContactID(e?.message?.contact_id);
                        let payload = {};
                        if (
                            auth_user?.id &&
                            conversationsListAssignedTo == "mine"
                        ) {
                            payload["assignedTo"] = auth_user?.id;
                        }
                        if (filter != null && filter != "") {
                            payload[
                                "parameter"
                            ] = `?search=${filter}&search_in=contact`;
                        }
                        if (
                            conversationsListType == "open" ||
                            conversationsListType == "closed"
                        ) {
                            payload["status"] = conversationsListType;
                        }
                        dispatch(onGetConversations(payload));
                    }
                }
            );
            echo.private(`message.${auth_user?.id}`).listen(
                ".App\\Events\\SentMessage",
                (e) => {
                    setIncomingMesasgeContactID(null);
                    if (e?.message?.traffic == "outgoing") {
                        //playAudio();
                        // e?.message?.contact_id &&
                        //     setIncomingMesasgeContactID(e?.message?.contact_id);
                        // let payload = {};
                        // if (
                        //     auth_user?.id &&
                        //     conversationsListAssignedTo == "mine"
                        // ) {
                        //     payload["assignedTo"] = auth_user?.id;
                        // }
                        // if (filter != null && filter != "") {
                        //     payload[
                        //         "parameter"
                        //     ] = `?search=${filter}&search_in=contact`;
                        // }
                        // if (
                        //     conversationsListType == "open" ||
                        //     conversationsListType == "closed"
                        // ) {
                        //     payload["status"] = conversationsListType;
                        // }
                        // dispatch(onGetConversations(payload));
                    }
                }
            );
        }

        //console.log("echo running: ", echo);
        //  Cleanup subscription when component unmounts
        return () => {
            if (echo) {
                echo.leaveChannel("chat");
            }
        };
    }, [echo, user]);

    useEffect(() => {
        if (
            incomingMesasgeContactID &&
            selectedContact?.id &&
            incomingMesasgeContactID == selectedContact?.id
        ) {
            dispatch(onGetContactConversationsApi(selectedContact?.id));
            setIncomingMesasgeContactID(null);
        }
        // console.log("incomingMesasgeContactID: ", incomingMesasgeContactID);
        // console.log("selectedContact?.id: ", selectedContact?.id);
    }, [incomingMesasgeContactID, selectedContact]);

    useEffect(() => {
        const auth_user = user || getLoggedinUser();
        if (auth_user) {
            dispatch(onGetChannels());
            dispatch(onGetTags());
            dispatch(onGetLifeCycles());
        } else {
            navigate("/login");
        }
    }, [user]);
    useEffect(() => {
        filter != null && searchUsers(customActiveTab);
    }, [filter]);

    useEffect(() => {
        contacts && setContactsCount(contacts?.meta?.total || 0);
    }, [contacts]);
    useEffect(() => {
        conversations && setConversatiosCount(conversations?.meta?.total || 0);
    }, [conversations]);

    //
    const toggleCustom = (tab) => {
        if (customActiveTab !== tab) {
            setcustomActiveTab(tab);
            setFilter("");
            //searchUsers(customActiveTab);
        }
    };

    const userChatOpen = useCallback(
        (contact) => {
            // /setSelectedContact(setContact(contact, countries));
            dispatch(onGetContactConversationsApi(contact.id));
            //checkIfContactHasUnreadMessages(conversations, contact.id) &&
            dispatch(onMarkConversationAsReadApi(contact.id));
            //
            // Reload conversations
            handleUpdateConversationsAndContactsOnUserChatPaneLoad();
            userChatShow.current.classList.add("user-chat-show");
            addContactShow.current.classList.remove("add-contact-form-show");
            settingsShow.current.classList.remove("settings-modal-show");
        },
        [conversations]
    );

    const backToUserChat = () => {
        //

        userChatShow.current.classList.remove("user-chat-show");
        addContactShow.current.classList.remove("add-contact-form-show");
        settingsShow.current.classList.remove("settings-modal-show");
        setSelectedContact(null);

        //handleUpdateConversationsAndContactsOnUserChatPaneLoad();
    };

    const handleUpdateConversationsAndContactsOnUserChatPaneLoad = () => {
        const auth_user = user || getLoggedinUser();
        let conversationsPayload = {};
        let contactsPayload = {};

        if (auth_user?.id && conversationsListAssignedTo == "mine") {
            conversationsPayload["assignedTo"] = auth_user?.id;
        }
        if (
            conversationsListType == "open" ||
            conversationsListType == "closed"
        ) {
            conversationsPayload["status"] = conversationsListType;
        }
        if (filter != null && filter != "") {
            conversationsPayload[
                "parameter"
            ] = `?search=${filter}&search_in=contact`;
            contactsPayload["search"] = filter;
        }
        if (customActiveTab == "conversations") {
            dispatch(onGetConversations(conversationsPayload));
        }
        if (customActiveTab == "contacts") {
            dispatch(onGetContacts(contactsPayload));
        }
    };

    //serach conversation or contacts user
    const searchUsers = (customActiveTab) => {
        var input, li, a, i, txtValue, userList, lis;

        const auth_user = user || getLoggedinUser();
        let payload = {};

        if (auth_user?.id && conversationsListAssignedTo == "mine") {
            payload["assignedTo"] = auth_user?.id;
        }

        if (customActiveTab == "conversations") {
            if (filter != null && filter != "") {
                payload["parameter"] = `?search=${filter}&search_in=contact`;
            }
            if (
                conversationsListType == "open" ||
                conversationsListType == "closed"
            ) {
                payload["status"] = conversationsListType;
            }
            dispatch(onGetConversations(payload));
        } else if (customActiveTab == "contacts") {
            filter != null && filter != ""
                ? dispatch(
                      onGetContacts({
                          search: filter,
                      })
                  )
                : dispatch(onGetContacts({}));
        }
    };

    const handleLogout = () => {
        //
        localStorage.removeItem("authUser");
        dispatch(onChangeUserState(null));
        dispatch(onLogout());

        // chrome.runtime.sendMessage({
        //     sendBack: true,
        //     data: { window_action: "logout" },
        // });

        navigate("/login");

        //postMessage("message");
    };

    const handleAddContactModal = () => {
        addContactShow.current.classList.add("add-contact-form-show");
        userChatShow.current.classList.remove("user-chat-show");
        settingsShow.current.classList.remove("settings-modal-show");
    };

    const handleSettingsModal = () => {
        settingsShow.current.classList.add("settings-modal-show");
        addContactShow.current.classList.remove("add-contact-form-show");
        userChatShow.current.classList.remove("user-chat-show");
    };

    const setContact = (contact, countries) => {
        const country = getCountry(countries, contact?.country_id);
        const temp = {
            id: contact.id,
            firstName: contact.firstName,
            lastName: contact.lastName,
            phone: contact.phone,
            email: contact.email,
            assignedTo: contact.assignedTo,
            tags: contact.tags,
            lifecycleId: contact.lifecycleId,
            language: contact.language,
            profilePicture: contact.profilePicture,
            lastInteractedChannel: contact.lastInteractedChannel,
            status: contact.status,
            statusChangedAt: contact.statusChangedAt,
            isBlocked: contact.isBlocked,
            flag: country?.iso2,
        };

        return contact && temp;
    };

    const handleWindowAction = (action) => {
        //top: 32px;
        //if (action == "close-window") dispatch(onLogout());
        action && dispatch(changeExtensionWindowStatusState(action));
        let fontSize = null;
        chrome.storage.local.get("font_size", function (result) {
            if (result.font_size) {
                chrome.runtime.sendMessage({
                    sendBack: true,
                    data: {
                        window_action: action,
                        font_size: result.font_size,
                    },
                });
            } else {
            }
        });
    };

    const getConversationsList = () => {
        const auth_user = user || getLoggedinUser();
        let payload = {};

        if (auth_user?.id && conversationsListAssignedTo == "mine") {
            payload["assignedTo"] = auth_user?.id;
        }

        if (customActiveTab == "conversations") {
            if (filter != null && filter != "") {
                payload["parameter"] = `?search=${filter}&search_in=contact`;
            }
            if (
                conversationsListType == "open" ||
                conversationsListType == "closed"
            ) {
                payload["status"] = conversationsListType;
            }
            dispatch(onGetConversations(payload));
        }
    };

    const getContactsList = () => {
        let payload = {};
        if (filter != null && filter != "") {
            payload["search"] = filter;
        }
        dispatch(onGetContacts(payload));
    };

    const checkIfContactHasUnreadMessages = (conversations, contactId) => {
        if (!isEmpty(conversations) && contactId) {
            const conversation = conversations?.data?.filter(
                (conversation) => conversation.contact?.id == contactId
            );

            if (conversation[0]?.unreadCount > 0) {
                return true;
            }
        }
        return false;
    };

    // useEffect(() => {
    //     console.log("selectedContact: ", selectedContact);
    // }, [selectedContact]);

    document.title = "Reactionz | Chrome Extension";

    return (
        <React.Fragment>
            <div
                className="page-content"
                id="page-content"
                style={{
                    // minWidth: "600px",
                    // minHeight: "588px",
                    marginTop: "20px",
                    paddingRight: "10px",
                }}
            >
                <Container fluid>
                    <div className="chat-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-1">
                        <div
                            className={classnames(
                                "extension-window-links-wrapper ps-3 pt-2 py-1 d-flex align-items-center ",
                                {
                                    "minimized-window":
                                        extensionWindowStatus &&
                                        extensionWindowStatus ==
                                            "minimize-window",
                                }
                            )}
                        >
                            {extensionWindowStatus &&
                                extensionWindowStatus == "minimize-window" && (
                                    <div className="extension-window-links-logo flex-grow-1">
                                        <div
                                            //to={"https://reactionz.io"}
                                            className="p-2"
                                            onClick={() => {
                                                handleWindowAction(
                                                    "maximize-window"
                                                );
                                            }}
                                        >
                                            <img
                                                src={reactionzMinimizedLogo}
                                                className="minimized-reactionz-logo"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                )}
                            {extensionWindowStatus &&
                                extensionWindowStatus != "minimize-window" && (
                                    <div className="flex-shrink-0 ">
                                        <div className="d-flex extension-window-links">
                                            <div
                                                className="extension-window-link minimize-window mx-1"
                                                onClick={() => {
                                                    handleWindowAction(
                                                        "minimize-window"
                                                    );
                                                }}
                                            >
                                                <i className="ri-subtract-line align-bottom"></i>
                                            </div>
                                            {/* <div
                                                className="extension-window-link maximize-window mx-1"
                                                onClick={() => {
                                                    handleWindowAction(
                                                        "maximize-window"
                                                    );
                                             
                                                }}
                                            >
                                                <i className="ri-file-copy-line align-bottom"></i>
                                            </div> */}
                                            <div
                                                className="extension-window-link close-window mx-1"
                                                onClick={() => {
                                                    handleWindowAction(
                                                        "close-window"
                                                    );
                                                }}
                                            >
                                                <i className="ri-close-line align-bottom"></i>
                                            </div>
                                        </div>
                                    </div>
                                )}
                        </div>

                        <div className="chat-leftsidebar ">
                            <div className="px-4 pt-3 mb-1 pe-2">
                                <div className="d-flex align-items-start mb-2">
                                    <div className="flex-grow-1">
                                        {/* <h5 className="mb-4">Chats</h5> */}
                                        <div className="site-logo">
                                            <Link
                                                to={"https://reactionz.io/"}
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
                                        }}
                                        id="search-user"
                                        type="text"
                                        className="form-control bg-light border-light"
                                        placeholder={t(
                                            `Search ${
                                                customActiveTab ==
                                                "conversations"
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
                                        style={{
                                            cursor: "pointer",
                                        }}
                                        className={classnames({
                                            active:
                                                customActiveTab ===
                                                "conversations",
                                        })}
                                        onClick={() => {
                                            toggleCustom("conversations");
                                            getConversationsList();
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
                                        style={{
                                            cursor: "pointer",
                                        }}
                                        className={classnames({
                                            active:
                                                customActiveTab === "contacts",
                                        })}
                                        onClick={() => {
                                            toggleCustom("contacts");
                                            getContactsList();
                                        }}
                                    >
                                        <div
                                            className="d-flex align-items-center "
                                            style={{
                                                justifyContent: "center",
                                            }}
                                        >
                                            <i className="ri-contacts-line me-2"></i>
                                            {t("Contacts")}{" "}
                                            {`(${contactsCount})`}
                                        </div>
                                    </NavLink>
                                </NavItem>
                            </Nav>

                            <TabContent
                                activeTab={customActiveTab}
                                className="text-muted"
                            >
                                <TabPane
                                    tabId="conversations"
                                    id="conversations-pane"
                                >
                                    <Conversations
                                        userChatOpen={userChatOpen}
                                        setSelectedContact={setSelectedContact}
                                        setContact={setContact}
                                        countries={countries}
                                        filter={filter}
                                        conversationsListType={
                                            conversationsListType
                                        }
                                        setConversationsListType={
                                            setConversationsListType
                                        }
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
                                        setContactForEditing={
                                            setContactForEditing
                                        }
                                        handleAddContactModal={
                                            handleAddContactModal
                                        }
                                    />
                                </TabPane>
                            </TabContent>
                        </div>

                        <ChatContent
                            userChatShow={userChatShow}
                            backToUserChat={backToUserChat}
                            selectedContact={selectedContact}
                            countries={countries}
                        />

                        <AddContact
                            addContactShow={addContactShow}
                            backToUserChat={backToUserChat}
                            countries={countries}
                            contactForEditing={contactForEditing}
                            setContactForEditing={setContactForEditing}
                        />

                        <SettingsModal
                            settingsShow={settingsShow}
                            backToUserChat={backToUserChat}
                            extensionWindowStatus={extensionWindowStatus}
                        />
                    </div>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Chat;
