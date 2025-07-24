import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import { useFormik } from "formik";

//redux
import { useSelector, useDispatch } from "react-redux";
import { getTemplates as onGetTemplatesApi } from "../../slices/thunks";

import { createSelector } from "reselect";

//
import SelectTemplateMessageModal from "./SelectTemplateMessageModal";
import FillPreviewAndSendTemplateMessage from "./FillPreviewAndSendTemplateMessage";

const SendTemplateMessage = ({
    selectedContact,
    toggleSendTemplateModal,
    selectedChannel,
}) => {
    const dispatch = useDispatch<any>();

    const selectChatState = (state) => state;
    const chatProperties = createSelector(selectChatState, (state) => ({
        user: state.Login.user,
        templates: state.Template.templates,
    }));
    // Inside your component
    const { templates, user } = useSelector(chatProperties);

    const [template, setTemplate] = useState<any>("");
    const [templateOptions, setTemplateOptions] = useState([]);

    const [
        previewAndSendTemplateMessageModal,
        setPreviewAndSendTemplateMessageModal,
    ] = useState(false);

    //Toggle PreviewAndSendTemplateMessageModal
    const togglePreviewAndSendTemplateMessageModal = (value) => {
        setPreviewAndSendTemplateMessageModal(value);
    };

    const validation: any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            //template_name: template || [],
        },
        validationSchema: Yup.object({
            // template_name: Yup.string().required(
            //     "Please select a template to send."
            // ),
        }),
        onSubmit: (values) => {},
    });

    // handle send template message
    const handleSendTemplateMessage = () => {
        // const auth_user = user || getLoggedinUser();
        // if (
        //     !isEmpty(template) &&
        //     !isEmpty(auth_user) &&
        //     !isEmpty(selectedContact) &&
        //     !isEmpty(template)
        // ) {
        //     const payload = {
        //         token: auth_user.token,
        //         phone: selectedContact.phone,
        //         template_name: template.label,
        //         template_language: templates.find(
        //             (item) => item.id == template.value
        //         )?.language,
        //     };

        //     dispatch(onSendTemplateMessage(payload));

        //     //cleanup data and close modal
        //     setTemplate("");
        //     toggleSendTemplateModal();
        // }
        togglePreviewAndSendTemplateMessageModal(true);
    };

    return (
        <React.Fragment>
            {previewAndSendTemplateMessageModal ? (
                <FillPreviewAndSendTemplateMessage
                    selectedContact={selectedContact}
                    toggleSendTemplateModal={toggleSendTemplateModal}
                    togglePreviewAndSendTemplateMessageModal={
                        togglePreviewAndSendTemplateMessageModal
                    }
                    template={template}
                    templates={templates}
                    setTemplate={setTemplate}
                    selectedChannel={selectedChannel}
                />
            ) : (
                <SelectTemplateMessageModal
                    toggleSendTemplateModal={toggleSendTemplateModal}
                    togglePreviewAndSendTemplateMessageModal={
                        togglePreviewAndSendTemplateMessageModal
                    }
                    templates={templates}
                    template={template}
                    setTemplate={setTemplate}
                />
            )}
        </React.Fragment>
    );
};

export default SendTemplateMessage;
