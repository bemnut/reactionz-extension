import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "./thunk";

export const initialState = {
    user: null,
    error: null, // for error message
    loading: false,
    errorMsg: false, // for error
    isUserLoggedout: false,
    loggedInUser: null,
    loginSuccess: false,
};

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        apiError(state, action) {
            state.error = action.payload.data;
            state.loading = true;
            state.isUserLoggedout = false;
            state.errorMsg = true;
        },
        loginSuccess(state, action) {
            state.user = action.payload;
            state.loading = false;
            state.errorMsg = false;
        },
        logoutUserSuccess(state, action) {
            state.isUserLoggedout = action.payload;
            state.user = null;
        },
        reset_login_flag(state) {
            state.error = null;
            state.loading = false;
            state.errorMsg = false;
        },
        changeUserState(state, action) {
            state.user = action.payload;
        },
    },

    extraReducers: (builder) => {
        // loginUser
        builder.addCase(loginUser.fulfilled, (state, action: any) => {
            state.error = null;
            state.user = null;

            if (action.payload.status == "success") {
                state.user = {
                    id: action.payload.data.user.id,
                    workspace_id: action.payload.data.user.workspace_id,
                    name: action.payload.data.user.name,
                    email: action.payload.data.user.email,
                    role: action.payload.data.user.role,
                    avatar: action.payload.data.user.avatar,
                    status: action.payload.data.user.status,
                    language: action.payload.data.user.language,
                    restrictions: action.payload.data.user.restrictions,
                    last_login_at: action.payload.data.user.last_login_at,
                    token: action.payload.data.token,
                };

                state.loginSuccess = true;
            } else {
                state.error = action.payload;
            }
        });
        builder.addCase(loginUser.rejected, (state, action: any) => {
            state.error = action.payload.message || null;
        });

        //logoutUser
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.isUserLoggedout = false;
            if (action.payload.status == "success") {
                state.isUserLoggedout = true;
                state.user = null;
            } else {
                state.error = action.payload.message;
            }
        });
        builder.addCase(logoutUser.rejected, (state, action: any) => {
            state.error = action.payload.message || null;
        });
    },
});

export const {
    apiError,
    loginSuccess,
    logoutUserSuccess,
    reset_login_flag,
    changeUserState,
} = loginSlice.actions;

export default loginSlice.reducer;
