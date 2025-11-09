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
import { fileTypeFromBlob, fileTypeFromFile } from "file-type";
//
import ChatTopbar from "./ChatTopbar";
import ChatMessagePane from "./ChatMessagesPane";
import ChatAudioPane from "./ChatAudioPane";
import ChatInputsSnippetsPane from "./ChatInputsSnippetsPane";
import ChatInputsReplyMessagePane from "./ChatInputsReplyMessagePane";

//
const ChatInputsPaneMINE = ({
    selectedChannel,
    selectedContact,
    setZoomedImage,
    setZoomedImageURL,
    canSendMessage,
    handleSendTextMessage,
    selectedFile,
    setSelectedFile,
    isSnippet,
    setIsSnippet,
    textMessage,
    setTextMessage,
    isComment,
    setIsComment,
    chatInputMoreItems,
    setReplyMessage,
    replyMessage,
    setChatInputMoreItems,
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
        messageSnippets: state.Message.messageSnippets,
        file: state.File.file,
    }));
    // Inside your component
    const {
        messages,
        messageSnippets,

        file,
    } = useSelector(chatProperties);

    const imageFileInput = useRef<any>();
    const [emojiPicker, setemojiPicker] = useState(false);
    const [imagePicker, setImagePicker] = useState(false);
    //
    const [sendTemplateModal, setSendTemplateModal] = useState(false);
    const [searchSnippet, setSearchSnippet] = useState<any>("");
    const [contactsFieldDropDown, setContactsFieldDropDown] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState<any>(null);

    //

    //Toggle SendTemplateModal
    const toggleSendTemplateModal = () => {
        setSendTemplateModal(!sendTemplateModal);
    };

    //Toggle contacts field drop down
    const toggleContactsFieldDropDown = () => {
        setContactsFieldDropDown(!contactsFieldDropDown);
    };

    // snippets

    useEffect(() => {
        if (textMessage != "") {
            !isComment && textMessage?.startsWith("/") && setIsSnippet(true);
            !textMessage?.startsWith("/") && setIsSnippet(false);
        } else {
            dispatch(onChangeMessageSnippetApi([]));
            setIsSnippet(false);
        }
    }, [textMessage]);

    useEffect(() => {
        isSnippet && dispatch(onGetMessageSnippetsApi({}));
    }, [isSnippet]);

    // useEffect(() => {
    //     console.log("sortedMessages: ", sortedMessages);
    // }, [sortedMessages]);

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

    const onKeyPress = (e) => {
        const { key, value } = e;
        if (key === "Enter") {
            e.preventDefault();
            //setTextMessage(value);
            handleSendTextMessage();
        }
    };

    // emoji
    const [emojiArray, setemojiArray] = useState([]);

    const onEmojiClick = (event, emojiObject) => {
        setemojiArray([...emojiArray, emojiObject.emoji]);
        let emoji = [...emojiArray, emojiObject.emoji].join(" ");
        setTextMessage(textMessage + event.emoji);
        setemojiPicker(!emojiPicker);
    };

    const toggleIsComment = () => {
        setIsComment(!isComment);
    };

    const handleGetPaginatedSnippets = (link, filter) => {
        const payload = getPageLinksPayload(link, filter);

        dispatch(onGetMessageSnippetsApi(payload));
    };

    window.addEventListener("paste", (e) => {
        if (e.clipboardData.files.length) {
            let file = e.clipboardData.files[0];
            if (file?.type?.startsWith("image/")) {
                setImagePicker(true);
                setSelectedFile(file);
                //previewImage(file);
            }
        }
    });

    useEffect(() => {
        console.log("file: ", file);
    }, [file]);

    const handleSendAudio = async () => {
        if (audioBlob) {
            console.log("audioBlob: ", audioBlob);
            //dispatch(onUploadFileApi({}));
            //setAudioBlob(null);
            //             onGetUploadStatusApi
            // changeFileStatusStateAction
            // onUploadFileApi
            dispatch(onChangeFileState(null));
            // reset content type to multipart/form-data
            setReactonzContentTypeHeader("form");

            // create and set the form data
            const formData = new FormData();
            const convertedAudioFile = new File([audioBlob], "voice.mp3", {
                type: "audio/mp3",
            });
            console.log("converted file: ", convertedAudioFile);

            console.log(
                "BLOB fileTypeFromFile: ",
                await fileTypeFromBlob(audioBlob)
            );

            // console.log(
            //     "FILE fileTypeFromFile: ",
            //     await fileTypeFromFile("/voice.mp3")
            // );

            // const url = URL.createObjectURL(audioBlob);

            convertedAudioFile && formData.append("file", convertedAudioFile);
            convertedAudioFile && formData.append("is_recording", "true");

            // upload the file
            dispatch(onUploadFile(formData));

            // reset content type to json
            setReactonzContentTypeHeader();
        }
    };

    /** */
    //const [isRecording, setIsRecording] = useState(false);
    const [audioStream, setAudioStream] = useState(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const timerRef = useRef(null);
    const RECORDING_MAX_DURATION = 240; // 4 minutes in seconds

    //
    useEffect(() => {
        if (!audioStream) {
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then((stream) => {
                    setAudioStream(stream);
                    const mediaRecorder = new MediaRecorder(stream, {
                        mimeType: "audio/mp4",
                    });
                    setMediaRecorder(mediaRecorder);
                    let audio;

                    mediaRecorder.ondataavailable = (event) => {
                        if (event.data.size > 0) {
                            audio = [event.data];
                        }
                    };

                    mediaRecorder.onstop = (event) => {
                        const b = new Blob(audio, {
                            type: "audio/ogg; codecs=opus",
                        });
                        setAudioBlob(b);
                        console.log("mediaRecorder.onstop audioBlob: ", b);
                    };
                })
                .catch((error) => {
                    console.error("Error accessing microphone:", error);
                });
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [audioStream]);

    //
    const handleToggleRecording = (event) => {
        event.preventDefault();
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    const startRecording = () => {
        mediaRecorder.start();
        console.log("startRecording mediaRecorder: ", mediaRecorder);
        setIsRecording(true);
        setRecordingTime(0);
        setAudioBlob(null);
        timerRef.current = setInterval(() => {
            setRecordingTime((prevTime) => {
                if (prevTime >= RECORDING_MAX_DURATION - 1) {
                    stopRecording();
                    return RECORDING_MAX_DURATION;
                }
                return prevTime + 1;
            });
        }, 1000);
    };

    const stopRecording = () => {
        mediaRecorder.stop();
        setIsRecording(false);
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        console.log("stopRecording mediaRecorder :", mediaRecorder);
    };

    return (
        <React.Fragment>
            <div
                className={classnames("chat-input-section  py-1 d-flex", {
                    comment: isComment,
                })}
                style={{
                    height: "50px",
                    justifyContent: "center",
                    position: "relative",
                }}
            >
                <div
                    id="chatinput-form"
                    className="d-flex mx-1"
                    style={{
                        width: "100%",
                        alignItems: "center",
                    }}
                >
                    <div
                        className="g-0 align-items-center"
                        style={{ width: "100%" }}
                    >
                        <div
                            //className="chat-inputs-more-wrapper"
                            className={classnames("chat-inputs-more-wrapper", {
                                opened: chatInputMoreItems,
                            })}
                            style={{
                                width: "100%",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <div
                                    className="chat-inputs-more-button"
                                    onClick={() =>
                                        setChatInputMoreItems(
                                            !chatInputMoreItems
                                        )
                                    }
                                >
                                    <i
                                        className={classnames("ri ", {
                                            "ri-arrow-up-s-line":
                                                !chatInputMoreItems,
                                            "ri-arrow-down-s-line":
                                                chatInputMoreItems,
                                        })}
                                    ></i>
                                </div>
                            </div>

                            {/* chat Input More Items */}
                            {chatInputMoreItems && (
                                <div
                                    className="px-2 py-1"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "start",
                                    }}
                                >
                                    <div
                                        className="mx-1 "
                                        style={{
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="is-comment"
                                            onClick={() => {
                                                toggleIsComment();
                                            }}
                                            checked={isComment ? true : false}
                                        />
                                        <Label
                                            className="form-check-label mx-2 text-muted"
                                            htmlFor="is-comment"
                                        >
                                            {t("Add Comment")}
                                        </Label>
                                    </div>
                                </div>
                            )}
                        </div>

                        {canSendMessage || isComment ? (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                {/* toggle image picker button */}
                                {!isComment && (
                                    <div className="col-auto">
                                        <div className="chat-input-links ">
                                            <div className="links-list-item">
                                                <button
                                                    type="button"
                                                    className="btn btn-link text-decoration-none emoji-btn"
                                                    id="emoji-btn"
                                                    onClick={() => {
                                                        setImagePicker(
                                                            !imagePicker
                                                        );
                                                        setemojiPicker(false);
                                                    }}
                                                >
                                                    <i
                                                        className="ri-attachment-2 align-middle"
                                                        style={{
                                                            lineHeight: "1",
                                                        }}
                                                    ></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/* toggle emoji button*/}
                                {!isRecording && !audioBlob && (
                                    <div className="col-auto">
                                        <div className="chat-input-links ">
                                            <div className="links-list-item">
                                                <button
                                                    type="button"
                                                    className="btn btn-link text-decoration-none emoji-btn"
                                                    id="image-btn"
                                                    onClick={() => {
                                                        setemojiPicker(
                                                            !emojiPicker
                                                        );
                                                        setImagePicker(false);
                                                    }}
                                                >
                                                    <i className="bx bx-smile align-middle"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* contact fields */}
                                {!isComment && (
                                    <div className="col-auto">
                                        <div className="chat-input-links ">
                                            <div className="links-list-item">
                                                <Dropdown
                                                    isOpen={
                                                        contactsFieldDropDown
                                                    }
                                                    toggle={
                                                        toggleContactsFieldDropDown
                                                    }
                                                >
                                                    <DropdownToggle
                                                        className="text-muted"
                                                        tag="button"
                                                        style={{
                                                            border: "none",
                                                            background:
                                                                "transparent",
                                                            position:
                                                                "relative",
                                                        }}
                                                    >
                                                        <i className="ri-code-s-slash-line"></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu
                                                        className="p-0 dropdown-menu-end dropdown-menu-lg"
                                                        style={{
                                                            top: "-287px",

                                                            maxHeight: " 200px",
                                                            overflow: "auto",
                                                        }}
                                                    >
                                                        {contactFields?.map(
                                                            (contactField) => (
                                                                <DropdownItem
                                                                    onClick={() => {
                                                                        setTextMessage(
                                                                            `${textMessage} {{${contactField?.field}}}`
                                                                        );
                                                                    }}
                                                                >
                                                                    {
                                                                        contactField?.name
                                                                    }
                                                                </DropdownItem>
                                                            )
                                                        )}
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* input message */}
                                <div
                                    className="col input-message"
                                    style={{
                                        position: "relative",
                                    }}
                                >
                                    {/* <div className="chat-input-feedback">
                                                    {t(
                                                        "Please Enter a Message"
                                                    )}
                                                </div> */}

                                    {!isRecording && !audioBlob ? (
                                        <input
                                            type="text"
                                            value={textMessage}
                                            onKeyDown={onKeyPress}
                                            onChange={(e) =>
                                                setTextMessage(e.target.value)
                                            }
                                            className="form-control chat-input bg-light border-light px-2 py-1"
                                            id="chat-input"
                                            placeholder={
                                                isComment == true
                                                    ? t("Add your comment...")
                                                    : t("Type your message...")
                                            }
                                        />
                                    ) : (
                                        // <ChatAudioPane
                                        //     isRecording={isRecording}
                                        //     setIsRecording={setIsRecording}
                                        //     //mediaRecorder={mediaRecorder}
                                        //     //setMediaRecorder={setMediaRecorder}
                                        //     audioBlob={audioBlob}
                                        //     setRecordingTime={setRecordingTime}
                                        //     setAudioBlob={setAudioBlob}
                                        //     recordingTime={recordingTime}
                                        //     // timerRef={timerRef}
                                        //     time={""}
                                        //     RECORDING_MAX_DURATION={
                                        //         RECORDING_MAX_DURATION
                                        //     }
                                        //     handleToggleRecording={
                                        //         handleToggleRecording
                                        //     }
                                        //     audioStream={audioStream}
                                        //     setAudioStream={setAudioStream}

                                        // />
                                        ""
                                    )}

                                    {replyMessage != "" && (
                                        <ChatInputsReplyMessagePane
                                            selectedContact={selectedContact}
                                            setZoomedImage={setZoomedImage}
                                            setZoomedImageURL={
                                                setZoomedImageURL
                                            }
                                            setReplyMessage={setReplyMessage}
                                            replyMessage={replyMessage}
                                        />
                                    )}
                                    {isSnippet && (
                                        <ChatInputsSnippetsPane
                                            isSnippet={isSnippet}
                                            textMessage={textMessage}
                                            setTextMessage={setTextMessage}
                                            handleGetPaginatedSnippets={
                                                handleGetPaginatedSnippets
                                            }
                                        />
                                    )}
                                </div>

                                {/* Send Text, audio, stop audio */}
                                <div className="col-auto">
                                    <div className="chat-input-links ms-2 send-button">
                                        <div className="links-list-item">
                                            {textMessage != "" ? (
                                                <Button
                                                    type="button"
                                                    color="success"
                                                    onClick={() => {
                                                        // send text message
                                                        handleSendTextMessage();
                                                        setemojiPicker(false);
                                                        setemojiArray([]);
                                                    }}
                                                    className="text-send waves-effect waves-light"
                                                >
                                                    <i className="ri-send-plane-2-fill align-bottom"></i>
                                                </Button>
                                            ) : (
                                                <>
                                                    {!isRecording ? (
                                                        <>
                                                            {!audioBlob ? (
                                                                /** start recording button */
                                                                <Button
                                                                    type="button"
                                                                    color="success"
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        // start recording

                                                                        handleToggleRecording(
                                                                            e
                                                                        );

                                                                        setemojiPicker(
                                                                            false
                                                                        );
                                                                        setemojiArray(
                                                                            []
                                                                        );
                                                                        // setIsRecording(
                                                                        //     true
                                                                        // );
                                                                    }}
                                                                    className="audio-send waves-effect waves-light"
                                                                >
                                                                    <i className="ri-mic-line align-bottom"></i>
                                                                </Button>
                                                            ) : (
                                                                /** send audio button */
                                                                <Button
                                                                    type="button"
                                                                    color="success"
                                                                    onClick={() => {
                                                                        // send text message

                                                                        setemojiPicker(
                                                                            false
                                                                        );
                                                                        setemojiArray(
                                                                            []
                                                                        );

                                                                        // setIsRecording(
                                                                        //     false
                                                                        // );
                                                                        handleSendAudio();
                                                                    }}
                                                                    className="text-send waves-effect waves-light"
                                                                >
                                                                    <i className="ri-send-plane-2-fill align-bottom"></i>
                                                                </Button>
                                                            )}
                                                        </>
                                                    ) : (
                                                        /** start recording button */
                                                        <Button
                                                            type="button"
                                                            color="success"
                                                            onClick={(e) => {
                                                                // start recording

                                                                handleToggleRecording(
                                                                    e
                                                                );

                                                                setemojiPicker(
                                                                    false
                                                                );
                                                                setemojiArray(
                                                                    []
                                                                );
                                                                // setIsRecording(
                                                                //     true
                                                                // );
                                                            }}
                                                            className="audio-send waves-effect waves-light"
                                                        >
                                                            <i className="ri-mic-line align-bottom"></i>
                                                        </Button>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div
                                className="d-flex text-muted small"
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    toggleSendTemplateModal();
                                }}
                            >
                                {t(
                                    "You can only send template messages to this contact"
                                )}
                            </div>
                        )}
                    </div>
                    {emojiPicker && (
                        <div className="alert pickerEmoji">
                            <Picker
                                //disableSearchBar={true}
                                onEmojiClick={onEmojiClick}
                            />
                        </div>
                    )}
                    <SendImageMessagePane
                        imagePicker={imagePicker}
                        imageFileInput={imageFileInput}
                        setImagePicker={setImagePicker}
                        selectedContact={selectedContact}
                        selectedChannel={selectedChannel}
                        textMessage={textMessage}
                        setTextMessage={setTextMessage}
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                    />
                </div>
            </div>
        </React.Fragment>
    );
};

export default ChatInputsPaneMINE;
