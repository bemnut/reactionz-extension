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
    changeFileState as onChangeFileState,
    getMessageSnippets as onGetMessageSnippetsApi,
    changeMessageSnippet as onChangeMessageSnippetApi,
    getUploadStatus as onGetUploadStatusApi,
    changeFileStatusState as changeFileStatusStateAction,
    uploadFile as onUploadFileApi,
    sendAttachment as onSendAttachmentApi,
} from "../../slices/thunks";

import "react-perfect-scrollbar/dist/css/styles.css";
import { createSelector } from "reselect";

import SendImageMessagePane from "./SendImageMessagePane";

import { setReactonzContentTypeHeader } from "../../helpers/api_helper";

import {
    getPageLinksPayload,
    contactFields,
    getFileType,
} from "./common_functions";
let _ = require("lodash-contrib");
import { useTranslation } from "react-i18next";

import ChatAudioPane from "./ChatAudioPane";
import ChatInputsSnippetsPane from "./ChatInputsSnippetsPane";
import ChatInputsReplyMessagePane from "./ChatInputsReplyMessagePane";

//
const ChatInputsPane = ({
    resetAudioComponent,
    setIsAudioMessage,
    selectedChannel,
    selectedContact,
    imagePicker,
    setImagePicker,
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
        file: state.File.file,
        fileStatus: state.File.fileStatus,
    }));
    // Inside your component
    const { file, fileStatus } = useSelector(chatProperties);

    const imageFileInput = useRef<any>();
    const [emojiPicker, setemojiPicker] = useState(false);
    //const [imagePicker, setImagePicker] = useState(false);
    //
    const [sendTemplateModal, setSendTemplateModal] = useState(false);
    const [searchSnippet, setSearchSnippet] = useState<any>("");
    const [contactsFieldDropDown, setContactsFieldDropDown] = useState(false);
    const [emojiArray, setemojiArray] = useState([]);
    /** */
    //const [isRecording, setIsRecording] = useState(false);
    const [audioStream, setAudioStream] = useState(null);
    //const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const timerRef = useRef(null);
    const RECORDING_MAX_DURATION = 240; // 4 minutes in seconds

    //

    //
    const [time, setTime] = React.useState<any>({});
    const [recordDuration, setrecordDuration] = React.useState<any>({});

    var _useState2 = React.useState(0),
        setMiliseconds = _useState2[1];

    const [recording, setRecording] = useState(false);
    const [isRecordingStopped, setIsRecordingStopped] = useState(false);
    const [medianotFound, setMedianotFound] = useState(false);
    const [audios, setAudios] = useState([]);
    const [audioBlob, setAudioBlob] = useState(null);
    const [pauseRecord, setPauseRecord] = useState(false);

    var chunks = useRef([]);
    var mediaRecorder = useRef(null);
    var stream = useRef(null);
    var timer = useRef(null);

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

    /** determine if message is snippet or text type */
    useEffect(() => {
        if (textMessage != "") {
            !isComment && textMessage?.startsWith("/") && setIsSnippet(true);
            !textMessage?.startsWith("/") && setIsSnippet(false);
        } else {
            dispatch(onChangeMessageSnippetApi([]));
            setIsSnippet(false);
        }
    }, [textMessage]);

    /** SNIPPETS */

    /** get snippets */
    useEffect(() => {
        isSnippet && dispatch(onGetMessageSnippetsApi({}));
    }, [isSnippet]);

    /** search snippets */
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

    /** get paginated snippets */
    const handleGetPaginatedSnippets = (link, filter) => {
        const payload = getPageLinksPayload(link, filter);

        dispatch(onGetMessageSnippetsApi(payload));
    };

    /** SEND AUDIO ATTACHMENT */

    /** get file uuid from file upload and call file upload status */
    useEffect(() => {
        changeFileStatusStateAction(null);
        file?.upload_uuid && dispatch(onGetUploadStatusApi(file?.upload_uuid));
    }, [file]);

    /** send audio attachment if the status is completed */
    useEffect(() => {
        (fileStatus?.status == "pending" ||
            fileStatus?.status == "processing") &&
            selectedFile &&
            file?.upload_uuid &&
            dispatch(onGetUploadStatusApi(file?.upload_uuid));
        if (
            fileStatus?.status == "completed" &&
            fileStatus?.file_url &&
            selectedContact?.id &&
            selectedChannel?.id &&
            selectedFile
        ) {
            dispatch(
                onSendAttachmentApi({
                    contactId: selectedContact?.id,
                    channelId: selectedChannel?.id,
                    message: {
                        type: "attachment",
                        attachment: {
                            type: getFileType(selectedFile),
                            url: fileStatus?.file_url,
                        },
                    },
                })
            );
            setSelectedFile(null);
            dispatch(onChangeFileState(null));
            dispatch(changeFileStatusStateAction(null));
        }
        //setTimeout(function () {}, 5000);
        // console.log("selectedContact: ", selectedContact);
        // console.log("selectedChannel: ", selectedChannel);
        // console.log("selectedFile: ", selectedFile);
        // console.log("file: ", file);
        // console.log("fileStatus: ", fileStatus);
    }, [fileStatus, selectedFile]);

    // useEffect(() => {
    //     console.log("selectedFile: ", selectedFile);
    // }, [selectedFile]);

    /** handle send audio message */
    const handleSendAudio = async () => {
        if (audioBlob) {
            setIsAudioMessage(true);
            dispatch(onChangeFileState(null));
            // reset content type to multipart/form-data
            setReactonzContentTypeHeader("form");

            // create and set the form data
            const formData = new FormData();
            const convertedAudioFile = new File([audioBlob], "voice.mp3", {
                type: "audio/mp3",
            });
            // console.log("converted file: ", convertedAudioFile);
            // console.log("audioBlob: ", audioBlob);

            convertedAudioFile && setSelectedFile(convertedAudioFile);

            //handleSendTextMessage();

            convertedAudioFile && formData.append("file", convertedAudioFile);
            convertedAudioFile && formData.append("is_recording", "true");

            // upload the file
            dispatch(onUploadFileApi(formData));

            // reset content type to json
            setReactonzContentTypeHeader();

            //
            handleResetClick({});
        }
    };

    /** trigger send message on "ENTER" key press */
    const onKeyPress = (e) => {
        const { key, value } = e;
        if (key === "Enter") {
            e.preventDefault();
            //setTextMessage(value);
            handleSendTextMessage();
        }
    };

    // emoji

    /** add emoji to message */
    const onEmojiClick = (event, emojiObject) => {
        setemojiArray([...emojiArray, emojiObject.emoji]);
        let emoji = [...emojiArray, emojiObject.emoji].join(" ");
        setTextMessage(textMessage + event.emoji);
        setemojiPicker(!emojiPicker);
    };

    /** toggle comment */
    const toggleIsComment = () => {
        setIsComment(!isComment);
    };

    /** handle image paste on message */
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

    //
    const handleToggleRecording = (event) => {
        //event.preventDefault();
        if (recording) {
            stopRecording(event);
            //console.log("recording: ", recording);
        } else {
            startRecording(event);
            //console.log("recording: ", recording);
        }
    };

    //////////////////////////////////////////////////////////////
    /** media recorder api  */
    const _ref: any = {
        //record: true,
        mimeTypeToUseWhenRecording: `audio/mp4`, // For specific mimetype.
    };
    const audioType = "audio/*";
    const // _ref$hideHeader = _ref.hideHeader,
        //     hideHeader = _ref$hideHeader === void 0 ? false : _ref$hideHeader,
        _ref$mimeTypeToUseWhe = _ref.mimeTypeToUseWhenRecording,
        mimeTypeToUseWhenRecording =
            _ref$mimeTypeToUseWhe === void 0 ? null : _ref$mimeTypeToUseWhe;
    // _ref$handleCountDown = _ref.handleCountDown,
    // handleCountDown =
    //     _ref$handleCountDown === void 0
    //         ? function () {}
    //         : _ref$handleCountDown,
    // handleAudioStop = _ref.handleAudioStop,
    // handleAudioUpload = _ref.handleAudioUpload,
    // handleReset = _ref.handleReset,
    // showUIAudio = _ref.showUIAudio,
    // title = _ref.title,
    // audioURL = _ref.audioURL,
    // disableFullUI = _ref.disableFullUI,
    // uploadButtonDisabled = _ref.uploadButtonDisabled;

    useEffect(function () {
        return function () {
            clearInterval(timer.current);
        };
    }, []);
    const startTimer = () => {
        timer.current = setInterval(countDown, 100);
    };
    const countDown = () => {
        setMiliseconds((prevMiliseconds) => {
            var newMiliseconds = prevMiliseconds + 100;
            var newTime = milisecondsToTime(newMiliseconds);
            setTime(newTime);
            setrecordDuration(newTime);
            //handleCountDown(newTime);
            return newMiliseconds;
        });
    };
    const milisecondsToTime = (milisecs) => {
        var secs = milisecs / 1000;
        var hours = Math.floor(secs / (60 * 60));
        var divisor_for_minutes = secs % (60 * 60);
        var minutes = Math.floor(divisor_for_minutes / 60);
        var divisor_for_seconds = divisor_for_minutes % 60;
        var seconds = Math.ceil(divisor_for_seconds);
        return {
            h: hours,
            m: minutes,
            s: seconds,
            ms: milisecs,
        };
    };
    const saveAudio = () => {
        var blob = new Blob(chunks.current, {
            type: audioType,
        });
        var audioURL = window.URL.createObjectURL(blob);
        setAudios([audioURL]);
        setAudioBlob(blob);
        // handleAudioStop({
        //     url: audioURL,
        //     blob: blob,
        //     chunks: chunks.current,
        //     duration: time,
        // });
    };
    const initRecorder = () => {
        try {
            // navigator.getUserMedia =
            //     navigator.getUserMedia ||
            //     navigator.webkitGetUserMedia ||
            //     navigator.mozGetUserMedia ||
            //     navigator.msGetUserMedia;

            var _temp2 = (function () {
                if (navigator.mediaDevices) {
                    return Promise.resolve(
                        navigator.mediaDevices.getUserMedia({
                            audio: true,
                        })
                    ).then(function (_navigator$mediaDevic) {
                        stream.current = _navigator$mediaDevic;
                        mediaRecorder.current = new MediaRecorder(
                            stream.current,
                            {
                                mimeType:
                                    mimeTypeToUseWhenRecording || undefined,
                            }
                        );

                        mediaRecorder.current.ondataavailable = function (e) {
                            if (e.data && e.data.size > 0) {
                                chunks.current.push(e.data);
                            }
                        };
                    });
                } else {
                    setMedianotFound(true);
                    console.log("Media Devices will work only with SSL.....");
                }
            })();

            return Promise.resolve(
                _temp2 && _temp2.then ? _temp2.then(function () {}) : void 0
            );
        } catch (e) {
            return Promise.reject(e);
        }
    };
    const startRecording = (e) => {
        try {
            e.preventDefault();
            chunks.current = [];
            timerRef.current = 0;
            return Promise.resolve(initRecorder()).then(function () {
                mediaRecorder.current.start(10);
                startTimer();
                setRecording(true);
                setRecordingTime(0);
                // timerRef.current = setInterval(() => {
                //     setRecordingTime((prevTime) => {
                //         if (prevTime >= RECORDING_MAX_DURATION - 1) {
                //             stopRecording(e);
                //             return RECORDING_MAX_DURATION;
                //         }
                //         return prevTime + 1;
                //     });
                // }, 1000);
            });
        } catch (e) {
            return Promise.reject(e);
        }
    };
    const stopRecording = (e) => {
        e.preventDefault();
        clearInterval(timer.current);
        setTime({});
        setMiliseconds(0);

        if (stream.current.getAudioTracks) {
            var tracks = stream.current.getAudioTracks();
            tracks.forEach((track) => {
                track.stop();
            });
        } else {
            console.log("No Tracks Found");
        }

        mediaRecorder.current.stop();
        setRecording(false);
        setIsRecordingStopped(true);
        setPauseRecord(false);
        saveAudio();
    };
    const handleAudioPause = (e) => {
        e.preventDefault();
        clearInterval(timer.current);
        mediaRecorder.current.pause();
        setPauseRecord(true);
    };
    const handleAudioStart = (e) => {
        e.preventDefault();
        startTimer();
        mediaRecorder.current.resume();
        setPauseRecord(false);
    };
    const handleResetClick = (e) => {
        if (recording) {
            stopRecording(e);
        }

        //setSelectedFile(null);
        setIsRecordingStopped(true);
        setTime({});
        setrecordDuration({});
        setMiliseconds(0);
        setRecording(false);
        setMedianotFound(false);
        setAudios([]);
        setAudioBlob(null);
        //handleReset();
        chunks.current = [];
        mediaRecorder.current = null;
        stream.current = null;
        //console.log("handleResetClick run");
    };

    useEffect(() => {
        resetAudioComponent && handleResetClick({});
    }, [resetAudioComponent]);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////

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
                                {!recording && !audioBlob && !isComment && (
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
                                {!recording && !audioBlob && (
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
                                {!recording && !audioBlob && !isComment && (
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

                                    {!recording && !audioBlob ? (
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
                                        <ChatAudioPane
                                            isRecording={recording}
                                            //setIsRecording={setRecording}
                                            mediaRecorder={
                                                mediaRecorder?.current
                                            }
                                            //setMediaRecorder={setMediaRecorder}
                                            audioBlob={audioBlob}
                                            //setRecordingTime={setRecordingTime}
                                            //setAudioBlob={setAudioBlob}
                                            //recordingTime={recordingTime}
                                            //timerRef={timerRef}
                                            //recordTime={time}
                                            recordDuration={recordDuration}
                                            // RECORDING_MAX_DURATION={
                                            //     RECORDING_MAX_DURATION
                                            // }
                                            // handleToggleRecording={
                                            //     handleToggleRecording
                                            // }
                                            //audioStream={audioStream}
                                            //setAudioStream={setAudioStream}
                                            handleResetClick={handleResetClick}
                                            handleAudioPause={handleAudioPause}
                                            handleAudioStart={handleAudioStart}
                                            pauseRecord={pauseRecord}
                                        />
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
                                            {textMessage != "" || isComment ? (
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
                                                    {!recording ? (
                                                        <>
                                                            {!audioBlob ? (
                                                                /** start recording button */
                                                                <>
                                                                    {imagePicker ? (
                                                                        <Button
                                                                            type="button"
                                                                            color="success"
                                                                            onClick={() => {
                                                                                // send text message
                                                                                handleSendTextMessage();
                                                                                setemojiPicker(
                                                                                    false
                                                                                );
                                                                                setemojiArray(
                                                                                    []
                                                                                );
                                                                            }}
                                                                            className="text-send waves-effect waves-light"
                                                                        >
                                                                            <i className="ri-send-plane-2-fill align-bottom"></i>
                                                                        </Button>
                                                                    ) : (
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
                                                                    )}
                                                                </>
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
                                                        /** stop recording button */
                                                        <Button
                                                            type="button"
                                                            color="danger"
                                                            onClick={(e) => {
                                                                // stop recording

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
                                                            <i className="ri-stop-fill align-bottom"></i>
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

export default ChatInputsPane;
