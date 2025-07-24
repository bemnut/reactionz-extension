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


import ChatTopbar from "./ChatTopbar";
import ChatMessagePane from "./ChatMessagesPane";
import ChatAudioPane from "./ChatAudioPane";

//
const ChatInputsSnippetsPane = ({
    isSnippet,
    setTextMessage,
    handleGetPaginatedSnippets,
}) => {
    const { t } = useTranslation();

    moment().local(true);

    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

    const selectChatState = (state) => state;
    const chatProperties = createSelector(selectChatState, (state) => ({
        messageSnippets: state.Message.messageSnippets,
    }));
    // Inside your component
    const { messageSnippets } = useSelector(chatProperties);

    const [searchSnippet, setSearchSnippet] = useState<any>("");

    useEffect(() => {
        isSnippet && dispatch(onGetMessageSnippetsApi({}));
    }, [isSnippet]);

    useEffect(() => {
        if (searchSnippet != "") {
            dispatch(
                onGetMessageSnippetsApi({
                    search: searchSnippet,
                })
            );
        } else {
            dispatch(onGetMessageSnippetsApi({}));
        }
    }, [searchSnippet]);

    return (
        <React.Fragment>
            <div className="snippets ">
                {messageSnippets?.data ? (
                    <>
                        <div className="search-box">
                            <Input
                                onChange={(e) => {
                                    setSearchSnippet(e.target.value);
                                }}
                                value={searchSnippet ? searchSnippet : ""}
                                // onKeyUp={
                                //     searchSnippets
                                // }
                                type="text"
                                className="form-control bg-light border-light"
                                placeholder={t("Search here...")}
                                id="searchSnippets"
                            />
                            <i className="ri-search-2-line search-icon"></i>
                        </div>
                        <div className="snippet-content scrollable">
                            {messageSnippets?.links?.next && (
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
                                                handleGetPaginatedSnippets(
                                                    messageSnippets?.links
                                                        ?.next,
                                                    searchSnippet
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
                                        {t("Previous snippets")}
                                    </UncontrolledTooltip>
                                </>
                            )}
                            <ul className="list-unstyled">
                                {messageSnippets?.data?.map((snippet) => (
                                    <li
                                        className=" p-2"
                                        onClick={() => {
                                            setTextMessage(snippet.message);
                                            setSearchSnippet("");
                                        }}
                                    >
                                        <div className="">
                                            <div className="snippet-name">
                                                {snippet.name}
                                            </div>
                                            <div className="text-muted small snippet-message">
                                                {snippet.message}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            {messageSnippets?.links?.prev && (
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
                                                handleGetPaginatedSnippets(
                                                    messageSnippets?.links
                                                        ?.prev,
                                                    searchSnippet
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
                                        {t("Next snippets")}
                                    </UncontrolledTooltip>
                                </>
                            )}
                        </div>
                    </>
                ) : (
                    t("No Snippets available")
                )}
            </div>
        </React.Fragment>
    );
};

export default ChatInputsSnippetsPane;
