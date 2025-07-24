import React, { useEffect, useState } from "react";
import { Button, Input, Label, Form } from "reactstrap";

//Import Icons
import * as Yup from "yup";
import { useFormik } from "formik";

import { isEmpty } from "lodash";
//redux
import { useSelector, useDispatch } from "react-redux";
import {
    sendAttachment as onSendAttachment,
    changeFileState as onChangeFileState,
    getUploadStatus as onGetUploadStatusApi,
    changeFileStatusState as changeFileStatusStateAction,
    uploadFile as onUploadFileApi,
    sendAttachment as onSendAttachmentApi,
} from "../../slices/thunks";

import defaultImage from "../../assets/images/landing/bg-pattern.png";

import { createSelector } from "reselect";

import { setReactonzContentTypeHeader } from "../../helpers/api_helper";
import { useTranslation } from "react-i18next";

import { getFileType } from "./common_functions";

const SendImageMessagePane = ({
    imagePicker,
    imageFileInput,
    setImagePicker,
    selectedContact,
    selectedChannel,
    textMessage,
    setTextMessage,
    selectedFile,
    setSelectedFile,
}) => {
    const dispatch = useDispatch<any>();
    const { t } = useTranslation();

    const selectChatState = (state) => state;
    const chatProperties = createSelector(selectChatState, (state) => ({
        file: state.File.file,
        fileStatus: state.File.fileStatus,
    }));
    // Inside your component
    const { file, fileStatus } = useSelector(chatProperties);

    //
    const validation: any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            selectedFile: selectedFile,
        },
        validationSchema: Yup.object({
            //     name: Yup.string().required("Please Enter Name"),
            //     phone: Yup.string().required("Please Enter Phone"),
        }),
        onSubmit: (values) => {
            if (
                !isEmpty(selectedChannel) &&
                !isEmpty(selectedContact) &&
                selectedFile
            ) {
                dispatch(onChangeFileState(null));
                // reset content type to multipart/form-data
                setReactonzContentTypeHeader("form");

                // create and set the form data
                const formData = new FormData();
                formData.append("file", selectedFile);

                // upload the file
                dispatch(onUploadFileApi(formData));

                // reset content type to json
                setReactonzContentTypeHeader();
                //setSelectedFile(null);

                //cleanup data
            }
        },
    });

    // useEffect(() => {
    //     if (file?.url) {
    //         if (
    //             !isEmpty(selectedChannel) &&
    //             !isEmpty(selectedContact) &&
    //             selectedFile
    //         ) {
    //             let payload = {
    //                 contactId: selectedContact.id,
    //                 channelId: selectedChannel.id,
    //                 message: {
    //                     type: "attachment",
    //                     attachment: {
    //                         type: getFileType(selectedFile),
    //                         url: file.url,
    //                     },
    //                 },
    //             };
    //             if (getFileType(selectedFile) == "image") {
    //                 payload["message"]["attachment"]["caption"] = textMessage;
    //             }

    //             dispatch(onSendAttachment(payload));

    //             //cleanup data
    //             dispatch(onChangeFileState(null));
    //             setSelectedFile(null);
    //             setImagePicker(false);
    //             setTextMessage("");
    //         }
    //     }
    // }, [file]);

    // /** get file uuid from file upload and call file upload status */
    // useEffect(() => {
    //     changeFileStatusStateAction(null);
    //     file?.upload_uuid && dispatch(onGetUploadStatusApi(file?.upload_uuid));
    // }, [file]);

    // /** send audio attachment if the status is completed */
    // useEffect(() => {
    //     fileStatus?.status == "pending" &&
    //         file?.upload_uuid &&
    //         dispatch(onGetUploadStatusApi(file?.upload_uuid));
    //     if (
    //         fileStatus?.status == "completed" &&
    //         fileStatus?.file_url &&
    //         selectedContact?.id &&
    //         selectedChannel?.id
    //     ) {
    //         let payload = {
    //             contactId: selectedContact.id,
    //             channelId: selectedChannel.id,
    //             message: {
    //                 type: "attachment",
    //                 attachment: {
    //                     type: getFileType(selectedFile),
    //                     url: fileStatus?.file_url,
    //                 },
    //             },
    //         };
    //         if (getFileType(selectedFile) == "image") {
    //             payload["message"]["attachment"]["caption"] = textMessage;
    //         }

    //         dispatch(onSendAttachment(payload));

    //         //cleanup data
    //         dispatch(onChangeFileState(null));
    //         changeFileStatusStateAction(null);
    //         setSelectedFile(null);
    //         setImagePicker(false);
    //         setTextMessage("");
    //     }
    // }, [fileStatus]);

    const handleReset = (imageFileInput) => {
        if (imageFileInput.current) {
            imageFileInput.current.value = "";
            imageFileInput.current.type = "text";
            imageFileInput.current.type = "file";
            setSelectedFile(null);
        }
    };

    return (
        <React.Fragment>
            {imagePicker && (
                <div className="alert pickerImage">
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                        }}
                    >
                        <div className="ps-3 pe-1 py-2  pickerImage-topbar">
                            <h6 className="me-3" style={{}}>
                                {t("Attach File")}
                            </h6>
                            <div className="flex-shrink-0 d-block  pickerImage-topbar-close-button">
                                <Button
                                    className="btn  btn-light btn-sm shadow-none"
                                    onClick={() => setImagePicker(!imagePicker)}
                                >
                                    <i className="ri-close-line align-bottom"></i>
                                </Button>
                            </div>
                        </div>

                        <div className="pickerImage-preview">
                            {selectedFile ? (
                                <>
                                    {getFileType(selectedFile) == "image" ? (
                                        <img
                                            alt="Preview"
                                            width={"100%"}
                                            src={URL.createObjectURL(
                                                selectedFile
                                            )}
                                        />
                                    ) : (
                                        <div className="pickerImage-preview-document-wrapper">
                                            <div className="pickerImage-preview-document">
                                                <div className="icon">
                                                    <i className="ri-attachment-2 me-2"></i>
                                                </div>
                                                <div className="file-name">
                                                    <span className="line-clamp-1">
                                                        {selectedFile?.name}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <img
                                    alt="Preview"
                                    width={"100%"}
                                    src={defaultImage}
                                />
                            )}
                            {selectedFile && (
                                <Button
                                    className="btn  btn-soft-danger btn-sm shadow-none pickerImage-preview-remove-image-button"
                                    onClick={() => handleReset(imageFileInput)}
                                >
                                    <i className="ri-close-line align-bottom"></i>
                                </Button>
                            )}

                            <div className="avatar-xs p-0 rounded-circle profile-photo-edit pickerImage-preview-form">
                                <Input
                                    ref={imageFileInput}
                                    id="profile-img-file-input"
                                    type="file"
                                    className="profile-img-file-input d-none"
                                    //saccept="image/png, image/jpeg"
                                    //value={""}
                                    onChange={(event) => {
                                        setSelectedFile(event.target.files[0]);
                                    }}
                                />
                                {!selectedFile && (
                                    <Label
                                        htmlFor="profile-img-file-input"
                                        className="profile-photo-edit avatar-md"
                                        style={{
                                            cursor: "pointer",
                                        }}
                                    >
                                        <span className="avatar-title rounded-circle bg-light text-body">
                                            <i className="ri-attachment-2"></i>
                                        </span>
                                    </Label>
                                )}
                            </div>
                        </div>

                        {/* <div className="mt-3 px-3  pickerImage-form-buttons">
                            <div className="hstack gap-2 justify-content-end">
                                <Button
                                    type="button"
                                    className="btn btn-sm btn-light"
                                    onClick={() => setImagePicker(false)}
                                >
                                    {" "}
                                    {t("Cancel")}
                                </Button>
                                <Button
                                    type="submit"
                                    className="btn btn-sm btn-success"
                                    // onClick={
                                    //     toggleSendCampaignModal
                                    // }
                                    disabled={selectedFile ? false : true}
                                >
                                    {t("Send Attachment")}
                                </Button>
                            </div>
                        </div> */}
                    </Form>
                </div>
            )}
        </React.Fragment>
    );
};

export default SendImageMessagePane;
