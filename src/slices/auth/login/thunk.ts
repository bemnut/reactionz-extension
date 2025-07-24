//Include Both Helper File with needed methods
//import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Navigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import {
    postFakeLogin,
    postJwtLogin,
    postSocialLogin,
} from "../../../helpers/fakebackend_helper";

import {
    loginUser as OnLoginUserApi,
    logoutUser as OnLogoutUserApi,
} from "../../../helpers/local_backend_helper";

import {
    loginSuccess,
    logoutUserSuccess,
    apiError,
    reset_login_flag,
    changeUserState as changeUserStateAction,
} from "./reducer";

export const changeUserState = (payload) => async (dispatch) => {
    try {
        dispatch(changeUserStateAction(payload));
    } catch (error) {}
};

import { setReactonzAuthorization } from "../../../helpers/api_helper";

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userLogin: any) => {
        try {
            const response: any = await OnLoginUserApi(userLogin);
            if (response.status == "success") {
                //sessionStorage.removeItem("authUser");
                localStorage.removeItem("authUser");
                const user = {
                    id: response.data.user.id,
                    workspace_id: response.data.user.workspace_id,
                    name: response.data.user.name,
                    email: response.data.user.email,
                    role: response.data.user.role,
                    avatar: response.data.user.avatar,
                    status: response.data.user.status,
                    language: response.data.user.language,
                    restrictions: response.data.user.restrictions,
                    last_login_at: response.data.user.last_login_at,
                    token: response.data.token,
                };
                //sessionStorage.setItem("authUser", JSON.stringify(user));
                localStorage.setItem("authUser", JSON.stringify(user));
            }
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
    try {
        //
        const response: any = await OnLogoutUserApi();
        //setReactonzAuthorization(null);
        //console.log("response before success: ", response);
        if (response.status == "success") {
            //console.log("response on success: ", response);
            sessionStorage.removeItem("authUser");
            //setReactonzAuthorization(null);
            //dispatch(logoutUserSuccess(true));
        }
        return response;
    } catch (error) {
        return error;
    }
});

// export const logoutUser = () => async (dispatch) => {
//     try {
//         sessionStorage.removeItem("authUser");
//         dispatch(logoutUserSuccess(true));
//     } catch (error) {
//         dispatch(apiError(error));
//     }
// };
