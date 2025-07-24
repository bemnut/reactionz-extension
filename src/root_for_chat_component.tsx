/*
 *   Copyright (c) 2023 R3BL LLC
 *   All rights reserved.
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */
//import React from "react";

import React, { useEffect, useState } from "react";
import ReactDom from "react-dom/client";
// import { changeBackground } from "./message_passing";
// import { BrowserRouter } from "react-router-dom";
import { RouterProvider, createHashRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices";

import ChatComponent from "./pages/Chat/ChatComponent";

//Chat

//login
import Login from "./pages/Authentication/Login";
// import ForgetPasswordPage from "./pages/Authentication/ForgetPassword";
// import Logout from "./pages/Authentication/Logout";
// import Register from "./pages/Authentication/Register";
import RTLWrapper from "./pages/RTLWrappper";
import ChatState from "./pages/Chat/ChatState";

const router = createHashRouter([
    { path: "/", element: <ChatComponent /> },
]);

const store = configureStore({ reducer: rootReducer, devTools: true });
const root = ReactDom.createRoot(document.getElementById("root"));
//basename={process.env.PUBLIC_URL}
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <RTLWrapper>
                <RouterProvider router={router} />
            </RTLWrapper>
        </React.StrictMode>
    </Provider>
);
