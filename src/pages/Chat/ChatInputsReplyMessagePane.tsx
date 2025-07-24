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
import ChatAudioPane from "./ChatAudioPane";
import ChatInputsSnippetsPane from "./ChatInputsSnippetsPane";

//
const ChatInputsReplyMessagePane = ({
    selectedContact,
    setZoomedImage,
    setZoomedImageURL,
    setReplyMessage,
    replyMessage,
}) => {


    const { t } = useTranslation();

    moment().local(true);

    //const chatMessagesList = useRef<HTMLInputElement>();

    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

    const selectChatState = (state) => state;
    const chatProperties = createSelector(selectChatState, (state) => ({
        //
    }));
    // Inside your component
    const {
        //
    } = useSelector(chatProperties);

    //

    return (
        <React.Fragment>
            <div className="reply">
                <Card className="mb-0">
                    <CardBody
                        className="py3"
                        style={{
                            padding: "0",
                        }}
                    >
                        <div className="replymessage-block mb-0 d-flex align-items-start">
                            <div className="flex-grow-1">
                                <div
                                    className="name mb-1 "
                                    style={{
                                        fontWeight: "500",
                                    }}
                                >
                                    {getNameFromMessageWhenReplying(
                                        replyMessage,
                                        selectedContact
                                    )}
                                </div>
                                <p
                                    className="mb-0 line-clamp-3"
                                    style={{
                                        maxHeight: "60px",
                                        overflow: "hidden",
                                    }}
                                >
                                    {replyMessage?.message?.type ==
                                        "attachment" && (
                                        <>
                                            {replyMessage?.message?.attachment
                                                ?.type == "image" && (
                                                <>
                                                    <img
                                                        onClick={() => {
                                                            setZoomedImage(
                                                                true
                                                            );
                                                            setZoomedImageURL(
                                                                replyMessage
                                                                    .message
                                                                    .attachment
                                                                    .url
                                                            );
                                                        }}
                                                        src={
                                                            replyMessage.message
                                                                .attachment.url
                                                        }
                                                        alt=""
                                                        style={{
                                                            maxWidth: "200px",
                                                        }}
                                                    />

                                                    {replyMessage?.message
                                                        ?.attachment
                                                        ?.caption && (
                                                        <p className="p-2 pb-0">
                                                            {
                                                                replyMessage
                                                                    ?.message
                                                                    ?.attachment
                                                                    ?.caption
                                                            }
                                                        </p>
                                                    )}
                                                </>
                                            )}

                                            {replyMessage?.message?.attachment
                                                ?.type == "video" && (
                                                <>
                                                    <video
                                                        style={{
                                                            maxWidth: "200px",
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
                                                            replyMessage.message
                                                                .attachment.url
                                                        }
                                                    >
                                                        {t(
                                                            "Your browser does not support the video tag."
                                                        )}
                                                    </video>
                                                    {replyMessage?.message
                                                        ?.attachment
                                                        ?.caption && (
                                                        <p className="p-2 pb-0">
                                                            {
                                                                replyMessage
                                                                    ?.message
                                                                    ?.attachment
                                                                    ?.caption
                                                            }
                                                        </p>
                                                    )}
                                                </>
                                            )}

                                            {replyMessage?.message?.attachment
                                                ?.type == "audio" && (
                                                <>
                                                    <audio
                                                        style={{
                                                            maxWidth: "200px",
                                                        }}
                                                        autoPlay={false}
                                                        //muted
                                                        controls
                                                        src={
                                                            replyMessage.message
                                                                .attachment.url
                                                        }
                                                    >
                                                        {t(
                                                            "Your browser does not support the audio tag."
                                                        )}
                                                    </audio>
                                                    {replyMessage?.message
                                                        ?.attachment
                                                        ?.caption && (
                                                        <p className="p-2 pb-0">
                                                            {
                                                                replyMessage
                                                                    ?.message
                                                                    ?.attachment
                                                                    ?.caption
                                                            }
                                                        </p>
                                                    )}
                                                </>
                                            )}

                                            {replyMessage?.message?.attachment
                                                ?.type == "document" && (
                                                <>
                                                    <div>
                                                        {captionToJson(
                                                            replyMessage
                                                                ?.message
                                                                ?.attachment
                                                                ?.caption
                                                        )?.filename
                                                            ? captionToJson(
                                                                  replyMessage
                                                                      ?.message
                                                                      ?.attachment
                                                                      ?.caption
                                                              )?.filename
                                                            : getFileName(
                                                                  replyMessage
                                                                      ?.message
                                                                      ?.attachment
                                                                      ?.url
                                                              )}
                                                    </div>
                                                    {captionToJson(
                                                        replyMessage?.message
                                                            ?.attachment
                                                            ?.caption
                                                    )?.caption ? (
                                                        <p className="p-2 pb-0">
                                                            {
                                                                captionToJson(
                                                                    replyMessage
                                                                        ?.message
                                                                        ?.attachment
                                                                        ?.caption
                                                                )?.caption
                                                            }
                                                        </p>
                                                    ) : (
                                                        replyMessage?.message
                                                            ?.attachment
                                                            ?.caption != "" &&
                                                        !_.isJSON(
                                                            replyMessage
                                                                ?.message
                                                                ?.attachment
                                                                ?.caption
                                                        ) && (
                                                            <p className="p-2 pb-0">
                                                                {
                                                                    replyMessage
                                                                        ?.message
                                                                        ?.attachment
                                                                        ?.caption
                                                                }
                                                            </p>
                                                        )
                                                    )}
                                                </>
                                            )}
                                        </>
                                    )}

                                    {replyMessage?.message?.type ==
                                        "comment" && (
                                        <>
                                            {replyMessage.message.text && (
                                                <>
                                                    <p className="mb-2 ctext-content">
                                                        {
                                                            replyMessage.message
                                                                .text
                                                        }
                                                    </p>
                                                </>
                                            )}
                                        </>
                                    )}
                                    {replyMessage?.message?.type == "text" &&
                                        replyMessage.message.text && (
                                            <>{replyMessage.message.text}</>
                                        )}

                                    {replyMessage?.message?.type == "button" &&
                                        replyMessage?.message?.buttons ==
                                            null &&
                                        replyMessage?.message?.title && (
                                            <>{replyMessage?.message?.title}</>
                                        )}

                                    {replyMessage?.message?.type ==
                                        "quick_reply" &&
                                        !isEmpty(
                                            replyMessage?.message?.replies
                                        ) && (
                                            <>
                                                {replyMessage?.message
                                                    ?.replies[0] &&
                                                    replyMessage?.message
                                                        ?.replies[0]}
                                            </>
                                        )}

                                    {replyMessage?.message?.type ==
                                        "whatsapp_template" && (
                                        <>
                                            {replyMessage?.message?.template
                                                ?.header_text != "" && (
                                                <div>
                                                    {
                                                        replyMessage?.message
                                                            ?.template
                                                            ?.header_text
                                                    }
                                                </div>
                                            )}
                                            {replyMessage?.message?.template
                                                ?.body_text != "" && (
                                                <div>
                                                    {
                                                        replyMessage?.message
                                                            ?.template
                                                            ?.body_text
                                                    }
                                                </div>
                                            )}
                                            {replyMessage?.message?.template
                                                ?.footer_text != "" && (
                                                <div>
                                                    {
                                                        replyMessage?.message
                                                            ?.template
                                                            ?.footer_text
                                                    }
                                                </div>
                                            )}
                                            {replyMessage?.message?.template?.buttons?.map(
                                                (button) => (
                                                    <div>
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

                                                        {button.type.toLowerCase() ==
                                                            "quick_reply" && (
                                                            <Button className="ctext-btn  btn btn-sm btn-outline-secondary w-100 mb-2">
                                                                {button.text}
                                                            </Button>
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </>
                                    )}
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <button
                                    type="button"
                                    id="close_toggle"
                                    className="btn btn-sm btn-link mt-n2 me-n3 fs-18"
                                    onClick={() => setReplyMessage("")}
                                >
                                    <i className="bx bx-x align-middle"></i>
                                </button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </React.Fragment>
    );
};

export default ChatInputsReplyMessagePane;
