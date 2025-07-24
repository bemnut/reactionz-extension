import React, { useEffect, useState, useCallback, useRef } from "react";
import {
    Button,
    UncontrolledTooltip,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
} from "reactstrap";

import { useNavigate } from "react-router-dom";
import SimpleBar from "simplebar-react";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
    getContacts as onGetContacts,
    deleteContact as onDeleteContact,
    changeIsContactDeleted as onChangeIsContactDeletedApi,
    changeIsContactUpdated as onChangeIsContactUpdatedApi,
    blockContact as onBlockContactApi,
    unblockContact as onUnblockContactApi,
    getTags as onGetTags,
} from "../../slices/thunks";

import { createSelector } from "reselect";

import {
    getCountryByAreaCode,
    getCountryFlag,
    getPageLinksPayload,
    getPhoneNumberInfo,
    getNameInitials,
} from "./common_functions";
import { useTranslation } from "react-i18next";

const Contacts = ({
    userChatOpen,
    setSelectedContact,
    setContact,
    countries,
    filter,
    setContactForEditing,
    handleAddContactModal,
}) => {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const selectChatState = (state) => state;
    const chatProperties = createSelector(selectChatState, (state) => ({
        user: state.Login.user,
        contacts: state.Contact.contacts,
        isContactAdded: state.Contact.isContactAdded,
        isContactDeleted: state.Contact.isContactDeleted,
        isContactUpdated: state.Contact.isContactUpdated,
        language: state.Layout.language,
        tags: state.Tag.tags,
    }));
    // Inside your component
    const {
        contacts,
        user,
        language,
        isContactAdded,
        isContactDeleted,
        isContactUpdated,
    } = useSelector(chatProperties);

    useEffect(() => {
        dispatch(onGetContacts({}));
        //dispatch(onGetTags());
    }, []);

    useEffect(() => {
        if (
            (isContactAdded || isContactDeleted || isContactUpdated) &&
            contacts
        ) {
            filter != null && filter != ""
                ? dispatch(
                      onGetContacts({
                          search: filter,
                          page: contacts?.meta?.current_page,
                      })
                  )
                : dispatch(
                      onGetContacts({
                          page: contacts?.meta?.current_page,
                      })
                  );
        } else if (isContactAdded || isContactDeleted || isContactUpdated) {
            dispatch(onGetContacts({}));
        }
    }, [isContactAdded, isContactDeleted, isContactUpdated]);

    return (
        <React.Fragment>
            <SimpleBar
                className="contacts chat-room-list pt-3"
                style={{ margin: "-7px 0px 0px" }}
                data-simplebar-direction={
                    language && language == "US_en" ? "ltr" : "rtl"
                }
            >
                <div className="sort-contact">
                    <div className="mt-3">
                        {contacts?.links?.prev && (
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
                                                onGetContacts(
                                                    getPageLinksPayload(
                                                        contacts?.links?.prev,
                                                        filter
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
                                    {t("Previous List")}
                                </UncontrolledTooltip>
                            </>
                        )}
                        <ul
                            id={"contacts-list"}
                            className="list-unstyled contact-list"
                        >
                            {contacts?.data?.map((contact, key) => (
                                <li key={key}>
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0 me-3 position-relative">
                                            <div className="contact-list-avtar">
                                                {contact.profilePicture ? (
                                                    <img
                                                        src={
                                                            contact.profilePicture
                                                        }
                                                        className="img-fluid rounded-circle"
                                                        alt=""
                                                    />
                                                ) : (
                                                    <span className=" avatar-title rounded-circle bg-primary fs-10">
                                                        {getNameInitials(
                                                            contact?.firstName,
                                                            contact?.lastName
                                                        )}
                                                    </span>
                                                )}

                                                {countries && contact && (
                                                    <div className="country-flag">
                                                        {countries &&
                                                            getCountryByAreaCode(
                                                                countries,
                                                                getPhoneNumberInfo(
                                                                    contact?.phone
                                                                )?.phoneInfo
                                                                    ?.areaCode
                                                            ) && (
                                                                <img
                                                                    src={getCountryFlag(
                                                                        getCountryByAreaCode(
                                                                            countries,
                                                                            getPhoneNumberInfo(
                                                                                contact?.phone
                                                                            )
                                                                                ?.phoneInfo
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
                                        </div>
                                        <div
                                            className="flex-grow-1 contact-list-content"
                                            onClick={(e) => {
                                                setSelectedContact(
                                                    setContact(
                                                        contact,
                                                        countries
                                                    )
                                                );
                                                userChatOpen(contact);
                                            }}
                                        >
                                            <p className="text-truncate contact-list-name mb-0">
                                                {contact.firstName
                                                    ? contact.firstName
                                                    : contact.phosne}
                                            </p>
                                            <div
                                                className="d-flex contact-list-content-desc pe-3"
                                                style={{
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                            >
                                                <div className="text-truncate line-clamp-1">
                                                    {contact.tags?.map(
                                                        (tag, idx) =>
                                                            idx < 3 && (
                                                                <span className=" text-muted fs-12 mb-0 me-1">{`${
                                                                    tag.emoji
                                                                        ? tag.emoji
                                                                        : ""
                                                                } ${
                                                                    tag.name
                                                                }`}</span>
                                                            )
                                                    )}
                                                </div>
                                                {contact.lifecycle && (
                                                    <div className="text-muted fs-12 mb-0">
                                                        {`${
                                                            contact.lifecycle
                                                                ?.emoji
                                                                ? contact
                                                                      .lifecycle
                                                                      ?.emoji
                                                                : ""
                                                        }${
                                                            contact.lifecycle
                                                                ?.name
                                                        }`}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0 ">
                                            <UncontrolledDropdown>
                                                <DropdownToggle
                                                    tag="a"
                                                    className="text-muted"
                                                >
                                                    <i className="ri-more-2-fill" />
                                                </DropdownToggle>
                                                <DropdownMenu className="dropdown-menu-end contact-dropdown-menus">
                                                    <DropdownItem
                                                        onClick={() => {
                                                            setContactForEditing(
                                                                contact
                                                            );
                                                            handleAddContactModal();
                                                        }}
                                                    >
                                                        <i className="ri-pencil-line text-muted mx-2 align-bottom" />
                                                        {t("Edit")}
                                                    </DropdownItem>
                                                    {contact.isBlocked ==
                                                    true ? (
                                                        <DropdownItem
                                                            onClick={() => {
                                                                dispatch(
                                                                    onChangeIsContactUpdatedApi(
                                                                        false
                                                                    )
                                                                );
                                                                dispatch(
                                                                    onUnblockContactApi(
                                                                        {
                                                                            contactId:
                                                                                contact.id,
                                                                        }
                                                                    )
                                                                );
                                                            }}
                                                        >
                                                            <i className="ri-checkbox-circle-line text-muted mx-2 align-bottom" />
                                                            {t("Unblock")}
                                                        </DropdownItem>
                                                    ) : (
                                                        <DropdownItem
                                                            onClick={() => {
                                                                dispatch(
                                                                    onChangeIsContactUpdatedApi(
                                                                        false
                                                                    )
                                                                );
                                                                dispatch(
                                                                    onBlockContactApi(
                                                                        {
                                                                            contactId:
                                                                                contact.id,
                                                                        }
                                                                    )
                                                                );
                                                            }}
                                                        >
                                                            <i className="ri-forbid-2-line text-muted mx-2 align-bottom" />
                                                            {t("Block")}
                                                        </DropdownItem>
                                                    )}
                                                    <DropdownItem
                                                        onClick={() => {
                                                            dispatch(
                                                                onChangeIsContactDeletedApi(
                                                                    false
                                                                )
                                                            );
                                                            dispatch(
                                                                onDeleteContact(
                                                                    {
                                                                        contactId:
                                                                            contact.id,
                                                                    }
                                                                )
                                                            );
                                                        }}
                                                    >
                                                        <i className="ri-delete-bin-6-line text-muted mx-2 align-bottom" />{" "}
                                                        {t("Delete")}
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {contacts?.links?.next && (
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
                                            dispatch(
                                                onGetContacts(
                                                    getPageLinksPayload(
                                                        contacts?.links?.next,
                                                        filter
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
                                    {t("Next List")}
                                </UncontrolledTooltip>
                            </>
                        )}
                    </div>
                </div>
            </SimpleBar>
        </React.Fragment>
    );
};

export default Contacts;
