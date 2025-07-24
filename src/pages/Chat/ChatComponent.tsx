import React, { useEffect, useState, useCallback, useRef } from "react";
import {
    Button,
    UncontrolledTooltip,
    Input,
    DropdownToggle,
    DropdownMenu,
    Dropdown,
    DropdownItem,
    Row,
    Col,
    Card,
    CardBody,
    UncontrolledDropdown,
    Label,
} from "reactstrap";

import { Link, useNavigate } from "react-router-dom";
import Picker from "emoji-picker-react";
import { isEmpty, map, sortBy } from "lodash";

import moment from "moment-timezone";
//Import Icons
import FeatherIcon from "feather-icons-react";
import classnames from "classnames";
//import PersonalInfo from "./PersonalInfo";

//import { messages, chatContactData } from "../../common/data";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
    getUsers as onGetUsersApi,
    sendTextMessage as onSendTextMessage,
    getContactConversations as onGetContactConversationsApi,
    assignAgentToContact as onAssignAgentToContactApi,
    changeIsContactUpdated as onChangeIsContactUpdatedApi,
    uploadFile as onUploadFile,
    changeFileState as onChangeFileState,
    getMessageSnippets as onGetMessageSnippetsApi,
    changeMessageSnippet as onChangeMessageSnippetApi,
    getUploadStatus as onGetUploadStatusApi,
    changeFileStatusState as changeFileStatusStateAction,
    uploadFile as onUploadFileApi,
    changeIsMessageSent as changeIsMessageSentState,
} from "../../slices/thunks";

import userDummayImage from "../../assets/images/users/user-dummy-img.jpg";

//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { createSelector } from "reselect";

import SendImageMessagePane from "./SendImageMessagePane";
import SendTemplateMessage from "./SendTemplateMessage";

import { setReactonzContentTypeHeader } from "../../helpers/api_helper";

import {
    getCountryFlag,
    getCountryByAreaCode,
    getPhoneNumberInfo,
    getComponentsContent,
    getMessageLinksPayload,
    getFileName,
    getPageLinksPayload,
    getFileNameFromCaption,
    captionToJson,
    getNameFromMessageWhenReplying,
    contactFields,
} from "./common_functions";
let _ = require("lodash-contrib");
import { useTranslation } from "react-i18next";

import DocViewer, {
    DocViewerRenderers,
    PDFRenderer,
    PNGRenderer,
} from "react-doc-viewer";
import ImageZoom from "js-image-zoom";
import "zoomist/css";
// import Zoomist
import Zoomist from "zoomist";
//import AudioRecorder from "./AudioRecorder";
//mport { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

import {
    blobToFile,
    changeAudioMimeType,
    fileToBlob,
    convertWebmToMp3,
} from "./common_functions";

import useAudioRecorder from "react-audio-recorder-hook";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

//
import ChatTopbar from "./ChatTopbar";
import ChatMessagePane from "./ChatMessagesPane";
import ChatInputsPane from "./ChatInputsPane";

import {
    logoutUser as onLogout,
    getContacts as onGetContacts,
    getConversations as onGetConversations,
    markConversationAsRead as onMarkConversationAsReadApi,
    //getCountries as onGetCountries,
    getTags as onGetTags,
    getLifeCycles as onGetLifeCycles,
    getChannels as onGetChannels,
    changeUserState as onChangeUserState,
    fireberryContactsSearchState,
    fireberryContactsSearch as onFireberryContactsSearch,
} from "../../slices/thunks";
import {
    getCountry,
    countries,
    getFireberryUUIDFromURL,
    setContact,
} from "./common_functions";
import useEcho from "../../helpers/useEcho";
import { validate as isValidUUID } from "uuid";
import notificationAudio from "../../assets/audio/whatsapp-message-for-iphone.mp3";
import { getLoggedinUser } from "../../helpers/api_helper";
//
const ChatComponent = (
    {
        //backToUserChat,
        //userChatShow,
        //selectedContact,
        //countries,
    }
) => {
    useEffect(() => {
        window.process = {
            ...window.process,
        };
    }, []);

    const { t } = useTranslation();

    moment().local(true);

    //const chatMessagesList = useRef<HTMLInputElement>();

    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    //getUserPermission();

    //

    const selectChatState = (state) => state;
    const chatProperties = createSelector(selectChatState, (state) => ({
        //
        file: state.File.file,
        fileStatus: state.File.fileStatus,
        isMessageSent: state.Message.isMessageSent,
        user: state.Login.user,
        fireberryContactsSearch: state.Contact.fireberryContactsSearch,
    }));
    // Inside your component
    const { file, fileStatus, isMessageSent, user, fireberryContactsSearch } =
        useSelector(chatProperties);

    const [textMessage, setTextMessage] = useState("");
    const [isAudioMessage, setIsAudioMessage] = useState(false);

    const [replyMessage, setReplyMessage] = useState<any>("");

    const [imagePicker, setImagePicker] = useState(false);

    const [selectedChannel, setSelectedChannel] = useState(null);
    const [selectedAgent, setSelectedAgent] = useState(null);

    const [canSendMessage, setCanSendMessage] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);

    const [isComment, setIsComment] = useState(false);

    const [zoomedImage, setZoomedImage] = useState(false);
    const [zoomedImageURL, setZoomedImageURL] = useState<any>(null);
    const [isSnippet, setIsSnippet] = useState(false);
    const [chatInputMoreItems, setChatInputMoreItems] = useState(false);

    const [resetAudioComponent, setResetAudioComponent] = useState(false);

    const [selectedContact, setSelectedContact] = useState(null);
    const [incomingMesasgeContactID, setIncomingMesasgeContactID] =
        useState(null);
    const [uuid, setuuid] = useState<any>(null);
    const echo = useEcho();

    const playAudio = () => {
        new Audio(notificationAudio).play();
    };

    // useEffect(() => {
    //     console.log("selectedContact: ", selectedContact);
    // }, [selectedContact]);

    chrome.runtime.onMessage.addListener(function (
        message,
        sender,
        sendResponse
    ) {
        if (message.tabChanged === true) {
            //console.log("url changed");
            const uuid = getFireberryUUIDFromURL(message?.url);
            isValidUUID(uuid) && setuuid(uuid);
        }
    });

    useEffect(() => {
        // setTimeout(() => {
        //     chrome.tabs.query({ active: true }, (tabs) => {
        //         const tab = tabs[0] || null;
        //         console.log("tab in fireberry frame: ", tab);
        //         const uuid = getFireberryUUIDFromURL(tab?.url);
        //         //
        //         isValidUUID(uuid) && setuuid(uuid);
        //     });
        // }, 1000);
        setTimeout(() => {
            chrome.tabs.query({ currentWindow: true }, (tabs) => {
                console.log("tabs in fireberry frame: ", tabs);
                tabs.forEach(function (tab) {
                    if (tab?.url && tab.url?.includes("app.fireberry.com")) {
                        console.log("tab in fireberry frame: ", tab);
                        const uuid = getFireberryUUIDFromURL(tab?.url);
                        //tab.url?.split("/")?.pop() || tab.url?.split("/")?.pop();
                        isValidUUID(uuid) && setuuid(uuid);
                    }
                });
            });
        }, 1000);
    }, []);
    //
    useEffect(() => {
        // /uuid && dispatch();
        console.log("uuid in fireberry frame: ", uuid);
        if (uuid) {
            dispatch(fireberryContactsSearchState(null));
            let val = uuid;
            const payload = {
                search: val,
            };
            dispatch(onFireberryContactsSearch(payload));
            setuuid(null);
        }
    }, [uuid]);

    useEffect(() => {
        console.log(
            "fireberryContactsSearch in fireberry frame: ",
            fireberryContactsSearch
        );
        if (fireberryContactsSearch?.data[0]) {
            const contact = fireberryContactsSearch?.data[0];
            contact && setSelectedContact(setContact(contact, countries));
            //contact && dispatch(fireberryContactsSearchState(null));
            //userChatOpen(contact);
            dispatch(onGetContactConversationsApi(contact.id));
            //checkIfContactHasUnreadMessages(conversations, contact.id) &&
            dispatch(onMarkConversationAsReadApi(contact.id));
        }
    }, [fireberryContactsSearch]);

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
            // dispatch(onGetTags());
            // dispatch(onGetLifeCycles());
        } else {
            //navigate("/login");
        }
    }, [user]);

    useEffect(() => {
        if (isComment && isMessageSent && selectedContact?.id) {
            dispatch(onGetContactConversationsApi(selectedContact?.id));
            setIsComment(false);
            dispatch(changeIsMessageSentState(false));
        }
    }, [isMessageSent, selectedContact]);

    //Search Message
    const searchMessages = () => {
        var searchInput,
            searchFilter,
            searchUL,
            searchLI,
            a,
            txtValue,
            paragraphs;
        searchInput = document.getElementById("searchMessage");
        searchFilter = searchInput.value.toUpperCase();
        searchUL = document.getElementById("users-conversation");
        searchLI = searchUL.getElementsByTagName("li");
        Array.prototype.forEach.call(searchLI, function (search) {
            paragraphs = search.getElementsByTagName("p");
            let found = false;
            Array.prototype.forEach.call(paragraphs, function (paragraph) {
                txtValue =
                    paragraph.textContent || a.innerText
                        ? paragraph.textContent || paragraph.innerText
                        : "";
                if (txtValue.toUpperCase().indexOf(searchFilter) > -1) {
                    found = true;
                }
            });
            if (found) {
                search.style.display = "";
            } else {
                search.style.display = "none";
            }
        });
    };

    const handleSendTextMessage = () => {
        if (!isEmpty(selectedChannel) && !isEmpty(selectedContact)) {
            dispatch(changeIsMessageSentState(false));
            if (!imagePicker) {
                if (!isEmpty(textMessage?.trim())) {
                    let payload: any;
                    if (replyMessage != "" && replyMessage.fb_message_id) {
                        // is reply message
                        payload = {
                            contactId: selectedContact.id,
                            channelId: selectedChannel.id,
                            message: {
                                context: {
                                    message_id: replyMessage.fb_message_id,
                                },
                                type: isComment ? "comment" : "text",
                                text: textMessage,
                            },
                        };
                    } else {
                        // is simple message
                        payload = {
                            contactId: selectedContact.id,
                            channelId: selectedChannel.id,
                            message: {
                                type: isComment ? "comment" : "text",
                                text: textMessage,
                            },
                        };
                    }

                    dispatch(onSendTextMessage(payload));

                    //cleanup data
                    setTextMessage("");

                    setIsSnippet(false);
                    setReplyMessage("");
                }
            } else {
                if (selectedFile) {
                    dispatch(onChangeFileState(null));
                    // reset content type to multipart/form-data
                    setReactonzContentTypeHeader("form");
                    // create and set the form data
                    const formData = new FormData();
                    formData.append("file", selectedFile);
                    // upload the file
                    dispatch(onUploadFile(formData));
                    // reset content type to json
                    setReactonzContentTypeHeader();
                    //cleanup data
                    setImagePicker(false);
                }
            }
        }
    };

    const handleResetChatContent = () => {
        // setTextMessage("");
        // setSelectedAgent(null);
        // setSelectedChannel(null);
        // setCanSendMessage(false);
        // setIsComment(false);
        // setChatInputMoreItems(false);
        // setResetAudioComponent(true);
        //backToUserChat();
    };

    useEffect(() => {
        console.log("selectedContact in fireberry frame: ", selectedContact);
    }, [selectedContact]);

    return (
        <React.Fragment>
            <div
                className="user-chat w-100 user-chat-show reactionz-extension-chat-content-frame" //overflow-hidden
                //ref={userChatShow}
                // style={{
                //     background: `url(${defaultImage})`,
                //     backgroundPosition: "center",
                //     backgroundSize: "contain",
                //     backgroundRepeat: "no-repeat",
                // }}
            >
                <div
                    className="chat-content d-flex"
                    style={{ marginTop: "12px" }}
                >
                    {/* <SimpleRecordButton /> */}
                    {!zoomedImage && (
                        <div className="w-100 overflow-hidden ">
                            <div className="position-relative">
                                <ChatTopbar
                                    selectedContact={selectedContact}
                                    countries={countries}
                                    handleResetChatContent={
                                        handleResetChatContent
                                    }
                                    searchMessages={searchMessages}
                                    selectedChannel={selectedChannel}
                                    setSelectedChannel={setSelectedChannel}
                                    selectedAgent={selectedAgent}
                                    setSelectedAgent={setSelectedAgent}
                                    showHideChatComponent={true}
                                />

                                <ChatMessagePane
                                    selectedContact={selectedContact}
                                    setTextMessage={setTextMessage}
                                    setReplyMessage={setReplyMessage}
                                    setCanSendMessage={setCanSendMessage}
                                    setZoomedImageURL={setZoomedImageURL}
                                    zoomedImage={zoomedImage}
                                    setZoomedImage={setZoomedImage}
                                    handleSendTextMessage={
                                        handleSendTextMessage
                                    }
                                />
                                <ChatInputsPane
                                    resetAudioComponent={resetAudioComponent}
                                    setIsAudioMessage={setIsAudioMessage}
                                    selectedChannel={selectedChannel}
                                    selectedContact={selectedContact}
                                    imagePicker={imagePicker}
                                    setImagePicker={setImagePicker}
                                    setZoomedImage={setZoomedImage}
                                    setZoomedImageURL={setZoomedImageURL}
                                    canSendMessage={canSendMessage}
                                    selectedFile={selectedFile}
                                    setSelectedFile={setSelectedFile}
                                    isSnippet={isSnippet}
                                    setIsSnippet={setIsSnippet}
                                    textMessage={textMessage}
                                    setTextMessage={setTextMessage}
                                    isComment={isComment}
                                    setIsComment={setIsComment}
                                    chatInputMoreItems={chatInputMoreItems}
                                    setReplyMessage={setReplyMessage}
                                    replyMessage={replyMessage}
                                    setChatInputMoreItems={
                                        setChatInputMoreItems
                                    }
                                    handleSendTextMessage={
                                        handleSendTextMessage
                                    }
                                />
                            </div>
                        </div>
                    )}
                    {zoomedImage && (
                        <div
                            className="zoomed-image-container"
                            style={{ marginTop: "-54px", width: "100%" }}
                        >
                            <div
                                className="d-flex close-button mb-2 mx-2"
                                style={{ justifyContent: "end" }}
                            >
                                <Button
                                    className="btn  btn-soft-danger btn-sm shadow-none"
                                    onClick={() => {
                                        setZoomedImage(!zoomedImage);
                                        setZoomedImageURL(null);
                                    }}
                                >
                                    <i className="ri-close-line align-bottom"></i>
                                </Button>
                            </div>
                            <div
                                className="zoomist-container"
                                id="img-container"
                            >
                                <div className="zoomist-wrapper">
                                    <div className="zoomist-image">
                                        <img src={zoomedImageURL} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};

export default ChatComponent;
