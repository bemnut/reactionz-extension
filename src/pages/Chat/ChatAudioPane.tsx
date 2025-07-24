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
    Progress,
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
//import SimpleRecordButton from "./Audio";
import {
    blobToFile,
    changeAudioMimeType,
    fileToBlob,
    convertWebmToMp3,
} from "./common_functions";

import useAudioRecorder from "react-audio-recorder-hook";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

//import "react-voice-recorder/dist/index.css";
import { useAudioPlayer } from "react-use-audio-player";
import { LiveAudioVisualizer, AudioVisualizer } from "react-audio-visualize";

import ProgressBar from "@ramonak/react-progress-bar";

import { use } from "i18next";

function ChatAudioPane({
    isRecording,
    //setIsRecording,
    mediaRecorder,
    //setMediaRecorder,
    audioBlob,
    // setRecordingTime,
    // setAudioBlob,
    // recordingTime,
    //timerRef,
    recordDuration,
    // RECORDING_MAX_DURATION,
    // handleToggleRecording,
    // audioStream,
    // setAudioStream,
    handleResetClick,
    handleAudioPause,
    handleAudioStart,
    pauseRecord,
}) {
    const selectChatState = (state) => state;
    const chatProperties = createSelector(selectChatState, (state) => ({
        language: state.Layout.language,
    }));
    // Inside your component
    const { language } = useSelector(chatProperties);
    // /

    // const visualizerRef = useRef<HTMLCanvasElement>(null);
    // const [audioControls, setAudioControls] = useState<any>(null);
    // const [audioTime, setAudioTime] = useState(0);
    const [playPosition, setPlayPosition] = useState(0);
    const [audioPositionPercentage, setAudioPositionPercentage] = useState(0);
    const [audioPlayTime, setAudioPlayTime] = useState({
        h: 0,
        m: 0,
        s: 0,
        ms: 0,
    });
    var _useState2 = React.useState(0),
        setMiliseconds = _useState2[1];
    var timer = useRef(null);
    var audioTimer = useRef(null);

    const {
        load,
        play,
        //pause,
        getPosition,
        stop,
        togglePlayPause,
        isPlaying,
        isPaused,
        isStopped,
        error,
        isLoading,
        isReady,
        duration,
    } = useAudioPlayer();

    const startAudioPlayTimer = () => {
        audioTimer.current = setInterval(audioPlayTimer, 100);
    };

    const audioPlayTimer = () => {
        setMiliseconds((prevMiliseconds) => {
            var newMiliseconds = prevMiliseconds + 100;
            var newTime = milisecondsToTime(newMiliseconds);
            setAudioPlayTime(newTime);
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

    const handlePlayAudio = () => {
        isReady && togglePlayPause();
    };

    const formatTime = (recordDuration) => {
        return `${recordDuration?.m
            ?.toString()
            .padStart(1, "0")}:${recordDuration?.s
            ?.toString()
            .padStart(2, "0")}`;
    };

    const startGetPositionTimer = () => {
        timer.current = setInterval(countDown, 100);
    };
    const countDown = () => {
        setPlayPosition(() => {
            return getPosition();
        });
    };

    /** Update Progressbar  */
    useEffect(() => {
        setAudioPositionPercentage(
            Math.round(parseFloat(((playPosition / duration) * 100).toFixed(2)))
        );
    }, [playPosition]);

    // useEffect(() => {
    //     console.log("recordDuration: ", recordDuration);
    // }, [recordDuration]);

    /** Load audio blob */
    useEffect(() => {
        audioBlob &&
            load(URL.createObjectURL(audioBlob), {
                initialVolume: 0.75,
                autoplay: false,
                format: "mp3",
                onplay: () => {
                    startGetPositionTimer();
                    startAudioPlayTimer();
                },
                onstop: () => {
                    clearInterval(timer.current);
                    clearInterval(audioTimer.current);
                    setAudioPlayTime({
                        h: 0,
                        m: 0,
                        s: 0,
                        ms: 0,
                    });
                },
                onpause: () => {
                    clearInterval(audioTimer.current);
                },
                onend: () => {
                    clearInterval(timer.current);
                    clearInterval(audioTimer.current);
                    setAudioPositionPercentage(0);
                    setMiliseconds(0);
                    setAudioPlayTime({
                        h: 0,
                        m: 0,
                        s: 0,
                        ms: 0,
                    });
                },
                onload: () => {},
            });
    }, [audioBlob]);

    // useEffect(() => {
    //     console.log("language: ", language);
    // }, [language]);

    return (
        <div
            className="reactionz-audio-recorder"
            style={{ display: "flex", alignItems: "center" }}
        >
            {isRecording && (
                <div className="timer mx-2">{formatTime(recordDuration)}</div>
            )}
            <div className="audio-visualization">
                {isRecording ? (
                    <>
                        {mediaRecorder && (
                            <LiveAudioVisualizer
                                mediaRecorder={mediaRecorder}
                                width={200}
                                height={20}
                            />
                        )}
                    </>
                ) : audioBlob ? (
                    /** audio controls: play/pause, stop,  */
                    <>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            {/* <AudioVisualizer
                                ref={visualizerRef}
                                blob={audioBlob}
                                width={200}
                                height={20}
                                barWidth={1}
                                gap={0}
                                barColor={"#f76565"}
                            /> */}
                            {/* <Progress
                                animated
                                color="success"
                                striped
                                value={audioPositionPercentage}
                                style={{ height: "4px" }}
                            /> */}
                            <div className="timer mx-1">
                                {`${formatTime(audioPlayTime)}`}
                            </div>
                            <ProgressBar
                                completed={audioPositionPercentage}
                                maxCompleted={100}
                                bgColor="#56bf40"
                                height="3px"
                                isLabelVisible={false}
                                labelColor="#e80909"
                                transitionDuration="1"
                                transitionTimingFunction="ease"
                                dir={language == "IL_he" ? "rtl" : "ltr"}
                                className="audio-progress"
                            />
                            <div className="timer mx-1">
                                {`${formatTime(recordDuration)}`}
                            </div>
                        </div>
                    </>
                ) : (
                    // <VoiceVisualizer controls={audioControls} />
                    ""
                )}
            </div>
            <div className="audio-controls">
                {isRecording ? (
                    // handleAudioPause
                    // handleAudioStart
                    // pauseRecord
                    <>
                        {pauseRecord ? (
                            <Button
                                className="voice-recorder_control-record-button"
                                onClick={handleAudioStart}
                            >
                                <i className="ri-play-fill align-bottom"></i>
                            </Button>
                        ) : (
                            <Button
                                className="voice-recorder_control-pauses-button"
                                onClick={handleAudioPause}
                            >
                                <i className="ri-pause-line align-bottom"></i>
                            </Button>
                        )}
                    </>
                ) : audioBlob ? (
                    /** audio controls: play/pause, stop,  */
                    <Button
                        className="voice-recorder_control-play-button"
                        onClick={handlePlayAudio}
                    >
                        <i
                            className={classnames("ri", {
                                "ri-play-fill align-bottom":
                                    isPaused || !isPlaying,
                                "ri-pause-line align-bottom": isPlaying,
                            })}
                            // className={classnames("ri ", {
                            //     "ri-arrow-up-s-line": !chatInputMoreItems,
                            //     "ri-arrow-down-s-line": chatInputMoreItems,
                            // })}
                            //className="ri-play-fill align-bottom"
                        ></i>
                    </Button>
                ) : (
                    // start-record Record
                    // <Button
                    //     className="voice-recorder_control-close-button"
                    //     onClick={handleToggleRecording}
                    // >
                    //     <i className="ri-play-large-fill align-bottom"></i>
                    // </Button>
                    ""
                )}
                {!isRecording && (
                    <Button
                        className="voice-recorder_control-reset-button"
                        onClick={() => {
                            // setIsRecording(false);
                            // setAudioBlob(null);
                            handleResetClick();
                        }}
                    >
                        {" "}
                        <i className="ri-close-fill align-bottom"></i>
                    </Button>
                )}
            </div>
        </div>
    );
}

export default ChatAudioPane;
