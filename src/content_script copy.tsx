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

// import { changeBackgroundListener } from "./message_passing"

// chrome.runtime.onMessage.addListener(changeBackgroundListener)

import Chat from "./pages/Chat";

//content.js
chrome.runtime.onMessage.addListener((request) => {
    if (request.type === "popup-modal") {
        showModal();
    }
});
const showModal = () => {
    const modal = document.createElement("dialog");
    modal.setAttribute(
        "style",
        `
        height:440px;
        border: none;
        top:150px;
        border-top-left-radius:5px;
        border-top-right-radius:5px;
        background-color:white;
        position: fixed; 
        box-shadow: 0px 12px 48px rgba(29, 5, 64, 0.32);
        overflow: hidden;
        padding: 0;
        `
    );
    modal.innerHTML = `<iframe id="popup-content"; style="height:576px; width: 380px"></iframe>
                <div style="position:absolute; top:0px; right:-2px;">
                <button style="padding: 0px 12px; font-size: 16px; border: none; border-radius: 20px;">x</button>
                </div>`;
    document.body.appendChild(modal);
    const dialog = document.querySelector("dialog");
    dialog.showModal();
    //element: HTMLImageElement;
    const iframe = document.getElementById(
        "popup-content"
    ) as HTMLIFrameElement;
    //console.log("iframe: ", iframe);
    //iframe.src = <Chat />;
    iframe.src = chrome.runtime.getURL("index.html");
    //console.log("iframe.src: ", iframe.src);
    // iframe.onload = () => {
    //     iframe.contentWindow.postMessage(
    //         { call: "sendValue", value: innerHtml },
    //         "*"
    //     );
    // };
    //iframe.frameBorder = "0";
    dialog.querySelector("button").addEventListener("click", () => {
        dialog.close();
        console.log("clicked");
    });
};
