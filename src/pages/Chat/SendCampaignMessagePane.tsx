import React, { useEffect, useState } from "react";
import { Button, Label, Form } from "reactstrap";
import Select from "react-select";
import * as Yup from "yup";
import { useFormik } from "formik";

import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
    getCampaigns as onGetCampaigns,
    sendCampaignMessage as onSendCampaignMessage,
} from "../../slices/thunks";

import { createSelector } from "reselect";
import { getLoggedinUser } from "../../helpers/api_helper";
import { useTranslation } from "react-i18next";

const SendCampaignMessagePane = ({
    toggleSendCampaignModal,
    selectedContact,
}) => {
    const dispatch = useDispatch<any>();
    const { t } = useTranslation();

    const selectChatState = (state) => state;
    const chatProperties = createSelector(selectChatState, (state) => ({
        user: state.Login.user,
        campaigns: state.Campaign.campaigns,
    }));
    // Inside your component
    const { campaigns, user } = useSelector(chatProperties);

    const [campaign, setCampaign] = useState<any>("");
    const [campaignOptions, setCampaignOptions] = useState([]);

    const validation: any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            //     name: name,
            //     phone: phone,
            //campaign: campaign || [],
        },
        validationSchema: Yup.object({
            //     name: Yup.string().required("Please Enter Name"),
            //     phone: Yup.string().required("Please Enter Phone"),
        }),
        onSubmit: (values) => {
            //dispatch(loginUser(values));
            //navigate("/chat");
        },
    });

    useEffect(() => {
        const auth_user = user || getLoggedinUser();
        auth_user && dispatch(onGetCampaigns(auth_user));
    }, []);

    useEffect(() => {
        if (!isEmpty(campaigns)) {
            let options = [];
            campaigns?.map((item) => {
                item?.name &&
                    !(
                        item.name.includes("template_message") ||
                        item.name.includes("api_messag")
                    ) &&
                    options.push({
                        label: item.name,
                        value: item.id,
                    });
            });
            setCampaignOptions(options);
        }
    }, [campaigns]);

    // handle send template message
    const handleSendCampaignMessage = () => {
        const auth_user = user || getLoggedinUser();

        if (
            !isEmpty(campaign) &&
            !isEmpty(auth_user) &&
            !isEmpty(selectedContact)
        ) {
            const payload = {
                token: auth_user.token,
                campaing_id: campaign.value,
                phone: selectedContact.phone,
                // data: {
                //     reservations: {
                //         id: 1232,
                //         status: "confirmed",
                //         price: "45$",
                //     },
                //     user: {
                //         name: "Daniel",
                //         id: 12,
                //     },
                // },
            };

            dispatch(onSendCampaignMessage(payload));

            //cleanup data and close modal
            setCampaign("");
            toggleSendCampaignModal();
        }
    };

    return (
        <React.Fragment>
            <div
                className="send-campaign-message-form " //overflow-hidden
            >
                <div className="ps-3 pe-1 py-2  send-campaign-message-form-topbar">
                    <h6 className="me-3" style={{}}>
                        {t("Send Campaign Message")}
                    </h6>
                    <div className="flex-shrink-0 d-block  send-campaign-message-form-topbar-close-button">
                        <Button
                            className="btn  btn-light btn-sm shadow-none"
                            onClick={toggleSendCampaignModal}
                        >
                            <i className="ri-close-line align-bottom"></i>
                        </Button>
                    </div>
                </div>
                <div className="pt-0 send-campaign-message-form-content">
                    <div className="ps-4 p-2 ">
                        <Form
                        // onSubmit={(e) => {
                        //     e.preventDefault();
                        //     validation.handleSubmit();
                        //     return false;
                        // }}
                        //action="#"
                        >
                            <div className="my-3">
                                <Label
                                    htmlFor="campaign text-muted"
                                    className="form-label"
                                >
                                    {t("Campaign Messages")}
                                </Label>
                                <Select
                                    className="basic-single "
                                    classNamePrefix="value"
                                    defaultValue
                                    isDisabled={false}
                                    isLoading={false}
                                    isClearable={true}
                                    //isRtl={isRtl}
                                    isSearchable={true}
                                    name="campaign"
                                    placeholder={t("Select a campaign mesasge")}
                                    options={campaignOptions || []}
                                    onChange={(e: any) =>
                                        e && e.value
                                            ? setCampaign(e)
                                            : setCampaign("")
                                    }
                                    //     invalid={
                                    //         validation.touched.campaign &&
                                    //         validation.errors.campaign
                                    //             ? true
                                    //             : false
                                    //     }
                                    //     validate={{
                                    //         required: {
                                    //             value: true,
                                    //         },
                                    //     }}
                                />
                            </div>

                            <div
                                className="mt-4 send-campaign-message-form-buttons"
                                style={{ justifyContent: "flex-end" }}
                            >
                                <div className="hstack gap-2 justify-content-end">
                                    <Button
                                        type="button"
                                        className="btn btn-sm btn-light"
                                        onClick={toggleSendCampaignModal}
                                    >
                                        {" "}
                                        {t("Cancel")}
                                    </Button>
                                    <Button
                                        type="button"
                                        className="btn btn-sm btn-success"
                                        onClick={handleSendCampaignMessage}
                                        disabled={campaign ? false : true}
                                    >
                                        {t("Send Message")}
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default SendCampaignMessagePane;
