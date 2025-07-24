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
    assignAgentToContact as onAssignAgentToContactApi,
    changeIsContactUpdated as onChangeIsContactUpdatedApi,
    changeShowOnFireberry as onChangeShowOnFireberry,
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
const ChatTopbar = ({
    selectedContact,
    countries,
    handleResetChatContent,
    searchMessages,
    selectedChannel,
    setSelectedChannel,
    selectedAgent,
    setSelectedAgent,
    showHideChatComponent,
}) => {
    const { t } = useTranslation();
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    //getUserPermission();

    //

    const selectChatState = (state) => state;
    const chatProperties = createSelector(selectChatState, (state) => ({
        channels: state.Channel.channels,
        users: state.User.users,
    }));
    // Inside your component
    const { channels, users } = useSelector(chatProperties);

    const [search_Menu, setsearch_Menu] = useState(false);
    const [channelMenu, setChannelMenu] = useState(false);
    const [agentMenu, setAgentMenu] = useState(false);

    //
    const [sendTemplateModal, setSendTemplateModal] = useState(false);

    const [searchUser, setSearchUser] = useState<any>("");

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

    useEffect(() => {
        if (searchUser == "") {
            dispatch(onGetUsersApi({}));
        } else {
            dispatch(onGetUsersApi({ search: searchUser }));
        }
    }, [searchUser]);

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

    return (
        <React.Fragment>
            <div className="px-3 py-2 pb-4 user-chat-topbar">
                <Row className="align-items-center">
                    <Col sm={8} xs={8}>
                        <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 d-block d-lg-none  user-chat-remove">
                                <Link
                                    to="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleResetChatContent();
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
                                                src={userDummayImage}
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
                                        {countries && selectedContact && (
                                            <div className="country-flag">
                                                {countries &&
                                                    getCountryByAreaCode(
                                                        countries,
                                                        getPhoneNumberInfo(
                                                            selectedContact?.phone
                                                        )?.phoneInfo?.areaCode
                                                    ) && (
                                                        <img
                                                            src={getCountryFlag(
                                                                getCountryByAreaCode(
                                                                    countries,
                                                                    getPhoneNumberInfo(
                                                                        selectedContact?.phone
                                                                    )?.phoneInfo
                                                                        ?.areaCode
                                                                )?.iso2
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
                                                    {selectedContact?.firstName}
                                                </a>
                                            </h5>
                                        </div>
                                        {/* <p className="text-truncate text-muted fs-14 mb-0 userStatus">
                                                            <small>
                                                                Online
                                                            </small>
                                                        </p> */}
                                        <div className="text-truncate text-muted fs-14 mb-0 user-phone">
                                            {selectedContact?.phone}
                                        </div>
                                        <div className="text-truncate text-muted fs-14 mb-0 user-assigned-to">
                                            <Dropdown
                                                isOpen={agentMenu}
                                                toggle={toggleAgentMenu}
                                                style={{
                                                    position: "absolute",
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
                                                            {t("Assigned To: ")}
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
                                                                        e.target
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
                                                            {users?.links
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
                                                                (user) => (
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
                                                        {users?.links?.next && (
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
                    <Col sm={4} xs={4}>
                        <ul className="list-inline user-chat-nav text-end mb-0">
                            <li className="list-inline-item channel m-0">
                                <Dropdown
                                    isOpen={channelMenu}
                                    toggle={toggleChannelMenu}
                                >
                                    <DropdownToggle
                                        className="btn btn-ghost-secondary btn-icon"
                                        tag="button"
                                    >
                                        {selectedChannel?.logo ? (
                                            <img
                                                src={selectedChannel.logo}
                                                className="rounded-circle avatar-xxxs selected-channel"
                                                alt=""
                                            />
                                        ) : (
                                            <div
                                                style={{
                                                    lineHeight: "1",
                                                    fontSize: "9px",
                                                }}
                                            >
                                                {t("Select a channel")}
                                            </div>
                                        )}
                                    </DropdownToggle>
                                    <DropdownMenu
                                        className="p-0 dropdown-menu-end dropdown-menu-lg"
                                        style={{
                                            minWidth: "12rem",
                                        }}
                                    >
                                        {channels?.map((channel) => (
                                            <DropdownItem
                                                className="py-0"
                                                onClick={() =>
                                                    setSelectedChannel(channel)
                                                }
                                            >
                                                <div
                                                    className="d-flex"
                                                    style={{
                                                        alignItems: "center",
                                                        flexWrap: "unset",
                                                    }}
                                                >
                                                    {channel?.logo && (
                                                        <img
                                                            src={channel.logo}
                                                            className="rounded-circle avatar-xxxs selected-channel small"
                                                            alt=""
                                                        />
                                                    )}
                                                    <div className="mx-2 py-2">
                                                        {channel.name}
                                                    </div>
                                                </div>
                                            </DropdownItem>
                                        ))}
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
                                                    onKeyUp={searchMessages}
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
                                (selectedChannel?.name != "Instagram" && (
                                    <li className="list-inline-item send-template-modal m-0">
                                        <Dropdown
                                            isOpen={sendTemplateModal}
                                            toggle={toggleSendTemplateModal}
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
                                                    minWidth: "17rem",
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

                            {showHideChatComponent && (
                                <li className="list-inline-item hide-fireberry-chat-component m-0">
                                    <Button
                                        id="hide-fireberry-chat-component"
                                        className="btn btn-ghost-secondary btn-icon"
                                        onClick={() => {
                                            chrome.storage.local.set({
                                                show_on_fireberry: "hide",
                                            });
                                            chrome.runtime.sendMessage({
                                                sendBack: true,
                                                data: {
                                                    type: "popup-modal",
                                                },
                                            });
                                        }}
                                    >
                                        <FeatherIcon
                                            icon="chevron-down"
                                            className="icon-sm"
                                        />
                                    </Button>
                                    <UncontrolledTooltip
                                        placement="bottom"
                                        target="hide-fireberry-chat-component"
                                    >
                                        {t(
                                            "Hide Chat component from fireberry"
                                        )}
                                    </UncontrolledTooltip>
                                </li>
                            )}
                        </ul>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
};

export default ChatTopbar;
