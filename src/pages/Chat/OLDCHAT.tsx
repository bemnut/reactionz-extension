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
//import SimpleRecordButton from "./Audio";
import {
    blobToFile,
    changeAudioMimeType,
    fileToBlob,
    convertWebmToMp3,
} from "./common_functions";
// import { VoiceRecorder } from "react-voice-recorder-player";

import useAudioRecorder from "react-audio-recorder-hook";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

// import { Recorder } from "react-voice-recorder";
// import "react-voice-recorder/dist/index.css";
//
const OLDChatContent = ({
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
        user: state.Login.user,
        messages: state.Message.messages,
        messageSnippets: state.Message.messageSnippets,
        isMessageSent: state.Message.isMessageSent,
        channels: state.Channel.channels,
        users: state.User.users,
        file: state.File.file,
        fileStatus: state.File.fileStatus,
    }));
    // Inside your component
    const {
        user,
        messages,
        messageSnippets,
        isMessageSent,
        channels,
        users,
        file,
        fileStatus,
    } = useSelector(chatProperties);

    const imageFileInput = useRef<any>();

    const [sortedMessages, setSortedMessages] = useState([]);
    const [messageBox, setMessageBox] = useState(null);
    const [textMessage, setTextMessage] = useState("");
    const [search_Menu, setsearch_Menu] = useState(false);
    const [channelMenu, setChannelMenu] = useState(false);
    const [agentMenu, setAgentMenu] = useState(false);

    const [replyMessage, setReplyMessage] = useState<any>("");
    const [emojiPicker, setemojiPicker] = useState(false);
    const [imagePicker, setImagePicker] = useState(false);

    //
    const [sendTemplateModal, setSendTemplateModal] = useState(false);

    const [selectedChannel, setSelectedChannel] = useState(null);
    const [selectedAgent, setSelectedAgent] = useState(null);

    const [canSendMessage, setCanSendMessage] = useState(false);

    const [previous, setPrevious] = useState(false);
    const [next, setNext] = useState(false);

    const [searchUser, setSearchUser] = useState<any>("");
    const [selectedFile, setSelectedFile] = useState(null);

    const [isComment, setIsComment] = useState(false);

    const [zoomedImage, setZoomedImage] = useState(false);
    const [zoomedImageURL, setZoomedImageURL] = useState<any>(null);
    const [isSnippet, setIsSnippet] = useState(false);
    const [searchSnippet, setSearchSnippet] = useState<any>("");
    const [chatInputMoreItems, setChatInputMoreItems] = useState(false);
    const [contactsFieldDropDown, setContactsFieldDropDown] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedAudioBlob, setRecordedAudioBlob] = useState<any>(null);

    const [audioRecordState, setAudioRecordState] = useState({
        url: null,
        blob: null,
        chunks: null,
        duration: {
            h: 0,
            m: 0,
            s: 0,
        },
    });

    // const [isRecording, setIsRecording] = useState(false);
    // const [audioURL, setAudioURL] = useState("");
    // const [mediaRecorder, setMediaRecorder] = useState(null);
    // const [audioBlob, setAudioBlob] = useState(null);
    // const startRecording = async () => {
    //     setIsRecording(true);
    //     const stream = await navigator.mediaDevices.getUserMedia({
    //         audio: true,
    //     });
    //     const recorder = new MediaRecorder(stream);

    //     const chunks = [];

    //     recorder.ondataavailable = (event) => {
    //         chunks.push(event.data);
    //     };

    //     recorder.onstop = () => {
    //         const blob = new Blob(chunks, { type: "audio/webm" });
    //         setAudioBlob(blob);
    //         const url = URL.createObjectURL(blob);
    //         setAudioURL(url);
    //         setIsRecording(false);
    //     };

    //     recorder.start();
    //     setMediaRecorder(recorder);
    // };

    // useEffect(() => {
    //     console.log("selectedContact: ", selectedContact);
    // }, [selectedContact]);
    // useEffect(() => {
    //     console.log("user: ", user);
    // }, [user]);

    // useEffect(() => {
    //     if (image) {
    //         var options = {
    //             width: 200,
    //             zoomWidth: 250,
    //             offset: { vertical: 0, horizontal: 10 },
    //         };
    //         new ImageZoom(document.getElementById("img-container"), options);
    //         // const zoomist = new Zoomist("#img-container", {
    //         //     slider: true,
    //         //     zoomer: true,
    //         // });
    //     }
    // }, [sortedMessages]);

    // Get available channels

    useEffect(() => {
        selectedContact &&
            channels &&
            setSelectedChannel(
                channels.find(
                    (channel) =>
                        channel.id == selectedContact?.lastInteractedChannel?.id
                )
            );
        selectedContact && setSelectedAgent(selectedContact?.assignedTo);
    }, [channels, selectedContact]);

    // load messages if message is sent
    useEffect(() => {
        // selectedContact &&
        //     isMessageSent &&
        //     dispatch(onGetContactConversationsApi(selectedContact.id));
    }, [isMessageSent]);

    // sort the messages by date
    useEffect(() => {
        if (!isEmpty(messages?.data)) {
            setSortedMessages(sortBy(messages?.data, "status.timestamp"));
        } else {
            setSortedMessages([]);
        }
        setPrevious(false);
        setNext(false);
    }, [messages]);

    //

    //Toggle SendTemplateModal
    const toggleSendTemplateModal = () => {
        setSendTemplateModal(!sendTemplateModal);
    };

    //Toggle Search Menus
    const toggleSearch = () => {
        setsearch_Menu(!search_Menu);
    };

    //Toggle Channel Menus
    const toggleChannelMenu = () => {
        setChannelMenu(!channelMenu);
    };

    //Toggle Agent Menus
    const toggleAgentMenu = () => {
        setAgentMenu(!agentMenu);
    };

    //Toggle contacts field drop down
    const toggleContactsFieldDropDown = () => {
        setContactsFieldDropDown(!contactsFieldDropDown);
    };

    const scrollToBottom = useCallback(() => {
        if (messageBox) {
            setPrevious(false);
            setNext(false);
            //messageBox.scrollTop = messageBox.scrollHeight + 1000;
            setTimeout(() => {
                messageBox.scrollTop = messageBox.scrollHeight - 3;
                messageBox.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                    inline: "nearest",
                });
            }, 1000);
        }
    }, [messageBox]);

    useEffect(() => {
        if (!isEmpty(sortedMessages)) scrollToBottom();
    }, [sortedMessages]);

    useEffect(() => {
        if (searchUser == "") {
            dispatch(onGetUsersApi({}));
        } else {
            dispatch(onGetUsersApi({ search: searchUser }));
        }
    }, [searchUser]);

    useEffect(() => {
        if (!zoomedImage) {
            const container = document.getElementById(
                "chat-conversation-content"
            );
            if (container) {
                setTimeout(() => {
                    container.scrollTop = container.scrollHeight - 3;
                    container.scrollIntoView({
                        behavior: "smooth",
                        block: "end",
                        inline: "nearest",
                    });
                }, 1000);
            }
        }
    }, [zoomedImage]);

    useEffect(() => {
        if (!isEmpty(sortedMessages)) {
            const incomingMsg = sortedMessages?.filter(
                (msg) => msg?.traffic == "incoming"
            );
            if (!isEmpty(incomingMsg)) {
                const lastElement = incomingMsg[incomingMsg.length - 1];
                let hours = moment().diff(
                    moment.unix(lastElement?.status?.timestamp).local(),
                    "hours"
                );

                if (hours < 24) {
                    setCanSendMessage(true);
                }
            }

            //
        }
    }, [sortedMessages]);

    useEffect(() => {
        if (zoomedImage) {
            // var options = {
            //     width: 200,
            //     zoomWidth: 250,
            //     offset: { vertical: 0, horizontal: 10 },
            // };
            // new ImageZoom(
            //     img,
            //     options
            // );
            // const zoomist = new Zoomist("#img-container", {
            //     slider: true,
            //     zoomer: true,
            // });

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

    //Search Message
    const searchMessages = () => {
        var searchInput, searchFilter, searchUL, searchLI, a, txtValue;
        searchInput = document.getElementById("searchMessage");
        searchFilter = searchInput.value.toUpperCase();
        searchUL = document.getElementById("users-conversation");
        searchLI = searchUL.getElementsByTagName("li");
        Array.prototype.forEach.call(searchLI, function (search) {
            a = search.getElementsByTagName("p")[0]
                ? search.getElementsByTagName("p")[0]
                : "";
            txtValue =
                a.textContent || a.innerText
                    ? a.textContent || a.innerText
                    : "";
            if (txtValue.toUpperCase().indexOf(searchFilter) > -1) {
                search.style.display = "";
            } else {
                search.style.display = "none";
            }
        });
    };

    // Copy Message
    const handleCkick = (ele) => {
        var copy = ele
            .closest(".chat-list")
            .querySelector(".ctext-content").innerHTML;
        navigator.clipboard.writeText(copy);

        document.getElementById("copyClipBoard").style.display = "block";
        setTimeout(() => {
            document.getElementById("copyClipBoard").style.display = "none";
        }, 2000);
    };

    // emoji
    const [emojiArray, setemojiArray] = useState([]);

    const onEmojiClick = (event, emojiObject) => {
        setemojiArray([...emojiArray, emojiObject.emoji]);
        let emoji = [...emojiArray, emojiObject.emoji].join(" ");
        setTextMessage(textMessage + event.emoji);
        setemojiPicker(!emojiPicker);
    };

    const handleSendTextMessage = () => {
        if (!isEmpty(selectedChannel) && !isEmpty(selectedContact)) {
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
                    setIsComment(false);
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

    const handleAssignAgentToContact = (selectedContact, user) => {
        dispatch(onChangeIsContactUpdatedApi(false));
        selectedContact &&
            user &&
            dispatch(
                onAssignAgentToContactApi({
                    contactId: selectedContact.id,
                    assignTo: user.id,
                })
            );
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
        if (recordedAudioBlob) {
            console.log("recordedAudioBlob: ", recordedAudioBlob);
            //dispatch(onUploadFileApi({}));
            //setRecordedAudioBlob(null);
            //             onGetUploadStatusApi
            // changeFileStatusStateAction
            // onUploadFileApi
            dispatch(onChangeFileState(null));
            // reset content type to multipart/form-data
            setReactonzContentTypeHeader("form");

            // create and set the form data
            const formData = new FormData();
            const convertedAudioFile = new File(
                [recordedAudioBlob],
                "voice.mp4",
                {
                    type: "audio/mp4",
                }
            );
            console.log("converted file: ", convertedAudioFile);

            // const url = URL.createObjectURL(recordedAudioBlob);
            // const tmp = new Audio(url); //passing your state (hook)
            // tmp.play();

            // const theblob: any = await convertWebmToMp3(recordedAudioBlob);
            // console.log("theblob file: ", theblob);

            // const ffmpeg = new FFmpeg();

            // await ffmpeg.load();

            // await ffmpeg.writeFile(
            //     "sound.mp3",
            //     await fetchFile(convertedAudioFile)
            // );
            // await ffmpeg.exec(["-i", "sound.mp3", "output.mp3"]);
            // const data: any = await ffmpeg.readFile("output.mp3");
            // console.log("data: ", data);
            // const outputBlob = new Blob([data.buffer], { type: "audio/mp3" });
            // console.log("outputBlob: ", outputBlob);

            convertedAudioFile && formData.append("file", convertedAudioFile);
            convertedAudioFile && formData.append("is_recording", "true");

            // upload the file
            dispatch(onUploadFile(formData));

            // reset content type to json
            setReactonzContentTypeHeader();
        }
    };

    const handleAudioStop = (data) => {
        console.log(data);
        setAudioRecordState(data);
        setRecordedAudioBlob(data.blob);
        setIsRecording(false);
    };

    const handleAudioUpload = (file) => {
        console.log(file);
    };

    const handleCountDown = (data) => {
        console.log(data);
    };

    const handleReset = () => {
        setAudioRecordState({
            url: null,
            blob: null,
            chunks: null,
            duration: {
                h: 0,
                m: 0,
                s: 0,
            },
        });
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
                                <div className="px-3 py-2 pb-4 user-chat-topbar">
                                    <Row className="align-items-center">
                                        <Col sm={4} xs={8}>
                                            <div className="d-flex align-items-center">
                                                <div className="flex-shrink-0 d-block d-lg-none  user-chat-remove">
                                                    <Link
                                                        to="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            backToUserChat();
                                                            setTextMessage("");
                                                            setSelectedAgent(
                                                                null
                                                            );
                                                            setSelectedChannel(
                                                                null
                                                            );
                                                            setCanSendMessage(
                                                                false
                                                            );
                                                            setIsComment(false);
                                                            setChatInputMoreItems(
                                                                false
                                                            );
                                                        }}
                                                        className=" fs-18 p-1"
                                                    >
                                                        <i className="ri-arrow-left-s-line align-bottom"></i>
                                                    </Link>
                                                </div>
                                                <div className="flex-grow-1 overflow-hidden">
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-shrink-0 chat-user-img online user-own-img align-self-center me-3 ms-0">
                                                            {isEmpty(
                                                                selectedContact?.profilePicture
                                                            ) ? (
                                                                <img
                                                                    src={
                                                                        userDummayImage
                                                                    }
                                                                    className="rounded-circle avatar-xs"
                                                                    alt=""
                                                                />
                                                            ) : (
                                                                <img
                                                                    src={
                                                                        selectedContact?.profilePicture
                                                                    }
                                                                    className="rounded-circle avatar-xs"
                                                                    alt=""
                                                                />
                                                            )}
                                                            {/* <span className="user-status"></span> */}
                                                            {countries &&
                                                                selectedContact && (
                                                                    <div className="country-flag">
                                                                        {countries &&
                                                                            getCountryByAreaCode(
                                                                                countries,
                                                                                getPhoneNumberInfo(
                                                                                    selectedContact?.phone
                                                                                )
                                                                                    ?.phoneInfo
                                                                                    ?.areaCode
                                                                            ) && (
                                                                                <img
                                                                                    src={getCountryFlag(
                                                                                        getCountryByAreaCode(
                                                                                            countries,
                                                                                            getPhoneNumberInfo(
                                                                                                selectedContact?.phone
                                                                                            )
                                                                                                ?.phoneInfo
                                                                                                ?.areaCode
                                                                                        )
                                                                                            ?.iso2
                                                                                    )}
                                                                                    className=""
                                                                                    alt=""
                                                                                />
                                                                            )}
                                                                    </div>
                                                                )}
                                                        </div>
                                                        <div className="flex-grow-1 overflow-hidden">
                                                            <div className="d-flex align-items-baseline">
                                                                <h5 className="text-truncate mb-0 fs-16">
                                                                    <a
                                                                        className="text-reset username"
                                                                        data-bs-toggle="offcanvas"
                                                                        //href="#userProfileCanvasExample"
                                                                        aria-controls="userProfileCanvasExample"
                                                                    >
                                                                        {
                                                                            selectedContact?.firstName
                                                                        }
                                                                    </a>
                                                                </h5>
                                                            </div>
                                                            {/* <p className="text-truncate text-muted fs-14 mb-0 userStatus">
                                                            <small>
                                                                Online
                                                            </small>
                                                        </p> */}
                                                            <div className="text-truncate text-muted fs-14 mb-0 user-phone">
                                                                {
                                                                    selectedContact?.phone
                                                                }
                                                            </div>
                                                            <div className="text-truncate text-muted fs-14 mb-0 user-assigned-to">
                                                                <Dropdown
                                                                    isOpen={
                                                                        agentMenu
                                                                    }
                                                                    toggle={
                                                                        toggleAgentMenu
                                                                    }
                                                                    style={{
                                                                        position:
                                                                            "absolute",
                                                                    }}
                                                                >
                                                                    <DropdownToggle
                                                                        className=""
                                                                        tag="div"
                                                                    >
                                                                        <div
                                                                            className="d-flex"
                                                                            style={{
                                                                                alignItems:
                                                                                    "center",
                                                                                cursor: "pointer",
                                                                            }}
                                                                        >
                                                                            <div>
                                                                                {t(
                                                                                    "Assigned To: "
                                                                                )}
                                                                                &nbsp;
                                                                            </div>
                                                                            <div className="text-success">
                                                                                {selectedAgent?.name
                                                                                    ? ` ${selectedAgent?.name}`
                                                                                    : ` nobody`}
                                                                            </div>
                                                                        </div>
                                                                    </DropdownToggle>
                                                                    <DropdownMenu
                                                                        className="p-0 dropdown-menu-end dropdown-menu-lg"
                                                                        style={{
                                                                            top: "25rem",
                                                                        }}
                                                                    >
                                                                        <>
                                                                            <div className="p-2">
                                                                                <Input
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setSearchUser(
                                                                                            e
                                                                                                .target
                                                                                                .value
                                                                                        );
                                                                                    }}
                                                                                    id="searchUser"
                                                                                    type="text"
                                                                                    className="form-control bg-light border-light"
                                                                                    placeholder={t(
                                                                                        `Search User...`
                                                                                    )}
                                                                                    value={
                                                                                        searchUser
                                                                                            ? searchUser
                                                                                            : ""
                                                                                    }
                                                                                />
                                                                            </div>
                                                                            <div
                                                                                className="users"
                                                                                style={{
                                                                                    maxHeight:
                                                                                        "200px",
                                                                                    overflow:
                                                                                        "auto",
                                                                                    left: "0",
                                                                                    right: "auto",
                                                                                }}
                                                                            >
                                                                                {users
                                                                                    ?.links
                                                                                    ?.prev && (
                                                                                    <>
                                                                                        <div
                                                                                            className="d-flex"
                                                                                            style={{
                                                                                                justifyContent:
                                                                                                    "center",
                                                                                                marginBottom:
                                                                                                    "1rem",
                                                                                            }}
                                                                                        >
                                                                                            <Button
                                                                                                color=""
                                                                                                id="previousPage"
                                                                                                className="btn btn-soft-success btn-sm shadow-none me-2"
                                                                                                onClick={() => {
                                                                                                    dispatch(
                                                                                                        onGetUsersApi(
                                                                                                            getPageLinksPayload(
                                                                                                                users
                                                                                                                    ?.links
                                                                                                                    ?.prev,
                                                                                                                searchUser
                                                                                                            )
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
                                                                                            {t(
                                                                                                "Previous List"
                                                                                            )}
                                                                                        </UncontrolledTooltip>
                                                                                    </>
                                                                                )}
                                                                                {users?.data?.map(
                                                                                    (
                                                                                        user
                                                                                    ) => (
                                                                                        <DropdownItem
                                                                                            onClick={() => {
                                                                                                setSelectedAgent(
                                                                                                    user
                                                                                                );
                                                                                                handleAssignAgentToContact(
                                                                                                    selectedContact,
                                                                                                    user
                                                                                                );
                                                                                            }}
                                                                                        >
                                                                                            {
                                                                                                user.name
                                                                                            }
                                                                                        </DropdownItem>
                                                                                    )
                                                                                )}
                                                                            </div>
                                                                            {users
                                                                                ?.links
                                                                                ?.next && (
                                                                                <>
                                                                                    <div
                                                                                        className="d-flex"
                                                                                        style={{
                                                                                            justifyContent:
                                                                                                "center",
                                                                                            marginBottom:
                                                                                                "1rem",
                                                                                        }}
                                                                                    >
                                                                                        <Button
                                                                                            color=""
                                                                                            id="nextPage"
                                                                                            className="btn btn-soft-success btn-sm shadow-none me-2"
                                                                                            onClick={() => {
                                                                                                dispatch(
                                                                                                    onGetUsersApi(
                                                                                                        getPageLinksPayload(
                                                                                                            users
                                                                                                                ?.links
                                                                                                                ?.next,
                                                                                                            searchUser
                                                                                                        )
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
                                                                                        {t(
                                                                                            "Next List"
                                                                                        )}
                                                                                    </UncontrolledTooltip>
                                                                                </>
                                                                            )}
                                                                        </>
                                                                    </DropdownMenu>
                                                                </Dropdown>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col sm={8} xs={4}>
                                            <ul className="list-inline user-chat-nav text-end mb-0">
                                                <li className="list-inline-item channel m-0">
                                                    <Dropdown
                                                        isOpen={channelMenu}
                                                        toggle={
                                                            toggleChannelMenu
                                                        }
                                                    >
                                                        <DropdownToggle
                                                            className="btn btn-ghost-secondary btn-icon"
                                                            tag="button"
                                                        >
                                                            {selectedChannel?.logo ? (
                                                                <img
                                                                    src={
                                                                        selectedChannel.logo
                                                                    }
                                                                    className="rounded-circle avatar-xxxs"
                                                                    alt=""
                                                                />
                                                            ) : (
                                                                <div
                                                                    style={{
                                                                        lineHeight:
                                                                            "1",
                                                                        fontSize:
                                                                            "9px",
                                                                    }}
                                                                >
                                                                    {t(
                                                                        "Select a channel"
                                                                    )}
                                                                </div>
                                                            )}
                                                        </DropdownToggle>
                                                        <DropdownMenu
                                                            className="p-0 dropdown-menu-end dropdown-menu-lg"
                                                            style={{
                                                                minWidth:
                                                                    "12rem",
                                                            }}
                                                        >
                                                            {channels?.map(
                                                                (channel) =>
                                                                    channel?.name?.includes(
                                                                        "WhatsApp"
                                                                    ) && (
                                                                        <DropdownItem
                                                                            className="py-0"
                                                                            onClick={() =>
                                                                                setSelectedChannel(
                                                                                    channel
                                                                                )
                                                                            }
                                                                        >
                                                                            <div
                                                                                className="d-flex"
                                                                                style={{
                                                                                    alignItems:
                                                                                        "center",
                                                                                    flexWrap:
                                                                                        "unset",
                                                                                }}
                                                                            >
                                                                                {channel?.logo && (
                                                                                    <img
                                                                                        src={
                                                                                            channel.logo
                                                                                        }
                                                                                        className="rounded-circle avatar-xxxs "
                                                                                        alt=""
                                                                                    />
                                                                                )}
                                                                                <div className="mx-2">
                                                                                    {
                                                                                        channel.name
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </DropdownItem>
                                                                    )
                                                            )}
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                </li>
                                                <li className="list-inline-item search-messages m-0">
                                                    <Dropdown
                                                        isOpen={search_Menu}
                                                        toggle={toggleSearch}
                                                    >
                                                        <DropdownToggle
                                                            className="btn btn-ghost-secondary btn-icon"
                                                            tag="button"
                                                        >
                                                            <FeatherIcon
                                                                icon="search"
                                                                className="icon-sm"
                                                            />
                                                        </DropdownToggle>
                                                        <DropdownMenu className="p-0 dropdown-menu-end dropdown-menu-lg">
                                                            <div className="p-2">
                                                                <div className="search-box">
                                                                    <Input
                                                                        onKeyUp={
                                                                            searchMessages
                                                                        }
                                                                        type="text"
                                                                        className="form-control bg-light border-light"
                                                                        placeholder={t(
                                                                            "Search here..."
                                                                        )}
                                                                        id="searchMessage"
                                                                    />
                                                                    <i className="ri-search-2-line search-icon"></i>
                                                                </div>
                                                            </div>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                </li>

                                                {!selectedChannel ||
                                                    (selectedChannel?.name !=
                                                        "Instagram" && (
                                                        <li className="list-inline-item send-template-modal m-0">
                                                            <Dropdown
                                                                isOpen={
                                                                    sendTemplateModal
                                                                }
                                                                toggle={
                                                                    toggleSendTemplateModal
                                                                }
                                                                className="chat-box-dropdown-menus"
                                                            >
                                                                <DropdownToggle
                                                                    className="btn btn-ghost-secondary btn-icon"
                                                                    tag="button"
                                                                >
                                                                    <FeatherIcon
                                                                        icon="send"
                                                                        className="icon-sm"
                                                                    />
                                                                </DropdownToggle>
                                                                <DropdownMenu
                                                                    style={{
                                                                        minWidth:
                                                                            "17rem",
                                                                    }}
                                                                >
                                                                    {sendTemplateModal && (
                                                                        <SendTemplateMessage
                                                                            selectedContact={
                                                                                selectedContact
                                                                            }
                                                                            toggleSendTemplateModal={
                                                                                toggleSendTemplateModal
                                                                            }
                                                                            selectedChannel={
                                                                                selectedChannel
                                                                            }
                                                                        />
                                                                    )}
                                                                </DropdownMenu>
                                                            </Dropdown>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </Col>
                                    </Row>
                                </div>

                                <div
                                    className="position-relative scrollable"
                                    id="users-chat"
                                    style={{ overflow: "auto" }}
                                >
                                    <div
                                        className="chat-conversation  pb-0"
                                        id="chat-conversation"
                                    >
                                        <PerfectScrollbar
                                            containerRef={(ref) =>
                                                setMessageBox(ref)
                                            }
                                            // onYReachStart={(container) =>
                                            //     console.log("onYReachStart")
                                            // }
                                            // onYReachEnd={(container) =>
                                            //     console.log("onYReachEnd")
                                            // }
                                            id="chat-conversation-content"
                                            className="chat-conversation-content py-2"
                                        >
                                            <div id="elmLoader"></div>
                                            {messages?.links?.next && (
                                                <>
                                                    <div
                                                        className="d-flex"
                                                        style={{
                                                            justifyContent:
                                                                "center",
                                                            marginBottom:
                                                                "1rem",
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
                                                                            messages
                                                                                ?.links
                                                                                ?.next
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
                                                    sortedMessages?.map(
                                                        (message, key) => (
                                                            <li
                                                                className={
                                                                    message.traffic ==
                                                                    "incoming"
                                                                        ? " chat-list left"
                                                                        : "chat-list right"
                                                                }
                                                                key={key}
                                                            >
                                                                <div className="conversation-list">
                                                                    {message.traffic ==
                                                                    "incoming" ? (
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
                                                                            {message
                                                                                ?.sender
                                                                                ?.avatar ? (
                                                                                <img
                                                                                    src={
                                                                                        message
                                                                                            ?.sender
                                                                                            ?.avatar
                                                                                    }
                                                                                    alt={
                                                                                        message
                                                                                            ?.sender
                                                                                            ?.avatar
                                                                                    }
                                                                                    title={
                                                                                        message
                                                                                            ?.sender
                                                                                            ?.name
                                                                                    }
                                                                                />
                                                                            ) : (
                                                                                <img
                                                                                    src={
                                                                                        userDummayImage
                                                                                    }
                                                                                    alt={
                                                                                        message
                                                                                            ?.sender
                                                                                            ?.name
                                                                                    }
                                                                                    title={`${message?.sender?.name}, ${message?.sender?.email}`}
                                                                                />
                                                                            )}
                                                                            <p
                                                                                className="text-muted small line-clamp-1"
                                                                                style={{
                                                                                    maxWidth:
                                                                                        "30px",
                                                                                }}
                                                                            >
                                                                                {
                                                                                    message
                                                                                        ?.sender
                                                                                        ?.name
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    )}

                                                                    <div className="user-chat-content">
                                                                        <div className="ctext-wrap">
                                                                            {message
                                                                                ?.message
                                                                                ?.type ==
                                                                                "attachment" && (
                                                                                <>
                                                                                    {message
                                                                                        ?.message
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
                                                                                            <p className="mb-0 ctext-content px-3 py-2">
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
                                                                                        </div>
                                                                                    )}

                                                                                    {message
                                                                                        ?.message
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
                                                                                        </div>
                                                                                    )}

                                                                                    {message
                                                                                        ?.message
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

                                                                                    {message
                                                                                        ?.message
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
                                                                                            <p className="mb-0 ctext-content px-3 py-2">
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
                                                                                        </div>
                                                                                    )}
                                                                                </>
                                                                            )}

                                                                            {message
                                                                                ?.message
                                                                                ?.type ==
                                                                                "comment" && (
                                                                                <div className="ctext-wrap-content comment">
                                                                                    {message
                                                                                        .message
                                                                                        .text && (
                                                                                        <>
                                                                                            <p className="mb-0 ctext-content px-3 py-2">
                                                                                                {
                                                                                                    message
                                                                                                        .message
                                                                                                        .text
                                                                                                }
                                                                                            </p>
                                                                                        </>
                                                                                    )}
                                                                                </div>
                                                                            )}
                                                                            {message
                                                                                ?.message
                                                                                ?.type ==
                                                                                "text" && (
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
                                                                                        .message
                                                                                        .text && (
                                                                                        <p className="mb-0 ctext-content px-3 py-2">
                                                                                            {
                                                                                                message
                                                                                                    .message
                                                                                                    .text
                                                                                            }
                                                                                        </p>
                                                                                    )}
                                                                                </div>
                                                                            )}
                                                                            {message
                                                                                ?.message
                                                                                ?.type ==
                                                                                "button" &&
                                                                                message
                                                                                    ?.message
                                                                                    ?.buttons ==
                                                                                    null &&
                                                                                message
                                                                                    ?.message
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
                                                                                            <p className="mb-0 ctext-content px-3 py-2">
                                                                                                {
                                                                                                    message
                                                                                                        ?.message
                                                                                                        ?.title
                                                                                                }
                                                                                            </p>
                                                                                        )}
                                                                                    </div>
                                                                                )}
                                                                            {message
                                                                                ?.message
                                                                                ?.type ==
                                                                                "quick_reply" &&
                                                                                !isEmpty(
                                                                                    message
                                                                                        ?.message
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
                                                                                            <p className="mb-0 ctext-content px-3 py-2">
                                                                                                {message
                                                                                                    ?.message
                                                                                                    ?.replies[0] &&
                                                                                                    message
                                                                                                        ?.message
                                                                                                        ?.replies[0]}
                                                                                            </p>
                                                                                        )}
                                                                                    </div>
                                                                                )}
                                                                            {message
                                                                                ?.message
                                                                                ?.type ==
                                                                                "whatsapp_template" && (
                                                                                <div
                                                                                    className="ctext-wrap-content whatsapp_template px-3 py-2"
                                                                                    dir={
                                                                                        message
                                                                                            ?.message
                                                                                            ?.template
                                                                                            ?.languageCode ==
                                                                                            "en_US" ||
                                                                                        message
                                                                                            ?.message
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
                                                                                    {message
                                                                                        ?.message
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
                                                                                    {message
                                                                                        ?.message
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
                                                                                        (
                                                                                            button
                                                                                        ) => (
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
                                                                                            {t(
                                                                                                "Reply"
                                                                                            )}
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
                                                                            message
                                                                                .status
                                                                                .message
                                                                        ) && (
                                                                            <div className="ctext-wrap-content error-message">
                                                                                <p className="mb-1  ctext-content text-muted fs-12 px-3 py-2">
                                                                                    {
                                                                                        JSON.parse(
                                                                                            message
                                                                                                .status
                                                                                                .message
                                                                                        )[0]
                                                                                            .error_data
                                                                                            .details
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                        )}
                                                                        <div className="conversation-name conversation-footer">
                                                                            {message
                                                                                ?.status
                                                                                ?.timestamp && (
                                                                                <small
                                                                                    className="text-muted time"
                                                                                    style={{
                                                                                        direction:
                                                                                            "ltr",
                                                                                    }}
                                                                                >
                                                                                    <>
                                                                                        {moment
                                                                                            .unix(
                                                                                                message
                                                                                                    ?.status
                                                                                                    ?.timestamp
                                                                                            )
                                                                                            .local()
                                                                                            .fromNow()}{" "}
                                                                                    </>
                                                                                </small>
                                                                            )}
                                                                            {message
                                                                                .status
                                                                                .value ==
                                                                                "Failed" && (
                                                                                <span className="text-danger check-message-icon">
                                                                                    <i className="ri-close-line align-bottom"></i>
                                                                                </span>
                                                                            )}
                                                                            {message
                                                                                .status
                                                                                .value ==
                                                                                "Sending" && (
                                                                                <span className="text-muted check-message-icon">
                                                                                    <i className="ri-check-line align-bottom"></i>
                                                                                </span>
                                                                            )}
                                                                            {message
                                                                                .status
                                                                                .value ==
                                                                                "Sent" && (
                                                                                <span className="text-muted check-message-icon">
                                                                                    <i className="ri-check-double-line align-bottom"></i>
                                                                                </span>
                                                                            )}
                                                                            {message
                                                                                .status
                                                                                .value ==
                                                                                "Delivered" && (
                                                                                <span className="text-success check-message-icon">
                                                                                    <i className="ri-check-line align-bottom"></i>
                                                                                </span>
                                                                            )}
                                                                            {message
                                                                                .status
                                                                                .value ==
                                                                                "Read" && (
                                                                                <span className="text-success check-message-icon">
                                                                                    <i className="ri-check-double-line align-bottom"></i>
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        )
                                                    )}
                                            </ul>
                                            {messages?.links?.prev && (
                                                <>
                                                    <div
                                                        className="d-flex"
                                                        style={{
                                                            justifyContent:
                                                                "center",
                                                            marginBottom:
                                                                "1rem",
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
                                                                            messages
                                                                                ?.links
                                                                                ?.prev
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

                                <div
                                    className={classnames(
                                        "chat-input-section  py-1 d-flex",
                                        {
                                            comment: isComment,
                                        }
                                    )}
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
                                                className={classnames(
                                                    "chat-inputs-more-wrapper",
                                                    {
                                                        opened: chatInputMoreItems,
                                                    }
                                                )}
                                                style={{
                                                    width: "100%",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
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
                                                            className={classnames(
                                                                "ri ",
                                                                {
                                                                    "ri-arrow-up-s-line":
                                                                        !chatInputMoreItems,
                                                                    "ri-arrow-down-s-line":
                                                                        chatInputMoreItems,
                                                                }
                                                            )}
                                                        ></i>
                                                    </div>
                                                </div>
                                                {chatInputMoreItems && (
                                                    <div
                                                        className="px-2 py-1"
                                                        style={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "start",
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
                                                                checked={
                                                                    isComment
                                                                        ? true
                                                                        : false
                                                                }
                                                            />
                                                            <Label
                                                                className="form-check-label mx-2 text-muted"
                                                                htmlFor="is-comment"
                                                            >
                                                                {t(
                                                                    "Add Comment"
                                                                )}
                                                            </Label>
                                                            {/* <UncontrolledTooltip
                                                                placement="top"
                                                                target="is-comment"
                                                            >
                                                                {t(
                                                                    "Add Comment"
                                                                )}
                                                            </UncontrolledTooltip> */}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {canSendMessage || isComment ? (
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "space-between",
                                                    }}
                                                >
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
                                                                            setemojiPicker(
                                                                                false
                                                                            );
                                                                        }}
                                                                    >
                                                                        <i
                                                                            className="ri-attachment-2 align-middle"
                                                                            style={{
                                                                                lineHeight:
                                                                                    "1",
                                                                            }}
                                                                        ></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {!isRecording &&
                                                        !recordedAudioBlob && (
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
                                                                                setImagePicker(
                                                                                    false
                                                                                );
                                                                            }}
                                                                        >
                                                                            <i className="bx bx-smile align-middle"></i>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
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

                                                                                maxHeight:
                                                                                    " 200px",
                                                                                overflow:
                                                                                    "auto",
                                                                            }}
                                                                        >
                                                                            {contactFields?.map(
                                                                                (
                                                                                    contactField
                                                                                ) => (
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

                                                    <div
                                                        className="col input-message"
                                                        style={{
                                                            position:
                                                                "relative",
                                                        }}
                                                    >
                                                        {/* <div className="chat-input-feedback">
                                                    {t(
                                                        "Please Enter a Message"
                                                    )}
                                                </div> */}

                                                        {!isRecording &&
                                                        !recordedAudioBlob ? (
                                                            <input
                                                                type="text"
                                                                value={
                                                                    textMessage
                                                                }
                                                                onKeyDown={
                                                                    onKeyPress
                                                                }
                                                                onChange={(e) =>
                                                                    setTextMessage(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="form-control chat-input bg-light border-light px-2 py-1"
                                                                id="chat-input"
                                                                placeholder={
                                                                    isComment ==
                                                                    true
                                                                        ? t(
                                                                              "Add your comment..."
                                                                          )
                                                                        : t(
                                                                              "Type your message..."
                                                                          )
                                                                }
                                                            />
                                                        ) : (
                                                            // <AudioRecorder
                                                            //     onRecordingComplete={(
                                                            //         blob
                                                            //     ) =>
                                                            //         setRecordedAudioBlob(
                                                            //             blob
                                                            //         )
                                                            //     }
                                                            //     recorderControls={
                                                            //         recorderControls
                                                            //     }
                                                            // />
                                                            <>
                                                                {/* <VoiceRecorder
                                                                    onRecordingStart={(
                                                                        e
                                                                    ) => {
                                                                        setIsRecording(
                                                                            true
                                                                        );
                                                                    }}
                                                                    onRecordingEnd={(
                                                                        blob
                                                                    ) => {
                                                                        console.log(
                                                                            "the E: ",
                                                                            blob
                                                                        );
                                                                        setRecordedAudioBlob(
                                                                            blob
                                                                        );
                                                                        setIsRecording(
                                                                            false
                                                                        );
                                                                    }}
                                                                    onAudioDownload={(
                                                                        autoDownload
                                                                    ) => {
                                                                        console.log(
                                                                            "autoDownload: ",
                                                                            autoDownload
                                                                        );
                                                                    }}
                                                                    width={
                                                                        "320px"
                                                                    }
                                                                /> */}

                                                                <Button
                                                                    className="voice-recorder_control-close-button"
                                                                    onClick={() => {
                                                                        setIsRecording(
                                                                            false
                                                                        );
                                                                        setRecordedAudioBlob(
                                                                            null
                                                                        );
                                                                    }}
                                                                >
                                                                    {" "}
                                                                    <i className="ri-close-fill align-bottom"></i>
                                                                </Button>
                                                            </>
                                                        )}

                                                        {replyMessage != "" && (
                                                            <div className="reply">
                                                                <Card className="mb-0">
                                                                    <CardBody
                                                                        className="py3"
                                                                        style={{
                                                                            padding:
                                                                                "0",
                                                                        }}
                                                                    >
                                                                        <div className="replymessage-block mb-0 d-flex align-items-start">
                                                                            <div className="flex-grow-1">
                                                                                <div
                                                                                    className="name mb-1 "
                                                                                    style={{
                                                                                        fontWeight:
                                                                                            "500",
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
                                                                                        maxHeight:
                                                                                            "60px",
                                                                                        overflow:
                                                                                            "hidden",
                                                                                    }}
                                                                                >
                                                                                    {replyMessage
                                                                                        ?.message
                                                                                        ?.type ==
                                                                                        "attachment" && (
                                                                                        <>
                                                                                            {replyMessage
                                                                                                ?.message
                                                                                                ?.attachment
                                                                                                ?.type ==
                                                                                                "image" && (
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
                                                                                                            replyMessage
                                                                                                                .message
                                                                                                                .attachment
                                                                                                                .url
                                                                                                        }
                                                                                                        alt=""
                                                                                                        style={{
                                                                                                            maxWidth:
                                                                                                                "200px",
                                                                                                        }}
                                                                                                    />

                                                                                                    {replyMessage
                                                                                                        ?.message
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

                                                                                            {replyMessage
                                                                                                ?.message
                                                                                                ?.attachment
                                                                                                ?.type ==
                                                                                                "video" && (
                                                                                                <>
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
                                                                                                            replyMessage
                                                                                                                .message
                                                                                                                .attachment
                                                                                                                .url
                                                                                                        }
                                                                                                    >
                                                                                                        {t(
                                                                                                            "Your browser does not support the video tag."
                                                                                                        )}
                                                                                                    </video>
                                                                                                    {replyMessage
                                                                                                        ?.message
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

                                                                                            {replyMessage
                                                                                                ?.message
                                                                                                ?.attachment
                                                                                                ?.type ==
                                                                                                "audio" && (
                                                                                                <>
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
                                                                                                        src={
                                                                                                            replyMessage
                                                                                                                .message
                                                                                                                .attachment
                                                                                                                .url
                                                                                                        }
                                                                                                    >
                                                                                                        {t(
                                                                                                            "Your browser does not support the audio tag."
                                                                                                        )}
                                                                                                    </audio>
                                                                                                    {replyMessage
                                                                                                        ?.message
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

                                                                                            {replyMessage
                                                                                                ?.message
                                                                                                ?.attachment
                                                                                                ?.type ==
                                                                                                "document" && (
                                                                                                <>
                                                                                                    <div>
                                                                                                        {captionToJson(
                                                                                                            replyMessage
                                                                                                                ?.message
                                                                                                                ?.attachment
                                                                                                                ?.caption
                                                                                                        )
                                                                                                            ?.filename
                                                                                                            ? captionToJson(
                                                                                                                  replyMessage
                                                                                                                      ?.message
                                                                                                                      ?.attachment
                                                                                                                      ?.caption
                                                                                                              )
                                                                                                                  ?.filename
                                                                                                            : getFileName(
                                                                                                                  replyMessage
                                                                                                                      ?.message
                                                                                                                      ?.attachment
                                                                                                                      ?.url
                                                                                                              )}
                                                                                                    </div>
                                                                                                    {captionToJson(
                                                                                                        replyMessage
                                                                                                            ?.message
                                                                                                            ?.attachment
                                                                                                            ?.caption
                                                                                                    )
                                                                                                        ?.caption ? (
                                                                                                        <p className="p-2 pb-0">
                                                                                                            {
                                                                                                                captionToJson(
                                                                                                                    replyMessage
                                                                                                                        ?.message
                                                                                                                        ?.attachment
                                                                                                                        ?.caption
                                                                                                                )
                                                                                                                    ?.caption
                                                                                                            }
                                                                                                        </p>
                                                                                                    ) : (
                                                                                                        replyMessage
                                                                                                            ?.message
                                                                                                            ?.attachment
                                                                                                            ?.caption !=
                                                                                                            "" &&
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

                                                                                    {replyMessage
                                                                                        ?.message
                                                                                        ?.type ==
                                                                                        "comment" && (
                                                                                        <>
                                                                                            {replyMessage
                                                                                                .message
                                                                                                .text && (
                                                                                                <>
                                                                                                    <p className="mb-2 ctext-content">
                                                                                                        {
                                                                                                            replyMessage
                                                                                                                .message
                                                                                                                .text
                                                                                                        }
                                                                                                    </p>
                                                                                                </>
                                                                                            )}
                                                                                        </>
                                                                                    )}
                                                                                    {replyMessage
                                                                                        ?.message
                                                                                        ?.type ==
                                                                                        "text" &&
                                                                                        replyMessage
                                                                                            .message
                                                                                            .text && (
                                                                                            <>
                                                                                                {
                                                                                                    replyMessage
                                                                                                        .message
                                                                                                        .text
                                                                                                }
                                                                                            </>
                                                                                        )}

                                                                                    {replyMessage
                                                                                        ?.message
                                                                                        ?.type ==
                                                                                        "button" &&
                                                                                        replyMessage
                                                                                            ?.message
                                                                                            ?.buttons ==
                                                                                            null &&
                                                                                        replyMessage
                                                                                            ?.message
                                                                                            ?.title && (
                                                                                            <>
                                                                                                {
                                                                                                    replyMessage
                                                                                                        ?.message
                                                                                                        ?.title
                                                                                                }
                                                                                            </>
                                                                                        )}

                                                                                    {replyMessage
                                                                                        ?.message
                                                                                        ?.type ==
                                                                                        "quick_reply" &&
                                                                                        !isEmpty(
                                                                                            replyMessage
                                                                                                ?.message
                                                                                                ?.replies
                                                                                        ) && (
                                                                                            <>
                                                                                                {replyMessage
                                                                                                    ?.message
                                                                                                    ?.replies[0] &&
                                                                                                    replyMessage
                                                                                                        ?.message
                                                                                                        ?.replies[0]}
                                                                                            </>
                                                                                        )}

                                                                                    {replyMessage
                                                                                        ?.message
                                                                                        ?.type ==
                                                                                        "whatsapp_template" && (
                                                                                        <>
                                                                                            {replyMessage
                                                                                                ?.message
                                                                                                ?.template
                                                                                                ?.header_text !=
                                                                                                "" && (
                                                                                                <div>
                                                                                                    {
                                                                                                        replyMessage
                                                                                                            ?.message
                                                                                                            ?.template
                                                                                                            ?.header_text
                                                                                                    }
                                                                                                </div>
                                                                                            )}
                                                                                            {replyMessage
                                                                                                ?.message
                                                                                                ?.template
                                                                                                ?.body_text !=
                                                                                                "" && (
                                                                                                <div>
                                                                                                    {
                                                                                                        replyMessage
                                                                                                            ?.message
                                                                                                            ?.template
                                                                                                            ?.body_text
                                                                                                    }
                                                                                                </div>
                                                                                            )}
                                                                                            {replyMessage
                                                                                                ?.message
                                                                                                ?.template
                                                                                                ?.footer_text !=
                                                                                                "" && (
                                                                                                <div>
                                                                                                    {
                                                                                                        replyMessage
                                                                                                            ?.message
                                                                                                            ?.template
                                                                                                            ?.footer_text
                                                                                                    }
                                                                                                </div>
                                                                                            )}
                                                                                            {replyMessage?.message?.template?.buttons?.map(
                                                                                                (
                                                                                                    button
                                                                                                ) => (
                                                                                                    <div>
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
                                                                                                            <Button className="ctext-btn  btn btn-sm btn-outline-secondary w-100 mb-2">
                                                                                                                {
                                                                                                                    button.text
                                                                                                                }
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
                                                                                    onClick={() =>
                                                                                        setReplyMessage(
                                                                                            ""
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <i className="bx bx-x align-middle"></i>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </CardBody>
                                                                </Card>
                                                            </div>
                                                        )}
                                                        {isSnippet && (
                                                            <div className="snippets ">
                                                                {messageSnippets?.data ? (
                                                                    <>
                                                                        <div className="search-box">
                                                                            <Input
                                                                                onChange={(
                                                                                    e
                                                                                ) => {
                                                                                    setSearchSnippet(
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    );
                                                                                }}
                                                                                value={
                                                                                    searchSnippet
                                                                                        ? searchSnippet
                                                                                        : ""
                                                                                }
                                                                                // onKeyUp={
                                                                                //     searchSnippets
                                                                                // }
                                                                                type="text"
                                                                                className="form-control bg-light border-light"
                                                                                placeholder={t(
                                                                                    "Search here..."
                                                                                )}
                                                                                id="searchSnippets"
                                                                            />
                                                                            <i className="ri-search-2-line search-icon"></i>
                                                                        </div>
                                                                        <div className="snippet-content scrollable">
                                                                            {messageSnippets
                                                                                ?.links
                                                                                ?.next && (
                                                                                <>
                                                                                    <div
                                                                                        className="d-flex"
                                                                                        style={{
                                                                                            justifyContent:
                                                                                                "center",
                                                                                            marginBottom:
                                                                                                "1rem",
                                                                                        }}
                                                                                    >
                                                                                        <Button
                                                                                            color=""
                                                                                            id="previousPage"
                                                                                            className="btn btn-soft-success btn-sm shadow-none me-2"
                                                                                            onClick={() => {
                                                                                                handleGetPaginatedSnippets(
                                                                                                    messageSnippets
                                                                                                        ?.links
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
                                                                                        {t(
                                                                                            "Previous snippets"
                                                                                        )}
                                                                                    </UncontrolledTooltip>
                                                                                </>
                                                                            )}
                                                                            <ul className="list-unstyled">
                                                                                {messageSnippets?.data?.map(
                                                                                    (
                                                                                        snippet
                                                                                    ) => (
                                                                                        <li
                                                                                            className=" p-2"
                                                                                            onClick={() => {
                                                                                                setTextMessage(
                                                                                                    snippet.message
                                                                                                );
                                                                                                setSearchSnippet(
                                                                                                    ""
                                                                                                );
                                                                                            }}
                                                                                        >
                                                                                            <div className="">
                                                                                                <div className="snippet-name">
                                                                                                    {
                                                                                                        snippet.name
                                                                                                    }
                                                                                                </div>
                                                                                                <div className="text-muted small snippet-message">
                                                                                                    {
                                                                                                        snippet.message
                                                                                                    }
                                                                                                </div>
                                                                                            </div>
                                                                                        </li>
                                                                                    )
                                                                                )}
                                                                            </ul>
                                                                            {messageSnippets
                                                                                ?.links
                                                                                ?.prev && (
                                                                                <>
                                                                                    <div
                                                                                        className="d-flex"
                                                                                        style={{
                                                                                            justifyContent:
                                                                                                "center",
                                                                                            marginBottom:
                                                                                                "1rem",
                                                                                        }}
                                                                                    >
                                                                                        <Button
                                                                                            color=""
                                                                                            id="nextPage"
                                                                                            className="btn btn-soft-success btn-sm shadow-none me-2"
                                                                                            onClick={() => {
                                                                                                handleGetPaginatedSnippets(
                                                                                                    messageSnippets
                                                                                                        ?.links
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
                                                                                        {t(
                                                                                            "Next snippets"
                                                                                        )}
                                                                                    </UncontrolledTooltip>
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    t(
                                                                        "No Snippets available"
                                                                    )
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="col-auto">
                                                        <div className="chat-input-links ms-2 send-button">
                                                            <div className="links-list-item">
                                                                {textMessage !=
                                                                "" ? (
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
                                                                    <>
                                                                        {!isRecording &&
                                                                            !recordedAudioBlob && (
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
                                                                                        setIsRecording(
                                                                                            true
                                                                                        );
                                                                                    }}
                                                                                    className="audio-send waves-effect waves-light"
                                                                                >
                                                                                    <i className="ri-mic-line align-bottom"></i>
                                                                                </Button>
                                                                            )}
                                                                        {recordedAudioBlob && (
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

                                                                                    setIsRecording(
                                                                                        false
                                                                                    );
                                                                                    handleSendAudio();
                                                                                }}
                                                                                className="text-send waves-effect waves-light"
                                                                            >
                                                                                <i className="ri-send-plane-2-fill align-bottom"></i>
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
                                                        justifyContent:
                                                            "center",
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
                {/* <div>
                    <AudioRecorder
                        onRecordingComplete={(blob) => addAudioElement(blob)}
                        recorderControls={recorderControls}
                    />
                </div> */}
                <div
                    style={{
                        visibility: "hidden",
                        position: "relative",
                        zIndex: "-1111",
                    }}
                >
                    {/* <Recorder
                        record={isRecording}
                        title={"New recording"}
                        audioURL={audioRecordState.url}
                        showUIAudio
                        handleAudioStop={(data) => handleAudioStop(data)}
                        handleAudioUpload={(data) => handleAudioUpload(data)}
                        handleCountDown={(data) => handleCountDown(data)}
                        handleReset={() => handleReset()}
                        mimeTypeToUseWhenRecording={`audio/mp4`} // For specific mimetype.
                    /> */}
                </div>
            </div>
        </React.Fragment>
    );
};

export default OLDChatContent;
