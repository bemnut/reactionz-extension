import React, { useEffect, useState, useCallback, useRef } from "react";
import {
    Button,
    Input,
    DropdownToggle,
    DropdownMenu,
    Dropdown,
    DropdownItem,
    Row,
    Col,
    Form,
    FormFeedback,
} from "reactstrap";
import Select from "react-select";
import * as Yup from "yup";
import { useFormik } from "formik";

import { Link, useNavigate } from "react-router-dom";
import SimpleBar from "simplebar-react";
import classnames from "classnames";
import Picker from "emoji-picker-react";
import { isEmpty, map } from "lodash";

//Import Icons
import FeatherIcon from "feather-icons-react";
//import PersonalInfo from "./PersonalInfo";

import { messages, chatContactData } from "../../common/data";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
    getTags as onGetTags,
    addContact as onAddContact,
    getUsers as onGetUsers,
    getLifeCycles as onGetLifeCycles,
    updateContact as onUpdateContactApi,
    updateContactTags as onUpdateContactTagsApi,
    updateContactLifeCycle as onUpdateContactLifeCycleApi,
    assignAgentToContact as onAssignAgentToContactApi,
    changeIsContactAdded as onChangeIsContactAdded,
} from "../../slices/thunks";

import avatar2 from "../../assets/images/users/avatar-2.jpg";
import userDummayImage from "../../assets/images/users/user-dummy-img.jpg";

//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { createSelector } from "reselect";

import { getLoggedinUser } from "../../helpers/api_helper";
import {
    getCountry,
    getCountryByAreaCode,
    getCountryFlag,
    getPhoneNumberInfo,
} from "./common_functions";
import { useTranslation } from "react-i18next";

import parsePhoneNumber, {
    isPossiblePhoneNumber,
    isValidPhoneNumber,
    validatePhoneNumberLength,
    AsYouType,
    findPhoneNumbersInText,
} from "libphonenumber-js";
import { json } from "stream/consumers";

const AddContact = ({
    addContactShow,
    backToUserChat,
    countries,
    contactForEditing,
    setContactForEditing,
}) => {
    const dispatch = useDispatch<any>();
    const { t } = useTranslation();

    const selectChatState = (state) => state;
    const chatProperties = createSelector(selectChatState, (state) => ({
        users: state.User.users,
        tags: state.Tag.tags,
        lifeCycles: state.LifeCycle.lifeCycles,
    }));
    // Inside your component
    const { tags, users, lifeCycles } = useSelector(chatProperties);

    //
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [tag, setTag] = useState(null);
    const [tagOptions, setTagOptions] = useState([]);
    const [lifeCycle, setLifeCycle] = useState(null);
    const [lifeCycleOptions, setLifeCycleOptions] = useState([]);
    const [userOptions, setUserOptions] = useState([]);
    const [user, setUser] = useState(null);
    const [country, setCountry] = useState(null);
    const [countryOptions, setCountryOptions] = useState([]);
    const [firstNameValidation, setFirstNameValidation] = useState(false);
    const [lastNameValidation, setLastNameValidation] = useState(false);
    const [phoneValidation, setPhoneValidation] = useState<any>(null);
    const [countryCodeMenu, setCountryCodeMenu] = useState(false);
    const [searchCoutry, setSearchCountry] = useState<any>("");

    // useEffect(() => {
    //     dispatch(onGetUsers());
    //     dispatch(onGetTags());
    //     dispatch(onGetLifeCycles());
    // }, []);

    useEffect(() => {
        if (contactForEditing) {
            setFirstName(contactForEditing?.firstName || "");
            setLastName(contactForEditing?.lastName || "");
            if (contactForEditing?.phone && contactForEditing?.phone !== "") {
                const phoneNumberInfo = getPhoneNumberInfo(
                    contactForEditing?.phone
                );
                setPhone(phoneNumberInfo?.phoneInfo?.nationalNumber || "");
                setCountry(
                    getCountryByAreaCode(
                        countries,
                        phoneNumberInfo?.phoneInfo?.areaCode
                    )
                );
                // countries &&
                //     countries.map((country) => {
                //         country.phone_code ==
                //         phoneNumberInfo?.phoneInfo?.areaCode
                //             ? setCountry(country)
                //             : null;
                //     });
            }
            contactForEditing?.tags &&
                setTag(
                    getTagsArrayFromContact(contactForEditing?.tags) || null
                );
            contactForEditing?.lifecycle &&
                setLifeCycle({
                    label: contactForEditing?.lifecycle?.name,
                    value: contactForEditing?.lifecycle?.id,
                });
            contactForEditing?.assignedTo &&
                setUser({
                    label: contactForEditing?.assignedTo?.name,
                    value: contactForEditing?.assignedTo?.id,
                });
        }
    }, [contactForEditing]);

    useEffect(() => {
        let options = [];
        countries &&
            countries?.map((country) =>
                Object.entries(country)?.map(([key, val]) => {
                    key == "name" &&
                        options.push({
                            label: val,
                            value: country.id,
                        });
                })
            );
        options && setCountryOptions(options);
    }, [countries]);

    useEffect(() => {
        let options = [];
        tags &&
            tags?.data?.map((tag) => {
                options.push({
                    label: `${tag.emoji} ${tag.name}`,
                    value: tag.id,
                });
            });
        options && setTagOptions(options);
    }, [tags]);

    //
    useEffect(() => {
        let options = [];
        users &&
            users?.data?.map((user) => {
                options.push({
                    label: user.name,
                    value: user.id,
                });
            });
        options && setUserOptions(options);
    }, [users]);

    //
    useEffect(() => {
        let options = [];
        lifeCycles &&
            lifeCycles?.data?.map((lifeCycle) => {
                options.push({
                    label: lifeCycle.name,
                    value: lifeCycle.id,
                });
            });
        options && setLifeCycleOptions(options);
    }, [lifeCycles]);

    useEffect(() => {
        if (!isEmpty(searchCoutry)) {
        }
    }, [searchCoutry]);

    const handleAddContact = () => {
        // onAddContact

        if (isEmpty(phone)) {
            setPhoneValidation({
                error: { message: "Phone field is required" },
            });
        }
        if (isEmpty(country)) {
            setPhoneValidation({
                error: {
                    message: "Please select country to get the area code",
                },
            });
        }
        if (
            !isEmpty(phone) &&
            !isEmpty(country) &&
            getPhoneNumberInfo(`${country?.phone_code}${phone}`)?.error
        ) {
            setPhoneValidation({
                error: {
                    message: getPhoneNumberInfo(contactForEditing?.phone)
                        ?.error,
                },
            });
        }
        if (isEmpty(firstName)) {
            setFirstNameValidation(true);
        }
        if (isEmpty(lastName)) {
            setLastNameValidation(true);
        }

        if (
            !isEmpty(phone) &&
            !isEmpty(firstName) &&
            !isEmpty(lastName) &&
            !isEmpty(country) &&
            !getPhoneNumberInfo(`${country?.phone_code}${phone}`)?.error
        ) {
            dispatch(onChangeIsContactAdded(false));
            let payload: any = {
                firstName: firstName,
                lastName: lastName,
                phone: getPhoneNumberInfo(`${country?.phone_code}${phone}`)
                    ?.phoneInfo?.number,
            };
            if (!isEmpty(contactForEditing)) {
                dispatch(
                    onUpdateContactApi({
                        contactId: contactForEditing.id,
                        firstName: firstName,
                        lastName: lastName,
                        phone: getPhoneNumberInfo(
                            `${country?.phone_code}${phone}`
                        )?.phoneInfo?.number,
                    })
                );
                if (!isEmpty(tag)) {
                    dispatch(
                        onUpdateContactTagsApi({
                            contactId: contactForEditing.id,
                            tags: getTagsArray(tag),
                        })
                    );
                }
                if (!isEmpty(lifeCycle)) {
                    dispatch(
                        onUpdateContactLifeCycleApi({
                            contactId: contactForEditing.id,
                            lifecycleId: lifeCycle.value,
                        })
                    );
                }
                if (!isEmpty(user)) {
                    dispatch(
                        onAssignAgentToContactApi({
                            contactId: contactForEditing.id,
                            assignTo: user.value,
                        })
                    );
                }
            } else {
                if (!isEmpty(tag) && getTagsArray(tag)) {
                    payload["tags"] = getTagsArray(tag);
                }
                if (!isEmpty(lifeCycle)) {
                    payload["lifeCycleId"] = lifeCycle.value;
                }
                if (!isEmpty(user)) {
                    payload["assignedTo"] = user.value;
                }

                dispatch(onAddContact(payload));
            }

            // cleanup
            setFirstName("");
            setLastName("");
            setPhone("");
            setTag(null);
            setLifeCycle(null);
            setUser(null);
            setFirstNameValidation(false);
            setLastNameValidation(false);
            setPhoneValidation(null);
            setCountry(null);
            setContactForEditing(null);
            // back to userchat pane
            backToUserChat();
        }
    };

    const getTagsArray = (tag) => {
        let grouparr = [];
        tag?.map((item) => {
            grouparr.push(item.value);
        });
        return grouparr;
    };

    const getTagsArrayFromContact = (tags) => {
        let grouparr = [];
        tags?.map((tag) => {
            grouparr.push({
                label: `${tag.emoji} ${tag.name}`,
                value: tag.id,
            });
        });
        return grouparr;
    };

    //Toggle country area code Menus
    const toggleCountryCode = () => {
        setCountryCodeMenu(!countryCodeMenu);
    };

    //serach recent user
    const searchUsers = () => {
        var input, filter, li, a, i, txtValue;
        input = document.getElementById("search-user");
        filter = input.value.toUpperCase();
        var userList = document.getElementsByClassName("users-list");
        Array.prototype.forEach.call(userList, function (el) {
            li = el.getElementsByTagName("li");
            for (i = 0; i < li.length; i++) {
                a = li[i].getElementsByTagName("a")[0];
                txtValue = a.textContent || a.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";
                }
            }
        });
    };

    //Search Message
    const searchCountries = () => {
        var searchInput,
            searchFilter,
            searchUL,
            searchLI,
            searchElement,
            a,
            txtValue,
            wrapper_element;
        searchInput = document.getElementById("searchCountry");
        searchFilter = searchInput.value.toUpperCase();
        searchElement = document.getElementsByClassName("country");

        Array.prototype.forEach.call(
            Array.from(searchElement),
            function (search) {
                a = search.getElementsByClassName("country-name")[0]
                    ? search.getElementsByClassName("country-name")[0]
                    : "";

                txtValue =
                    a.textContent || a.innerText
                        ? a.textContent || a.innerText
                        : "";
                wrapper_element = search.closest(".dropdown-item");
                if (txtValue.toUpperCase().indexOf(searchFilter) > -1) {
                    wrapper_element.style.display = "";
                } else {
                    wrapper_element.style.display = "none";
                }
            }
        );
    };

    return (
        <React.Fragment>
            <div
                className="add-contact-form w-100 " //overflow-hidden
                ref={addContactShow}
            >
                <div className="px-4 py-3  add-contact-form-topbar">
                    <Row className="align-items-center">
                        <Col sm={4} xs={8}>
                            <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 d-block d-lg-none me-3 user-chat-remove">
                                    <Link
                                        to="#"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            backToUserChat();
                                            // cleanup
                                            setFirstName("");
                                            setLastName("");
                                            setPhone("");
                                            setTag(null);
                                            setLifeCycle(null);
                                            setUser(null);
                                            setCountry(null);
                                            setFirstNameValidation(false);
                                            setLastNameValidation(false);
                                            setPhoneValidation(null);
                                        }}
                                        className=" fs-18 p-1"
                                    >
                                        <i className="ri-arrow-left-s-line align-bottom"></i>
                                    </Link>
                                </div>
                                <h6 style={{ marginBottom: "0" }}>
                                    <i className="ri-user-add-line align-bottom me-2"></i>{" "}
                                    {t("Add Contact")}
                                </h6>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="pt-0 add-contact-form-content">
                    <Row className="align-items-center px-2">
                        <Col sm={12}>
                            <div className="ps-4 p-2 form-wrapper">
                                <Form>
                                    <div className="mb-2">
                                        {/* <Label
                                            htmlFor="firstName"
                                            className="form-label text-muted fs-12"
                                        >
                                            {t("First Name")}
                                        </Label> */}
                                        <Input
                                            name="firstName"
                                            className="form-control"
                                            placeholder={t("First name")}
                                            type="text"
                                            onChange={(e) =>
                                                setFirstName(e.target.value)
                                            }
                                            value={firstName || ""}
                                        />
                                        {firstNameValidation && (
                                            <FormFeedback
                                                type="invalid"
                                                style={{ display: "block" }}
                                            >
                                                {t("First name is required.")}
                                            </FormFeedback>
                                        )}
                                    </div>
                                    <div className="mb-2">
                                        {/* <Label
                                            htmlFor="lastName"
                                            className="form-label text-muted fs-12"
                                        >
                                            {t("First Name")}
                                        </Label> */}
                                        <Input
                                            name="lastName"
                                            className="form-control"
                                            placeholder={t("Last name")}
                                            type="text"
                                            onChange={(e) =>
                                                setLastName(e.target.value)
                                            }
                                            value={lastName || ""}
                                        />
                                        {lastNameValidation && (
                                            <FormFeedback
                                                type="invalid"
                                                style={{ display: "block" }}
                                            >
                                                {t("Last name is required.")}
                                            </FormFeedback>
                                        )}
                                    </div>

                                    <div className="mb-2">
                                        <div
                                            className="d-flex"
                                            style={{
                                                alignItems: "center",
                                                direction: "ltr",
                                            }}
                                        >
                                            <div className="country-flag ">
                                                <Dropdown
                                                    isOpen={countryCodeMenu}
                                                    toggle={toggleCountryCode}
                                                    style={{
                                                        position: "relative",
                                                    }}
                                                >
                                                    <DropdownToggle
                                                        className="btn btn-ghost-secondary btn-icon"
                                                        tag="a"
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        {countries &&
                                                        country ? (
                                                            <img
                                                                src={getCountryFlag(
                                                                    getCountry(
                                                                        countries,
                                                                        country.id
                                                                    )?.iso2
                                                                )}
                                                                className=""
                                                                alt=""
                                                            />
                                                        ) : (
                                                            <i className="ri-arrow-down-s-line align-bottom mx-2"></i>
                                                        )}
                                                    </DropdownToggle>
                                                    <DropdownMenu
                                                        className="p-0 dropdown-menu-end dropdown-menu-lg"
                                                        style={{
                                                            left: "0",
                                                            right: "auto",
                                                            minWidth: "21rem",
                                                            maxWidth: "21rem",
                                                        }}
                                                    >
                                                        <>
                                                            <div className="p-2">
                                                                <Input
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        setSearchCountry(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        );

                                                                        searchCountries();
                                                                    }}
                                                                    id="searchCountry"
                                                                    type="text"
                                                                    className="form-control bg-light border-light"
                                                                    placeholder={t(
                                                                        `Search Country...`
                                                                    )}
                                                                    value={
                                                                        searchCoutry
                                                                            ? searchCoutry
                                                                            : ""
                                                                    }
                                                                />
                                                            </div>
                                                            <div
                                                                className="countries"
                                                                style={{
                                                                    maxHeight:
                                                                        "200px",
                                                                    overflow:
                                                                        "auto",
                                                                    left: "0",
                                                                    right: "auto",
                                                                }}
                                                            >
                                                                {countries?.map(
                                                                    (
                                                                        country
                                                                    ) => (
                                                                        <DropdownItem
                                                                            onClick={() => {
                                                                                setCountry(
                                                                                    country
                                                                                );
                                                                            }}
                                                                        >
                                                                            <div
                                                                                className="country d-flex"
                                                                                style={{
                                                                                    alignItems:
                                                                                        "center",
                                                                                    justifyContent:
                                                                                        "space-between",
                                                                                }}
                                                                            >
                                                                                <div
                                                                                    className="d-flex"
                                                                                    style={{
                                                                                        alignItems:
                                                                                            "center",
                                                                                    }}
                                                                                >
                                                                                    <img
                                                                                        src={getCountryFlag(
                                                                                            getCountry(
                                                                                                countries,
                                                                                                country.id
                                                                                            )
                                                                                                ?.iso2
                                                                                        )}
                                                                                        style={{
                                                                                            maxWidth:
                                                                                                "40px",
                                                                                        }}
                                                                                        className="country-flag me-2"
                                                                                        alt=""
                                                                                    />
                                                                                    <div className="country-name">
                                                                                        {
                                                                                            country.name
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                                <div className="country-phone-code">{`+${country.phone_code}`}</div>
                                                                            </div>
                                                                        </DropdownItem>
                                                                    )
                                                                )}
                                                            </div>
                                                        </>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </div>
                                            <div className="country-flag country-code ">
                                                {country && (
                                                    <div>
                                                        {`+${country?.phone_code} `}
                                                    </div>
                                                )}
                                            </div>
                                            <Input
                                                name="phone"
                                                className="form-control"
                                                placeholder={t("Phone")}
                                                type="text"
                                                onChange={(e) =>
                                                    setPhone(e.target.value)
                                                }
                                                //onBlur={handleBlur}
                                                value={phone}
                                                style={{
                                                    borderTopLeftRadius: "0",
                                                    borderBottomLeftRadius: "0",
                                                    borderLeft: "none",
                                                }}
                                                disabled={
                                                    country ? false : true
                                                }
                                            />
                                        </div>
                                        {phoneValidation?.error && (
                                            <FormFeedback
                                                type="invalid"
                                                style={{ display: "block" }}
                                            >
                                                {t(
                                                    phoneValidation.error
                                                        .message
                                                )}
                                            </FormFeedback>
                                        )}
                                    </div>

                                    <div className="mb-2">
                                        {/* <Label
                                            htmlFor="tag"
                                            className="form-label text-muted fs-12"
                                        >
                                            {t("Tag")}
                                        </Label> */}
                                        <Select
                                            className="basic-single "
                                            classNamePrefix="value"
                                            defaultValue
                                            isDisabled={false}
                                            isLoading={false}
                                            isClearable={true}
                                            isMulti
                                            //isRtl={isRtl}
                                            isSearchable={true}
                                            name="tag"
                                            placeholder={t("Tag")}
                                            options={tagOptions || []}
                                            onChange={(e: any) =>
                                                e && setTag(e)
                                            }
                                            value={tag}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        {/* <Label
                                            htmlFor="tag"
                                            className="form-label text-muted fs-12"
                                        >
                                            {t("Tag")}
                                        </Label> */}
                                        <Select
                                            className="basic-single "
                                            classNamePrefix="value"
                                            defaultValue
                                            isDisabled={false}
                                            isLoading={false}
                                            isClearable={true}
                                            isMulti={false}
                                            //isRtl={isRtl}
                                            isSearchable={true}
                                            name="lifeCycle"
                                            placeholder={t("LifeCycle")}
                                            options={lifeCycleOptions || []}
                                            onChange={(e: any) =>
                                                e && setLifeCycle(e)
                                            }
                                            value={lifeCycle}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        {/* <Label
                                            htmlFor="tag"
                                            className="form-label text-muted fs-12"
                                        >
                                            {t("Tag")}
                                        </Label> */}
                                        <Select
                                            className="basic-single "
                                            classNamePrefix="value"
                                            defaultValue
                                            isDisabled={false}
                                            isLoading={false}
                                            isClearable={true}
                                            isMulti={false}
                                            //isRtl={isRtl}
                                            isSearchable={true}
                                            name="user"
                                            placeholder={t("Assigned to")}
                                            options={userOptions || []}
                                            onChange={(e: any) =>
                                                e && setUser(e)
                                            }
                                            value={user}
                                        />
                                    </div>

                                    {/* <div className="mb-2 country-input">
                                        <div className="input-group">
                                            <div className="country-flag ">
                                                {countries && country && (
                                                    <img
                                                        src={getCountryFlag(
                                                            getCountry(
                                                                countries,
                                                                country.value
                                                            )?.iso2
                                                        )}
                                                        className=""
                                                        alt=""
                                                    />
                                                )}
                                            </div>

                                            <Select
                                                className="basic-single form-control p-0 country-select-input"
                                                classNamePrefix="value"
                                                defaultValue
                                                isDisabled={false}
                                                isLoading={false}
                                                isClearable={true}
                                                isSearchable={true}
                                                name="country"
                                                placeholder={t("Country")}
                                                options={countryOptions || []}
                                                onChange={(e: any) =>
                                                    e && setCountry(e)
                                                }
                                                value={country}
                                            />
                                        </div>
                                    </div> */}

                                    <div
                                        className="mt-4 send-campaign-message-form-buttons"
                                        style={{ justifyContent: "flex-end" }}
                                    >
                                        <div className="hstack gap-2 justify-content-end">
                                            <Button
                                                type="button"
                                                className="btn btn-sm btn-light"
                                                onClick={() => {
                                                    backToUserChat();
                                                    // cleanup
                                                    setFirstName("");
                                                    setLastName("");
                                                    setPhone("");
                                                    setTag(null);
                                                    setLifeCycle(null);
                                                    setUser(null);
                                                    setCountry(null);
                                                    setFirstNameValidation(
                                                        false
                                                    );
                                                    setLastNameValidation(
                                                        false
                                                    );
                                                    setPhoneValidation(null);
                                                }}
                                            >
                                                {" "}
                                                {t("Cancel")}
                                            </Button>
                                            <Button
                                                type="button"
                                                className="btn btn-sm btn-success"
                                                onClick={handleAddContact}
                                                //disabled={campaign ? false : true}
                                            >
                                                {t("Add Contact")}
                                            </Button>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </React.Fragment>
    );
};

export default AddContact;
