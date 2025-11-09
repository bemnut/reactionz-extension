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
    handleMessageTimeMeta,
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

import { isJsonString } from "./common_functions";

import useAudioRecorder from "react-audio-recorder-hook";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

//
import ChatTopbar from "./ChatTopbar";
const ChatMessagePane = ({
    selectedContact,
    handleSendTextMessage,
    setTextMessage,
    setReplyMessage,
    setCanSendMessage,
    setZoomedImageURL,
    zoomedImage,
    setZoomedImage,
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
        messages: state.Message.messages,
        language: state.Layout.language,
    }));
    // Inside your component
    const { messages, language } = useSelector(chatProperties);

    const [sortedMessages, setSortedMessages] = useState([]);
    const [messageBox, setMessageBox] = useState(null);
    const [previous, setPrevious] = useState(false);

    // sort the messages by date
    useEffect(() => {
        if (!isEmpty(messages?.data)) {
            // const emoj_msg = messages?.data?.filter(
            //     (msg) =>
            //         msg?.message?.type == "reaction" &&
            //         msg?.message?.data?.emoji
            // );

            // const messages_list = messages?.data?.filter(
            //     (msg) => msg?.message?.type != "reaction"
            // );

            // let new_messages_list = [];
            // messages_list?.map((msg) => {
            //     let new_msg = {};
            //     let found = false;
            //     emoj_msg?.map((emo_msg) => {
            //         //const em = JSON.parse(emo_msg?.message?.text);

            //         if (
            //             msg.fb_message_id == emo_msg?.message?.data?.message_id
            //         ) {
            //             found = true;
            //             new_msg = {
            //                 id: msg.id,
            //                 contact_id: msg.contact_id,
            //                 channel_id: msg.channel_id,
            //                 fb_message_id: msg.fb_message_id,
            //                 message: msg.message,
            //                 reply_to_message: msg.reply_to_message,
            //                 sender: msg.sender,
            //                 status: msg.status,
            //                 traffic: msg.traffic,
            //                 reactions: emo_msg?.message?.data?.emoji,
            //             };
            //         }
            //     });
            //     found
            //         ? new_messages_list.push(new_msg)
            //         : new_messages_list.push(msg);
            //     //new_messages_list.push(new_msg);
            // });

            //setSortedMessages(sortBy(new_messages_list, "status.timestamp"));
            setSortedMessages(sortBy(messages?.data, "status.timestamp"));
        } else {
            setSortedMessages([]);
        }
    }, [messages]);

    //

    const scrollToBottom = useCallback(() => {
        if (messageBox || !zoomedImage) {
            //messageBox.scrollTop = messageBox.scrollHeight + 1000;
            //console.log("messageBox?.current: ", messageBox?.current);

            // c
            // messageBox?.scrollIntoView({
            //     behavior: "smooth",
            //     block: "end",
            //     //inline: "nearest",
            // });
            setTimeout(() => {
                messageBox.scrollTop = messageBox.scrollHeight - 3;
            }, 1000);
        }
    }, [messageBox, zoomedImage]);

    useEffect(() => {
        if (!isEmpty(sortedMessages)) scrollToBottom();
    }, [sortedMessages]);

    // useEffect(() => {
    //     console.log("sortedMessages: ", sortedMessages);
    // }, [sortedMessages]);

    // useEffect(() => {
    //     if (!zoomedImage) {
    //         const container = document.getElementById(
    //             "chat-conversation-content"
    //         );
    //         if (container) {
    //             setTimeout(() => {
    //                 container.scrollTop = container.scrollHeight - 3;
    //                 container.scrollIntoView({
    //                     behavior: "smooth",
    //                     block: "end",
    //                     inline: "nearest",
    //                 });
    //             }, 1000);
    //         }
    //     }
    // }, [zoomedImage]);

    useEffect(() => {
        if (!isEmpty(sortedMessages)) {
            const incomingMsg = sortedMessages?.filter(
                (msg) => msg?.traffic == "incoming"
            );
            if (!isEmpty(incomingMsg)) {
                const lastElement = incomingMsg[incomingMsg.length - 1];
                //console.log("last incoming message: ", lastElement);
                let hours = moment().diff(
                    moment.unix(lastElement?.status?.timestamp).local(),
                    "hours"
                );
                //console.log("hours: ", hours);

                if (hours < 24) {
                    setCanSendMessage(true);
                }
            }

            //
        }
    }, [sortedMessages]);

    useEffect(() => {
        if (zoomedImage) {
            const img = document.getElementById("img-container");

            if (img) {
                new Zoomist("#img-container", {
                    // Optional parameters
                    maxScale: 4,
                    bounds: true,
                    // if you need slider
                    slider: true,
                    // if you need zoomer
                    zoomer: true,
                });
            }
        }
    }, [zoomedImage]);

    // useEffect(() => {
    //     console.log(
    //         "isjson??? : ",
    //         isJsonString({
    //             error: "Unsupported message type Type = unsupported",
    //             raw_data: {
    //                 from: "972586244119",
    //                 id: "wamid.HBgMOTcyNTg2MjQ0MTE5FQIAEhgSQjk5MTE2QTk0N0EwQ0Y2QjNGAA==",
    //                 timestamp: "1757572069",
    //                 errors: [
    //                     {
    //                         code: 131051,
    //                         title: "Message type unknown",
    //                         message: "Message type unknown",
    //                         error_data: {
    //                             details:
    //                                 "Message type is currently not supported.",
    //                         },
    //                     },
    //                 ],
    //                 type: "unsupported",
    //             },
    //         })
    //     );
    // }, []);

    return (
        <React.Fragment>
            <div
                className="position-relative "
                id="users-chat"
                //style={{ overflow: "auto" }}
            >
                <div
                    className="chat-conversation-wrapper  pb-0"
                    id="chat-conversation-wrapper"
                >
                    <PerfectScrollbar
                        containerRef={(ref) => setMessageBox(ref)}
                        onYReachStart={(container) => {
                            // console.log("onYReachStart");
                            // console.log("container: ", container);
                            //setPrevious(true);
                        }}
                        // onYReachEnd={(container) =>
                        //     //console.log("onYReachEnd")
                        // }
                        id="chat-conversation"
                        className="chat-conversation scrollable py-2 "
                    >
                        <div id="elmLoader"></div>
                        {messages?.links?.next && (
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
                                            dispatch(
                                                onGetContactConversationsApi(
                                                    `${
                                                        selectedContact.id
                                                    }${getMessageLinksPayload(
                                                        messages?.links?.next
                                                    )}`
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
                                    {t("Previous messages")}
                                </UncontrolledTooltip>
                            </>
                        )}
                        <ul
                            className="list-unstyled chat-conversation-list"
                            id="users-conversation"
                        >
                            {sortedMessages &&
                                sortedMessages?.map((message, key) => (
                                    <li
                                        className={
                                            message.traffic == "incoming"
                                                ? " chat-list left"
                                                : "chat-list right"
                                        }
                                        key={key}
                                    >
                                        <div className="conversation-list">
                                            {message.traffic == "incoming" ? (
                                                <div className="chat-avatar mx-2">
                                                    {isEmpty(
                                                        selectedContact?.profilePicture
                                                    ) ? (
                                                        <img
                                                            src={
                                                                userDummayImage
                                                            }
                                                            alt=""
                                                        />
                                                    ) : (
                                                        <img
                                                            src={
                                                                selectedContact?.profilePicture
                                                            }
                                                            alt=""
                                                        />
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="chat-avatar mx-2">
                                                    {message?.sender?.avatar ? (
                                                        <img
                                                            src={
                                                                message?.sender
                                                                    ?.avatar
                                                            }
                                                            alt={
                                                                message?.sender
                                                                    ?.avatar
                                                            }
                                                            title={
                                                                message?.sender
                                                                    ?.name
                                                            }
                                                        />
                                                    ) : (
                                                        <img
                                                            src={
                                                                userDummayImage
                                                            }
                                                            alt={
                                                                message?.sender
                                                                    ?.name
                                                            }
                                                            title={`${message?.sender?.name}, ${message?.sender?.email}`}
                                                        />
                                                    )}
                                                    <p
                                                        className="text-muted small line-clamp-1"
                                                        style={{
                                                            maxWidth: "50px",
                                                        }}
                                                    >
                                                        {message?.sender?.name}
                                                    </p>
                                                </div>
                                            )}

                                            <div className="user-chat-content">
                                                <div className="ctext-wrap">
                                                    {message?.message?.type ==
                                                        "attachment" && (
                                                        <>
                                                            {message?.message
                                                                ?.attachment
                                                                ?.type ==
                                                                "image" && (
                                                                <div className="ctext-wrap-content message-image">
                                                                    {message
                                                                        ?.reply_to_message
                                                                        ?.id && (
                                                                        <div className="replymessage-block mb-0">
                                                                            {message
                                                                                ?.reply_to_message
                                                                                ?.message && (
                                                                                <>
                                                                                    <div
                                                                                        className="name mb-1 "
                                                                                        style={{
                                                                                            fontWeight:
                                                                                                "500",
                                                                                        }}
                                                                                    >
                                                                                        {getNameFromMessageWhenReplying(
                                                                                            message,
                                                                                            selectedContact
                                                                                        )}
                                                                                    </div>
                                                                                    <p
                                                                                        className="mb-0 line-clamp-3"
                                                                                        style={{
                                                                                            maxHeight:
                                                                                                "60px",
                                                                                            overflow:
                                                                                                "hidden",
                                                                                            whiteSpace:
                                                                                                "pre-wrap",
                                                                                        }}
                                                                                    >
                                                                                        {message
                                                                                            ?.reply_to_message
                                                                                            ?.message
                                                                                            ?.type ==
                                                                                            "text" && (
                                                                                            <>
                                                                                                {
                                                                                                    message
                                                                                                        ?.reply_to_message
                                                                                                        ?.message
                                                                                                        ?.text
                                                                                                }
                                                                                            </>
                                                                                        )}
                                                                                    </p>
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                    <p
                                                                        className="mb-0 ctext-content px-3 py-2"
                                                                        style={{
                                                                            whiteSpace:
                                                                                "pre-wrap",
                                                                        }}
                                                                    >
                                                                        <img
                                                                            onClick={() => {
                                                                                setZoomedImage(
                                                                                    true
                                                                                );
                                                                                setZoomedImageURL(
                                                                                    message
                                                                                        .message
                                                                                        .attachment
                                                                                        .url
                                                                                );
                                                                            }}
                                                                            src={
                                                                                message
                                                                                    .message
                                                                                    .attachment
                                                                                    .url
                                                                            }
                                                                            alt=""
                                                                            style={{
                                                                                maxWidth:
                                                                                    "168px",
                                                                                objectFit:
                                                                                    "contain",
                                                                            }}
                                                                        />

                                                                        {message
                                                                            ?.message
                                                                            ?.attachment
                                                                            ?.caption && (
                                                                            <p className="p-2 pb-0">
                                                                                {
                                                                                    message
                                                                                        ?.message
                                                                                        ?.attachment
                                                                                        ?.caption
                                                                                }
                                                                            </p>
                                                                        )}
                                                                    </p>
                                                                    {message?.reactions && (
                                                                        <div className="message-reaction">
                                                                            {message?.reactions?.map(
                                                                                (
                                                                                    reaction
                                                                                ) => (
                                                                                    <span>
                                                                                        {
                                                                                            reaction?.emoji
                                                                                        }
                                                                                    </span>
                                                                                )
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}

                                                            {message?.message
                                                                ?.attachment
                                                                ?.type ==
                                                                "video" && (
                                                                <div className="ctext-wrap-content message-image">
                                                                    {message
                                                                        ?.reply_to_message
                                                                        ?.id && (
                                                                        <div className="replymessage-block mb-0">
                                                                            {message
                                                                                ?.reply_to_message
                                                                                ?.message && (
                                                                                <>
                                                                                    <div
                                                                                        className="name mb-1 "
                                                                                        style={{
                                                                                            fontWeight:
                                                                                                "500",
                                                                                        }}
                                                                                    >
                                                                                        {getNameFromMessageWhenReplying(
                                                                                            message,
                                                                                            selectedContact
                                                                                        )}
                                                                                    </div>
                                                                                    <p
                                                                                        className="mb-0 line-clamp-3"
                                                                                        style={{
                                                                                            maxHeight:
                                                                                                "60px",
                                                                                            overflow:
                                                                                                "hidden",
                                                                                            whiteSpace:
                                                                                                "pre-wrap",
                                                                                        }}
                                                                                    >
                                                                                        {message
                                                                                            ?.reply_to_message
                                                                                            ?.message
                                                                                            ?.type ==
                                                                                            "text" && (
                                                                                            <>
                                                                                                {
                                                                                                    message
                                                                                                        ?.reply_to_message
                                                                                                        ?.message
                                                                                                        ?.text
                                                                                                }
                                                                                            </>
                                                                                        )}
                                                                                    </p>
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                    <p className="mb-0 ctext-content ">
                                                                        <video
                                                                            style={{
                                                                                maxWidth:
                                                                                    "200px",
                                                                            }}
                                                                            //autoplay
                                                                            //muted
                                                                            controls
                                                                            // type={`video/${getExtension(
                                                                            //     message
                                                                            //         .message
                                                                            //         .attachment
                                                                            //         .url
                                                                            // ).toLowerCase()}`}
                                                                            src={
                                                                                message
                                                                                    .message
                                                                                    .attachment
                                                                                    .url
                                                                            }
                                                                        >
                                                                            {t(
                                                                                "Your browser does not support the video tag."
                                                                            )}
                                                                        </video>
                                                                        {message
                                                                            ?.message
                                                                            ?.attachment
                                                                            ?.caption && (
                                                                            <p className="p-2 pb-0">
                                                                                {
                                                                                    message
                                                                                        ?.message
                                                                                        ?.attachment
                                                                                        ?.caption
                                                                                }
                                                                            </p>
                                                                        )}
                                                                    </p>
                                                                    {message?.reactions && (
                                                                        <div className="message-reaction">
                                                                            {message?.reactions?.map(
                                                                                (
                                                                                    reaction
                                                                                ) => (
                                                                                    <span>
                                                                                        {
                                                                                            reaction?.emoji
                                                                                        }
                                                                                    </span>
                                                                                )
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}

                                                            {message?.message
                                                                ?.attachment
                                                                ?.type ==
                                                                "audio" && (
                                                                <div className="ctext-wrap-content message-image">
                                                                    {message
                                                                        ?.reply_to_message
                                                                        ?.id && (
                                                                        <div className="replymessage-block mb-0">
                                                                            {message
                                                                                ?.reply_to_message
                                                                                ?.message && (
                                                                                <>
                                                                                    <div
                                                                                        className="name mb-1 "
                                                                                        style={{
                                                                                            fontWeight:
                                                                                                "500",
                                                                                        }}
                                                                                    >
                                                                                        {getNameFromMessageWhenReplying(
                                                                                            message,
                                                                                            selectedContact
                                                                                        )}
                                                                                    </div>
                                                                                    <p
                                                                                        className="mb-0 line-clamp-3"
                                                                                        style={{
                                                                                            maxHeight:
                                                                                                "60px",
                                                                                            overflow:
                                                                                                "hidden",
                                                                                            whiteSpace:
                                                                                                "pre-wrap",
                                                                                        }}
                                                                                    >
                                                                                        {message
                                                                                            ?.reply_to_message
                                                                                            ?.message
                                                                                            ?.type ==
                                                                                            "text" && (
                                                                                            <>
                                                                                                {
                                                                                                    message
                                                                                                        ?.reply_to_message
                                                                                                        ?.message
                                                                                                        ?.text
                                                                                                }
                                                                                            </>
                                                                                        )}
                                                                                    </p>
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                    <p className="mb-0 ctext-content ">
                                                                        <audio
                                                                            style={{
                                                                                maxWidth:
                                                                                    "200px",
                                                                            }}
                                                                            autoPlay={
                                                                                false
                                                                            }
                                                                            //muted
                                                                            controls
                                                                            // type={`video/${getExtension(
                                                                            //     message
                                                                            //         .message
                                                                            //         .attachment
                                                                            //         .url
                                                                            // ).toLowerCase()}`}
                                                                            src={
                                                                                message
                                                                                    .message
                                                                                    .attachment
                                                                                    .url
                                                                            }
                                                                        >
                                                                            {t(
                                                                                "Your browser does not support the audio tag."
                                                                            )}
                                                                        </audio>
                                                                        {message
                                                                            ?.message
                                                                            ?.attachment
                                                                            ?.caption && (
                                                                            <p className="p-2 pb-0">
                                                                                {
                                                                                    message
                                                                                        ?.message
                                                                                        ?.attachment
                                                                                        ?.caption
                                                                                }
                                                                            </p>
                                                                        )}
                                                                    </p>
                                                                    {message?.reactions && (
                                                                        <div className="message-reaction">
                                                                            {message?.reactions?.map(
                                                                                (
                                                                                    reaction
                                                                                ) => (
                                                                                    <span>
                                                                                        {
                                                                                            reaction?.emoji
                                                                                        }
                                                                                    </span>
                                                                                )
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}

                                                            {/* {[
                                                                                    "pdf",
                                                                                ].includes(
                                                                                    getExtension(
                                                                                        message
                                                                                            .message
                                                                                            .attachment
                                                                                            .url
                                                                                    ).toLowerCase()
                                                                                ) && (
                                                                                    <div className="ctext-wrap-content message-image">
                                                                                        <p className="mb-0 ctext-content ">
                                                                                            <PDFViewer
                                                                                                document={{
                                                                                                    url: message
                                                                                                        .message
                                                                                                        .attachment
                                                                                                        .url,
                                                                                                }}
                                                                                            />
                                                                                        </p>
                                                                                    </div>
                                                                                )} */}

                                                            {message?.message
                                                                ?.attachment
                                                                ?.type ==
                                                                "document" && (
                                                                <div className="ctext-wrap-content message-image">
                                                                    {message
                                                                        ?.reply_to_message
                                                                        ?.id && (
                                                                        <div className="replymessage-block mb-0">
                                                                            {message
                                                                                ?.reply_to_message
                                                                                ?.message && (
                                                                                <>
                                                                                    <div
                                                                                        className="name mb-1 "
                                                                                        style={{
                                                                                            fontWeight:
                                                                                                "500",
                                                                                        }}
                                                                                    >
                                                                                        {getNameFromMessageWhenReplying(
                                                                                            message,
                                                                                            selectedContact
                                                                                        )}
                                                                                    </div>
                                                                                    <p
                                                                                        className="mb-0 line-clamp-3"
                                                                                        style={{
                                                                                            maxHeight:
                                                                                                "60px",
                                                                                            overflow:
                                                                                                "hidden",
                                                                                            whiteSpace:
                                                                                                "pre-wrap",
                                                                                        }}
                                                                                    >
                                                                                        {message
                                                                                            ?.reply_to_message
                                                                                            ?.message
                                                                                            ?.type ==
                                                                                            "text" && (
                                                                                            <>
                                                                                                {
                                                                                                    message
                                                                                                        ?.reply_to_message
                                                                                                        ?.message
                                                                                                        ?.text
                                                                                                }
                                                                                            </>
                                                                                        )}
                                                                                    </p>
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                    <p
                                                                        className="mb-0 ctext-content px-3 py-2"
                                                                        style={{
                                                                            whiteSpace:
                                                                                "pre-wrap",
                                                                        }}
                                                                    >
                                                                        {/* <DocViewer
                                                                                                pluginRenderers={
                                                                                                    DocViewerRenderers
                                                                                                }
                                                                                                documents={[
                                                                                                    {
                                                                                                        uri: URL.createObjectURL(
                                                                                                            new Blob(
                                                                                                                [
                                                                                                                    message
                                                                                                                        ?.message
                                                                                                                        ?.attachment
                                                                                                                        ?.url,
                                                                                                                ],
                                                                                                                {
                                                                                                                    //type: "application/pdf",
                                                                                                                }
                                                                                                            )
                                                                                                        ),
                                                                                                    },
                                                                                                ]}
                                                                                            /> */}
                                                                        <Link
                                                                            to={
                                                                                message
                                                                                    ?.message
                                                                                    ?.attachment
                                                                                    ?.url
                                                                            }
                                                                            download
                                                                        >
                                                                            {captionToJson(
                                                                                message
                                                                                    ?.message
                                                                                    ?.attachment
                                                                                    ?.caption
                                                                            )
                                                                                ?.filename
                                                                                ? captionToJson(
                                                                                      message
                                                                                          ?.message
                                                                                          ?.attachment
                                                                                          ?.caption
                                                                                  )
                                                                                      ?.filename
                                                                                : getFileName(
                                                                                      message
                                                                                          ?.message
                                                                                          ?.attachment
                                                                                          ?.url
                                                                                  )}
                                                                        </Link>
                                                                        {captionToJson(
                                                                            message
                                                                                ?.message
                                                                                ?.attachment
                                                                                ?.caption
                                                                        )
                                                                            ?.caption ? (
                                                                            <p className="p-2 pb-0">
                                                                                {
                                                                                    captionToJson(
                                                                                        message
                                                                                            ?.message
                                                                                            ?.attachment
                                                                                            ?.caption
                                                                                    )
                                                                                        ?.caption
                                                                                }
                                                                            </p>
                                                                        ) : (
                                                                            message
                                                                                ?.message
                                                                                ?.attachment
                                                                                ?.caption !=
                                                                                "" &&
                                                                            !_.isJSON(
                                                                                message
                                                                                    ?.message
                                                                                    ?.attachment
                                                                                    ?.caption
                                                                            ) && (
                                                                                <p className="p-2 pb-0">
                                                                                    {
                                                                                        message
                                                                                            ?.message
                                                                                            ?.attachment
                                                                                            ?.caption
                                                                                    }
                                                                                </p>
                                                                            )
                                                                        )}
                                                                    </p>
                                                                    {message?.reactions && (
                                                                        <div className="message-reaction">
                                                                            {message?.reactions?.map(
                                                                                (
                                                                                    reaction
                                                                                ) => (
                                                                                    <span>
                                                                                        {
                                                                                            reaction?.emoji
                                                                                        }
                                                                                    </span>
                                                                                )
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </>
                                                    )}

                                                    {message?.message?.type ==
                                                        "comment" && (
                                                        <div className="ctext-wrap-content comment">
                                                            {message.message
                                                                .text && (
                                                                <>
                                                                    <p
                                                                        className="mb-0 ctext-content px-3 py-2"
                                                                        style={{
                                                                            whiteSpace:
                                                                                "pre-wrap",
                                                                        }}
                                                                    >
                                                                        {
                                                                            message
                                                                                .message
                                                                                .text
                                                                        }
                                                                    </p>
                                                                </>
                                                            )}
                                                            {message?.reactions && (
                                                                <div className="message-reaction">
                                                                    {message?.reactions?.map(
                                                                        (
                                                                            reaction
                                                                        ) => (
                                                                            <span>
                                                                                {
                                                                                    reaction?.emoji
                                                                                }
                                                                            </span>
                                                                        )
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                    {message?.message?.type ==
                                                        "text" && (
                                                        <div
                                                            className={classnames(
                                                                "ctext-wrap-content ",
                                                                {
                                                                    " error-message":
                                                                        isJsonString(
                                                                            message
                                                                                ?.message
                                                                                ?.text
                                                                        )
                                                                            ? JSON.parse(
                                                                                  message
                                                                                      ?.message
                                                                                      ?.text
                                                                              )
                                                                                  ?.raw_data
                                                                                  ?.errors?.[0]
                                                                                  ?.error_data
                                                                                  ?.details
                                                                            : false,
                                                                }
                                                            )}
                                                        >
                                                            {message
                                                                ?.reply_to_message
                                                                ?.id && (
                                                                <div className="replymessage-block mb-0">
                                                                    {message
                                                                        ?.reply_to_message
                                                                        ?.message && (
                                                                        <>
                                                                            <div
                                                                                className="name mb-1 "
                                                                                style={{
                                                                                    fontWeight:
                                                                                        "500",
                                                                                }}
                                                                            >
                                                                                {getNameFromMessageWhenReplying(
                                                                                    message,
                                                                                    selectedContact
                                                                                )}
                                                                            </div>
                                                                            <p
                                                                                className="mb-0 line-clamp-3"
                                                                                style={{
                                                                                    maxHeight:
                                                                                        "60px",
                                                                                    overflow:
                                                                                        "hidden",
                                                                                    whiteSpace:
                                                                                        "pre-wrap",
                                                                                }}
                                                                            >
                                                                                {message
                                                                                    ?.reply_to_message
                                                                                    ?.message
                                                                                    ?.type ==
                                                                                    "text" && (
                                                                                    <>
                                                                                        {
                                                                                            message
                                                                                                ?.reply_to_message
                                                                                                ?.message
                                                                                                ?.text
                                                                                        }
                                                                                    </>
                                                                                )}
                                                                            </p>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            )}
                                                            {message?.message
                                                                ?.text && (
                                                                <p
                                                                    className="mb-0 ctext-content px-3 py-2"
                                                                    style={{
                                                                        whiteSpace:
                                                                            "pre-wrap",
                                                                    }}
                                                                >
                                                                    {isJsonString(
                                                                        message
                                                                            ?.message
                                                                            ?.text
                                                                    )
                                                                        ? JSON.parse(
                                                                              message
                                                                                  ?.message
                                                                                  ?.text
                                                                          )
                                                                              ?.raw_data
                                                                              ?.errors?.[0]
                                                                              ?.error_data
                                                                              ?.details
                                                                            ? JSON.parse(
                                                                                  message
                                                                                      ?.message
                                                                                      ?.text
                                                                              )
                                                                                  ?.raw_data
                                                                                  ?.errors?.[0]
                                                                                  ?.error_data
                                                                                  ?.details
                                                                            : message
                                                                                  ?.message
                                                                                  ?.text
                                                                        : message
                                                                              ?.message
                                                                              ?.text}
                                                                </p>
                                                            )}
                                                            {message?.reactions && (
                                                                <div className="message-reaction">
                                                                    {message?.reactions?.map(
                                                                        (
                                                                            reaction
                                                                        ) => (
                                                                            <span>
                                                                                {
                                                                                    reaction?.emoji
                                                                                }
                                                                            </span>
                                                                        )
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                    {message?.message?.type ==
                                                        "button" && (
                                                        <div className="ctext-wrap-content ">
                                                            {message.message
                                                                .text && (
                                                                <p
                                                                    className="mb-0 ctext-content px-3 py-2"
                                                                    style={{
                                                                        whiteSpace:
                                                                            "pre-wrap",
                                                                    }}
                                                                >
                                                                    {
                                                                        message
                                                                            .message
                                                                            .text
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                    )}
                                                    {message?.message?.type ==
                                                        "log" && (
                                                        <div className="ctext-wrap-content ">
                                                            {message.message
                                                                .text && (
                                                                <p
                                                                    className="mb-0 ctext-content px-3 py-2"
                                                                    style={{
                                                                        whiteSpace:
                                                                            "pre-wrap",
                                                                    }}
                                                                >
                                                                    {
                                                                        message
                                                                            .message
                                                                            .text
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                    )}
                                                    {message?.message?.type ==
                                                        "button" &&
                                                        message?.message
                                                            ?.buttons == null &&
                                                        message?.message
                                                            ?.title && (
                                                            <div className="ctext-wrap-content ">
                                                                {message
                                                                    ?.reply_to_message
                                                                    ?.id && (
                                                                    <div className="replymessage-block mb-0">
                                                                        {message
                                                                            ?.reply_to_message
                                                                            ?.message && (
                                                                            <>
                                                                                <div
                                                                                    className="name mb-1 "
                                                                                    style={{
                                                                                        fontWeight:
                                                                                            "500",
                                                                                    }}
                                                                                >
                                                                                    {getNameFromMessageWhenReplying(
                                                                                        message,
                                                                                        selectedContact
                                                                                    )}
                                                                                </div>
                                                                                <p
                                                                                    className="mb-0 line-clamp-3"
                                                                                    style={{
                                                                                        maxHeight:
                                                                                            "60px",
                                                                                        overflow:
                                                                                            "hidden",
                                                                                        whiteSpace:
                                                                                            "pre-wrap",
                                                                                    }}
                                                                                >
                                                                                    {message
                                                                                        ?.reply_to_message
                                                                                        ?.message
                                                                                        ?.type ==
                                                                                        "text" && (
                                                                                        <>
                                                                                            {
                                                                                                message
                                                                                                    ?.reply_to_message
                                                                                                    ?.message
                                                                                                    ?.text
                                                                                            }
                                                                                        </>
                                                                                    )}
                                                                                </p>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                )}
                                                                {message
                                                                    ?.message
                                                                    ?.title && (
                                                                    <p
                                                                        className="mb-0 ctext-content px-3 py-2"
                                                                        style={{
                                                                            whiteSpace:
                                                                                "pre-wrap",
                                                                        }}
                                                                    >
                                                                        {
                                                                            message
                                                                                ?.message
                                                                                ?.title
                                                                        }
                                                                    </p>
                                                                )}
                                                                {message?.reactions && (
                                                                    <div className="message-reaction">
                                                                        {message?.reactions?.map(
                                                                            (
                                                                                reaction
                                                                            ) => (
                                                                                <span>
                                                                                    {
                                                                                        reaction?.emoji
                                                                                    }
                                                                                </span>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    {message?.message?.type ==
                                                        "quick_reply" &&
                                                        !isEmpty(
                                                            message?.message
                                                                ?.replies
                                                        ) && (
                                                            <div className="ctext-wrap-content ">
                                                                {message
                                                                    ?.reply_to_message
                                                                    ?.id && (
                                                                    <div className="replymessage-block mb-0">
                                                                        {message
                                                                            ?.reply_to_message
                                                                            ?.message && (
                                                                            <>
                                                                                <div
                                                                                    className="name mb-1 "
                                                                                    style={{
                                                                                        fontWeight:
                                                                                            "500",
                                                                                    }}
                                                                                >
                                                                                    {getNameFromMessageWhenReplying(
                                                                                        message,
                                                                                        selectedContact
                                                                                    )}
                                                                                </div>
                                                                                <p
                                                                                    className="mb-0 line-clamp-3"
                                                                                    style={{
                                                                                        maxHeight:
                                                                                            "60px",
                                                                                        overflow:
                                                                                            "hidden",
                                                                                        whiteSpace:
                                                                                            "pre-wrap",
                                                                                    }}
                                                                                >
                                                                                    {message
                                                                                        ?.reply_to_message
                                                                                        ?.message
                                                                                        ?.type ==
                                                                                        "text" && (
                                                                                        <>
                                                                                            {
                                                                                                message
                                                                                                    ?.reply_to_message
                                                                                                    ?.message
                                                                                                    ?.text
                                                                                            }
                                                                                        </>
                                                                                    )}
                                                                                </p>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                )}
                                                                {!isEmpty(
                                                                    message
                                                                        ?.message
                                                                        ?.replies
                                                                ) && (
                                                                    <p
                                                                        className="mb-0 ctext-content px-3 py-2"
                                                                        style={{
                                                                            whiteSpace:
                                                                                "pre-wrap",
                                                                        }}
                                                                    >
                                                                        {message
                                                                            ?.message
                                                                            ?.replies[0] &&
                                                                            message
                                                                                ?.message
                                                                                ?.replies[0]}
                                                                    </p>
                                                                )}
                                                                {message?.reactions && (
                                                                    <div className="message-reaction">
                                                                        {message?.reactions?.map(
                                                                            (
                                                                                reaction
                                                                            ) => (
                                                                                <span>
                                                                                    {
                                                                                        reaction?.emoji
                                                                                    }
                                                                                </span>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    {message?.message?.type ==
                                                        "whatsapp_template" && (
                                                        <div
                                                            className="ctext-wrap-content whatsapp_template px-3 py-2"
                                                            dir={
                                                                message?.message
                                                                    ?.template
                                                                    ?.languageCode ==
                                                                    "en_US" ||
                                                                message?.message
                                                                    ?.template
                                                                    ?.languageCode ==
                                                                    "en"
                                                                    ? "ltr"
                                                                    : message
                                                                          ?.message
                                                                          ?.template
                                                                          ?.languageCode ==
                                                                          "hb_IL" ||
                                                                      message
                                                                          ?.message
                                                                          ?.template
                                                                          ?.languageCode ==
                                                                          "hb"
                                                                    ? "rtl"
                                                                    : null
                                                            }
                                                        >
                                                            {message
                                                                ?.reply_to_message
                                                                ?.id && (
                                                                <div className="replymessage-block mb-0">
                                                                    {message
                                                                        ?.reply_to_message
                                                                        ?.message && (
                                                                        <>
                                                                            <div
                                                                                className="name mb-1 "
                                                                                style={{
                                                                                    fontWeight:
                                                                                        "500",
                                                                                }}
                                                                            >
                                                                                {getNameFromMessageWhenReplying(
                                                                                    message,
                                                                                    selectedContact
                                                                                )}
                                                                            </div>
                                                                            <p
                                                                                className="mb-0 line-clamp-3"
                                                                                style={{
                                                                                    maxHeight:
                                                                                        "60px",
                                                                                    overflow:
                                                                                        "hidden",
                                                                                    whiteSpace:
                                                                                        "pre-wrap",
                                                                                }}
                                                                            >
                                                                                {message
                                                                                    ?.reply_to_message
                                                                                    ?.message
                                                                                    ?.type ==
                                                                                    "text" && (
                                                                                    <>
                                                                                        {
                                                                                            message
                                                                                                ?.reply_to_message
                                                                                                ?.message
                                                                                                ?.text
                                                                                        }
                                                                                    </>
                                                                                )}
                                                                            </p>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            )}
                                                            {message?.message
                                                                ?.template
                                                                ?.header_text !=
                                                                "" && (
                                                                <p className="mb-2 ctext-content template-header">
                                                                    {
                                                                        message
                                                                            ?.message
                                                                            ?.template
                                                                            ?.header_text
                                                                    }
                                                                </p>
                                                            )}
                                                            {message?.message
                                                                ?.template
                                                                ?.body_text !=
                                                                "" && (
                                                                <p className="mb-2 ctext-content template-body">
                                                                    {
                                                                        message
                                                                            ?.message
                                                                            ?.template
                                                                            ?.body_text
                                                                    }
                                                                </p>
                                                            )}
                                                            {message?.message
                                                                ?.template
                                                                ?.footer_text !=
                                                                "" && (
                                                                <p className="mb-2 ctext-content template-footer">
                                                                    {
                                                                        message
                                                                            ?.message
                                                                            ?.template
                                                                            ?.footer_text
                                                                    }
                                                                </p>
                                                            )}
                                                            {message?.message?.template?.buttons?.map(
                                                                (button) => (
                                                                    <>
                                                                        {button.type.toLowerCase() ==
                                                                            "url" && (
                                                                            <Link
                                                                                className="ctext-btn url btn btn-sm btn-outline-primary w-100 mb-2"
                                                                                to={
                                                                                    button.url
                                                                                }
                                                                                target="_blank"
                                                                            >
                                                                                {
                                                                                    button.text
                                                                                }
                                                                            </Link>
                                                                        )}

                                                                        {button.type.toLowerCase() ==
                                                                            "quick_reply" && (
                                                                            <Button
                                                                                className="ctext-btn reply btn btn-sm btn-outline-secondary w-100 mb-2"
                                                                                onClick={() => {
                                                                                    setTextMessage(
                                                                                        button.text
                                                                                    );
                                                                                    handleSendTextMessage();
                                                                                }}
                                                                            >
                                                                                {
                                                                                    button.text
                                                                                }
                                                                            </Button>
                                                                        )}
                                                                    </>
                                                                )
                                                            )}
                                                            {message?.reactions && (
                                                                <div className="message-reaction">
                                                                    {message?.reactions?.map(
                                                                        (
                                                                            reaction
                                                                        ) => (
                                                                            <span>
                                                                                {
                                                                                    reaction?.emoji
                                                                                }
                                                                            </span>
                                                                        )
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                    <UncontrolledDropdown className="align-self-start message-box-drop ">
                                                        <DropdownToggle
                                                            //href="#"
                                                            className="btn nav-btn"
                                                            tag="button"
                                                        >
                                                            <i className="ri-more-2-fill"></i>
                                                        </DropdownToggle>
                                                        <DropdownMenu className="message-box-dropdown-menus">
                                                            <DropdownItem
                                                                className="reply-message d-flex"
                                                                onClick={() =>
                                                                    setReplyMessage(
                                                                        message
                                                                    )
                                                                }
                                                                style={{
                                                                    justifyContent:
                                                                        "space-between",
                                                                    alignItems:
                                                                        "center",
                                                                }}
                                                            >
                                                                <i className="ri-reply-line mx-2 text-muted align-bottom"></i>
                                                                <span>
                                                                    {t("Reply")}
                                                                </span>
                                                            </DropdownItem>
                                                            {/* <DropdownItem
                                                                                        href="#"
                                                                                        className="d-flex"
                                                                                        style={{
                                                                                            justifyContent:
                                                                                                "space-between",
                                                                                            alignItems:
                                                                                                "center",
                                                                                        }}
                                                                                    >
                                                                                        <i className="ri-share-line mx-2 text-muted align-bottom"></i>
                                                                                        <span>
                                                                                            {t(
                                                                                                "Forward"
                                                                                            )}
                                                                                        </span>
                                                                                    </DropdownItem>
                                                                                    <DropdownItem
                                                                                        href="#"
                                                                                        className="d-flex"
                                                                                        onClick={(
                                                                                            e
                                                                                        ) =>
                                                                                            handleCkick(
                                                                                                e.target
                                                                                            )
                                                                                        }
                                                                                        style={{
                                                                                            justifyContent:
                                                                                                "space-between",
                                                                                            alignItems:
                                                                                                "center",
                                                                                        }}
                                                                                    >
                                                                                        <i className="ri-file-copy-line mx-2 text-muted align-bottom"></i>
                                                                                        <span>
                                                                                            {t(
                                                                                                "Copy"
                                                                                            )}
                                                                                        </span>
                                                                                    </DropdownItem>
                                                                                    <DropdownItem
                                                                                        href="#"
                                                                                        className="d-flex"
                                                                                        style={{
                                                                                            justifyContent:
                                                                                                "space-between",
                                                                                            alignItems:
                                                                                                "center",
                                                                                        }}
                                                                                    >
                                                                                        <i className="ri-bookmark-line mx-2 text-muted align-bottom"></i>
                                                                                        <span>
                                                                                            {t(
                                                                                                "Bookmark"
                                                                                            )}
                                                                                        </span>
                                                                                    </DropdownItem>
                                                                                    <DropdownItem
                                                                                        href="#"
                                                                                        onClick={() =>
                                                                                            dispatch(
                                                                                                onDeleteMessage(
                                                                                                    message.id
                                                                                                )
                                                                                            )
                                                                                        }
                                                                                        className="d-flex"
                                                                                        style={{
                                                                                            justifyContent:
                                                                                                "space-between",
                                                                                            alignItems:
                                                                                                "center",
                                                                                        }}
                                                                                    >
                                                                                        <i className="ri-delete-bin-5-line mx-2 text-muted align-bottom"></i>
                                                                                        <span>
                                                                                            {t(
                                                                                                "Delete"
                                                                                            )}
                                                                                        </span>
                                                                                    </DropdownItem> */}
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </div>
                                                {!isEmpty(
                                                    message.status.message
                                                ) && (
                                                    <div className="ctext-wrap-content error-message">
                                                        <p className="mb-1  ctext-content text-muted fs-12 px-3 py-2">
                                                            {
                                                                JSON.parse(
                                                                    message
                                                                        .status
                                                                        .message
                                                                )[0].error_data
                                                                    .details
                                                            }
                                                        </p>
                                                    </div>
                                                )}
                                                <div className="conversation-name conversation-footer">
                                                    {message?.status
                                                        ?.timestamp && (
                                                        <small
                                                            className="text-muted time"
                                                            style={{
                                                                direction:
                                                                    "ltr",
                                                            }}
                                                        >
                                                            {/* {handleMessageTimeMeta(
                                                                message?.status
                                                                    ?.timestamp,
                                                                language
                                                            )?.val_0
                                                                ? t(
                                                                      handleMessageTimeMeta(
                                                                          message
                                                                              ?.status
                                                                              ?.timestamp,
                                                                          language
                                                                      )?.val_2
                                                                  ) +
                                                                  " " +
                                                                  t(
                                                                      handleMessageTimeMeta(
                                                                          message
                                                                              ?.status
                                                                              ?.timestamp,
                                                                          language
                                                                      )?.val_0
                                                                  ) +
                                                                  " " +
                                                                  t(
                                                                      handleMessageTimeMeta(
                                                                          message
                                                                              ?.status
                                                                              ?.timestamp,
                                                                          language
                                                                      )?.val_1
                                                                  )
                                                                : t(
                                                                      handleMessageTimeMeta(
                                                                          message
                                                                              ?.status
                                                                              ?.timestamp,
                                                                          language
                                                                      )
                                                                  )} */}
                                                            {moment
                                                                .unix(
                                                                    message
                                                                        ?.status
                                                                        ?.timestamp
                                                                )
                                                                .local()
                                                                .fromNow()}
                                                        </small>
                                                    )}
                                                    {message.status.value ==
                                                        "Failed" && (
                                                        <span className="text-danger check-message-icon">
                                                            <i className="ri-close-line align-bottom"></i>
                                                        </span>
                                                    )}
                                                    {message.status.value ==
                                                        "Sending" && (
                                                        <span className="text-muted check-message-icon">
                                                            <i className="ri-check-line align-bottom"></i>
                                                        </span>
                                                    )}
                                                    {message.status.value ==
                                                        "Sent" && (
                                                        <span className="text-muted check-message-icon">
                                                            <i className="ri-check-double-line align-bottom"></i>
                                                        </span>
                                                    )}
                                                    {message.status.value ==
                                                        "Delivered" && (
                                                        <span className="text-success check-message-icon">
                                                            <i className="ri-check-line align-bottom"></i>
                                                        </span>
                                                    )}
                                                    {message.status.value ==
                                                        "Read" && (
                                                        <span className="text-success check-message-icon">
                                                            <i className="ri-check-double-line align-bottom"></i>
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                        {messages?.links?.prev && (
                            <>
                                <div
                                    className="d-flex"
                                    style={{
                                        justifyContent: "center",
                                        marginBottom: "1rem",
                                        marginTop: ".25rem",
                                    }}
                                >
                                    <Button
                                        color=""
                                        id="nextPage"
                                        className="btn btn-soft-success btn-sm shadow-none me-2"
                                        onClick={() => {
                                            dispatch(
                                                onGetContactConversationsApi(
                                                    `${
                                                        selectedContact.id
                                                    }${getMessageLinksPayload(
                                                        messages?.links?.prev
                                                    )}`
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
                                    {t("Recent messages")}
                                </UncontrolledTooltip>
                            </>
                        )}
                    </PerfectScrollbar>
                </div>
                <div
                    className="alert alert-warning alert-dismissible copyclipboard-alert px-4 fade show "
                    id="copyClipBoard"
                    role="alert"
                >
                    {t("Message copied")}
                </div>
            </div>
        </React.Fragment>
    );
};

export default ChatMessagePane;
