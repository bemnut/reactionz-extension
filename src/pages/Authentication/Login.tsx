import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    Col,
    Container,
    Input,
    Label,
    Row,
    Button,
    Form,
    FormFeedback,
    Alert,
    Spinner,
} from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
import classnames from "classnames";

// actions
import {
    loginUser,
    getContacts as onGetContacts,
    changeExtensionWindowStatus as changeExtensionWindowStatusState,
} from "../../slices/thunks";

import logoLight from "../../assets/images/logo-light.png";
import reactionzLogo from "../../assets/images/reactions_logo.jpg";
import reactionzMinimizedLogo from "../../assets/images/reactionz.png";
import { createSelector } from "reselect";

import { getLoggedinUser } from "../../helpers/api_helper";
//import images

import { useTranslation } from "react-i18next";
import RTLWrapper from "../RTLWrappper";
import { setReactonzAuthorization } from "../../helpers/api_helper";
import { fontSizes, changeFontSize } from "../Chat/common_functions";

const Login = (props) => {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const selectLayoutState = (state) => state;
    const loginpageData = createSelector(selectLayoutState, (state) => ({
        user: state.Login.user,
        error: state.Login.error,
        loading: state.Login.loading,
        errorMsg: state.Login.errorMsg,
        //scontacts: state.Contact.contacts,
        extensionWindowStatus: state.Layout.extensionWindowStatus,
    }));
    // Inside your component
    const { user, error, loading, errorMsg, extensionWindowStatus } =
        useSelector(loginpageData);

    const [userLogin, setUserLogin] = useState<any>([]);
    const [passwordShow, setPasswordShow] = useState(false);
    // const [extensionWindowStatus, setExtensionWindowStatus] =
    //     useState("minimize-window");
    const [fontSize, setFontSize] = useState<any>(null);
    // useEffect(() => {
    //     console.log("error: ", error);
    // }, [error]);
    useEffect(() => {
        const auth_user = user || getLoggedinUser();
        // console.log("user: ", user);
        //console.log("auth_user: ", auth_user);
        if (auth_user) {
            //!isEmpty(user) && dispatch(onGetContacts(user));
            setReactonzAuthorization(auth_user.token);
            navigate("/chat");
        } else {
            setReactonzAuthorization(null);
            navigate("/login");
        }
    }, [user]);

    const validation: any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            // email: userLogin.email || "admin@themesbrand.com" || "",
            // password: userLogin.password || "123456" || "",
            // email: userLogin.email || "roee.b@ultro.co.il" || "",
            // password: userLogin.password || "password" || "",
            email: userLogin.email || "",
            password: userLogin.password || "",
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Please Enter Your Email"),
            password: Yup.string().required("Please Enter Your Password"),
        }),
        onSubmit: (values) => {
            dispatch(loginUser(values));
            //navigate("/chat");
        },
    });

    const handleWindowAction = (action) => {
        //top: 32px;
        action?.window_action &&
            dispatch(changeExtensionWindowStatusState(action?.window_action));
        chrome.runtime.sendMessage({ sendBack: true, data: action });
    };

    useEffect(() => {
        let font_size = chrome.storage.local.get(
            "font_size",
            function (result) {
                return result.font_size;
            }
        );

        if (isEmpty(font_size)) {
            chrome.storage.local.set({ font_size: "normal" });
        }
        chrome.storage.local.get("font_size", function (result) {
            if (result.font_size) {
                setFontSize(result.font_size);
                extensionWindowStatus != "minimize-window" &&
                    chrome.runtime.sendMessage({
                        sendBack: true,
                        data: { font_size: result.font_size },
                    });
                const pane = document.getElementById("root");
                pane && changeFontSize(pane, fontSizes[result.font_size]);
            }
        });

        //
    }, []);

    document.title = "Reactionz";
    return (
        <React.Fragment>
            <div className="auth-page-content mt-lg-5">
                <div
                    className={classnames(
                        "extension-window-links-wrapper ps-2 py-1 d-flex align-items-center ",
                        {
                            "minimized-window":
                                extensionWindowStatus &&
                                extensionWindowStatus == "minimize-window",
                        }
                    )}
                >
                    {extensionWindowStatus &&
                        extensionWindowStatus == "minimize-window" && (
                            <div className="extension-window-links-logo flex-grow-1">
                                <div
                                    className="p-2"
                                    onClick={() => {
                                        handleWindowAction({
                                            window_action: "maximize-window",
                                            font_size: fontSize,
                                        });
                                    }}
                                >
                                    <img
                                        src={reactionzMinimizedLogo}
                                        className="reactionz-logo"
                                        alt=""
                                    />
                                </div>
                            </div>
                        )}
                    {extensionWindowStatus &&
                        extensionWindowStatus != "minimize-window" && (
                            <div className="flex-shrink-0 ">
                                <div className="d-flex extension-window-links">
                                    <div
                                        className="extension-window-link minimize-window mx-1"
                                        onClick={() => {
                                            handleWindowAction({
                                                window_action:
                                                    "minimize-window",
                                                font_size: fontSize,
                                            });
                                        }}
                                    >
                                        <i className="ri-subtract-line align-bottom"></i>
                                    </div>
                                    {/* <div
                                        className="extension-window-link maximize-window mx-1"
                                        onClick={() => {
                                            handleWindowAction({
                                                window_action:
                                                    "maximize-window",
                                                font_size: fontSize,
                                            });
                                            setExtensionWindowStatus(
                                                "maximize-window"
                                            );
                                        }}
                                    >
                                        <i className="ri-file-copy-line align-bottom"></i>
                                    </div> */}
                                    <div
                                        className="extension-window-link close-window mx-1"
                                        onClick={() => {
                                            handleWindowAction({
                                                window_action: "close-window",
                                                font_size: fontSize,
                                            });
                                        }}
                                    >
                                        <i className="ri-close-line align-bottom"></i>
                                    </div>
                                </div>
                            </div>
                        )}
                </div>

                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="content ">
                                <CardBody className="p-4">
                                    <div className="text-center mt-2 mb-4">
                                        <img
                                            src={reactionzLogo}
                                            className="reactionz-logo"
                                            alt=""
                                        />
                                    </div>
                                    {error && error ? (
                                        <Alert
                                            color="danger"
                                            className="small"
                                            style={{ direction: "ltr" }}
                                        >
                                            {" "}
                                            {t(error)}{" "}
                                        </Alert>
                                    ) : null}
                                    <div className="p-2 ">
                                        <Form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                validation.handleSubmit();
                                                return false;
                                            }}
                                            action="#"
                                        >
                                            <div className="mb-3">
                                                {/* <Label
                                                    htmlFor="email"
                                                    className="form-label"
                                                >
                                                    Email
                                                </Label> */}
                                                <Input
                                                    name="email"
                                                    className="form-control"
                                                    placeholder={t(
                                                        "Enter email"
                                                    )}
                                                    type="email"
                                                    onChange={
                                                        validation.handleChange
                                                    }
                                                    onBlur={
                                                        validation.handleBlur
                                                    }
                                                    value={
                                                        validation.values
                                                            .email || ""
                                                    }
                                                    invalid={
                                                        validation.touched
                                                            .email &&
                                                        validation.errors.email
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {validation.touched.email &&
                                                validation.errors.email ? (
                                                    <FormFeedback type="invalid">
                                                        {t(
                                                            validation.errors
                                                                .email
                                                        )}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                {/* <div className="float-end">
                                                    <Link
                                                        to="/forgot-password"
                                                        className="text-muted"
                                                    >
                                                        Forgot password?
                                                    </Link>
                                                </div> */}
                                                {/* <Label
                                                    className="form-label"
                                                    htmlFor="password-input"
                                                >
                                                    Password
                                                </Label> */}
                                                <div className="position-relative auth-pass-inputgroup mb-3">
                                                    <Input
                                                        name="password"
                                                        value={
                                                            validation.values
                                                                .password || ""
                                                        }
                                                        type={
                                                            passwordShow
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        className="form-control pe-5"
                                                        placeholder={t(
                                                            "Enter Password"
                                                        )}
                                                        onChange={
                                                            validation.handleChange
                                                        }
                                                        onBlur={
                                                            validation.handleBlur
                                                        }
                                                        invalid={
                                                            validation.touched
                                                                .password &&
                                                            validation.errors
                                                                .password
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched
                                                        .password &&
                                                    validation.errors
                                                        .password ? (
                                                        <FormFeedback type="invalid">
                                                            {t(
                                                                validation
                                                                    .errors
                                                                    .password
                                                            )}
                                                        </FormFeedback>
                                                    ) : null}
                                                    <button
                                                        className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                                                        type="button"
                                                        id="password-addon"
                                                        onClick={() =>
                                                            setPasswordShow(
                                                                !passwordShow
                                                            )
                                                        }
                                                    >
                                                        <i className="ri-eye-fill align-middle"></i>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* <div className="form-check">
                                                <Input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                    id="auth-remember-check"
                                                />
                                                <Label
                                                    className="form-check-label"
                                                    htmlFor="auth-remember-check"
                                                >
                                                    Remember me
                                                </Label>

                                                <div className="float-end">
                                                    <Link
                                                        to="/forgot-password"
                                                        className="text-muted"
                                                    >
                                                        Forgot password?
                                                    </Link>
                                                </div>
                                            </div> */}

                                            <div className="mt-4">
                                                <Button
                                                    color="success"
                                                    disabled={
                                                        error
                                                            ? null
                                                            : loading
                                                            ? true
                                                            : false
                                                    }
                                                    className="btn btn-success w-100"
                                                    type="submit"
                                                >
                                                    {loading ? (
                                                        <Spinner
                                                            size="sm"
                                                            className="me-2"
                                                        >
                                                            {" "}
                                                            {t(
                                                                "Loading..."
                                                            )}{" "}
                                                        </Spinner>
                                                    ) : null}
                                                    {t("Sign In")}
                                                </Button>
                                            </div>

                                            {/* <div className="mt-4 text-center">
                                                <div className="signin-other-title">
                                                    <h5 className="fs-13 mb-4 title">
                                                        Sign In with
                                                    </h5>
                                                </div>
                                                <div>
                                                    <Link
                                                        to="#"
                                                        className="btn btn-primary btn-icon me-1"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            socialResponse(
                                                                "facebook"
                                                            );
                                                        }}
                                                    >
                                                        <i className="ri-facebook-fill fs-16" />
                                                    </Link>
                                                    <Link
                                                        to="#"
                                                        className="btn btn-danger btn-icon me-1"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            socialResponse(
                                                                "google"
                                                            );
                                                        }}
                                                    >
                                                        <i className="ri-google-fill fs-16" />
                                                    </Link>
                                                    <Button
                                                        color="dark"
                                                        className="btn-icon"
                                                    >
                                                        <i className="ri-github-fill fs-16"></i>
                                                    </Button>{" "}
                                                    <Button
                                                        color="info"
                                                        className="btn-icon"
                                                    >
                                                        <i className="ri-twitter-fill fs-16"></i>
                                                    </Button>
                                                </div>
                                            </div> */}
                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>

                            {/* <div className="mt-4 text-center">
                                <p className="mb-0">
                                    Don't have an account ?{" "}
                                    <Link
                                        to="/register"
                                        className="fw-semibold text-primary text-decoration-underline"
                                    >
                                        {" "}
                                        Signup{" "}
                                    </Link>{" "}
                                </p>
                            </div> */}
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Login;
