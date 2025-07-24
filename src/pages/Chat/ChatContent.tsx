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

//
const ChatContent = ({
    backToUserChat,
    userChatShow,
    selectedContact,
    countries,
}) => {
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
    }));
    // Inside your component
    const { file, fileStatus, isMessageSent } = useSelector(chatProperties);

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
        setTextMessage("");
        setSelectedAgent(null);
        setSelectedChannel(null);
        setCanSendMessage(false);
        setIsComment(false);
        setChatInputMoreItems(false);
        setResetAudioComponent(true);
        backToUserChat();
    };

    return (
        <React.Fragment>
            <div
                className="user-chat w-100 " //overflow-hidden
                ref={userChatShow}
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
                                    showHideChatComponent={false}
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

export default ChatContent;
