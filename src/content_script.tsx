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

//content.js

chrome.runtime.onMessage.addListener((request) => {
    //console.log("request: ", request);
    if (request.type === "popup-modal") {
        //console.log("request.type === popup-modal");
        showModal();
    }

    if (request.window_action == "logout") {
        //removeElement(document.getElementById("main-extension-wrapper"));
        localStorage.removeItem("authUser");
        showModal();
    }
    if (request.window_action == "close-window") {
        removeElement(document.getElementById("main-extension-wrapper"));
    }
    if (request.window_action == "minimize-window") {
        const pane = document.getElementById("main-extension-wrapper");
        const content = document.getElementById("reactionz-extension-content");
        if (pane && content) {
            // console.log("minimize-window: ", request.window_action);
            // console.log("content: ", content);

            pane.style.height = "46px";
            pane.style.width = "47px";
            pane.style.borderRadius = "50%";
            content.style.height = "46px";
            content.style.width = "47px";
        }
    }
    if (request.window_action == "maximize-window") {
        const pane = document.getElementById("main-extension-wrapper");
        const content = document.getElementById("reactionz-extension-content");
        if (pane && content) {
            pane.style.height = "440px";
            pane.style.width = "auto";
            pane.style.borderRadius = "0";
            content.style.borderRadius = "0";
            content.style.bottom = "0";

            if (request.font_size) {
                if (request.font_size == "big") {
                    content.style.width = "420px";
                    content.style.height = "596px";
                } else if (request.font_size == "normal") {
                    content.style.width = "380px";
                    content.style.height = "576px";
                } else if (request.font_size == "small") {
                    content.style.width = "340px";
                    content.style.height = "556px";
                }
            } else {
                content.style.width = "380px";
                content.style.height = "576px";
            }
        }
    }

    if (request.window_position) {
        updateWindowPosition(request.window_position);
    }
    if (request.font_size && !request.window_action) {
        updateWindowSize(request.font_size);
    }
    if (request.show_conversation_pane == true) {
        showConversationPane();
    } else if (request.show_conversation_pane == false) {
        removeElement(
            document.getElementById("reactionz-extension-chat-content")
        );
    }
});

//

const updateWindowSize = (size) => {
    const wrapper = document.getElementById("main-extension-wrapper");
    const pane = document.getElementById("reactionz-extension-content");

    if (pane && wrapper) {
        // rtl_wrapper.removeAttribute("screenSize");
        // rtl_wrapper.setAttribute("screenSize", size);
        // wrapper.classList.add(size);
        if (size == "big") {
            wrapper.style.height = "460px";
            pane.style.width = "420px";
            pane.style.height = "596px";
        } else if (size == "normal") {
            wrapper.style.height = "440px";
            pane.style.width = "380px";
            pane.style.height = "576px";
        } else if (size == "small") {
            wrapper.style.height = "420px";
            pane.style.width = "340px";
            pane.style.height = "556px";
        }
    }
};

const updateWindowPosition = (position) => {
    const pane = document.getElementById("main-extension-wrapper");
    if (pane) {
        if (position == "position-window-top-left-side") {
            pane.style.top = "5px";
            pane.style.left = "5px";
            pane.style.bottom = null;
            pane.style.right = null;
            pane.style.transform = null;
        } else if (position == "position-window-bottom-left-side") {
            pane.style.bottom = "5px ";
            pane.style.left = "5px ";
            pane.style.top = null;
            pane.style.right = null;
            pane.style.transform = null;
        } else if (position == "position-window-center-side") {
            pane.style.top = "50% ";
            pane.style.left = "50% ";
            pane.style.bottom = null;
            pane.style.right = null;
            pane.style.transform = "translate(-50%, -50%) ";
        } else if (position == "position-window-top-right-side") {
            pane.style.top = "5px ";
            pane.style.right = "5px ";
            pane.style.bottom = null;
            pane.style.left = null;
            pane.style.transform = null;
        } else if (position == "position-window-bottom-right-side") {
            pane.style.bottom = "5px ";
            pane.style.right = "5px ";
            pane.style.top = null;
            pane.style.left = null;
            pane.style.transform = null;
        }
    }
};
const showModal = () => {
    // cleanup if any wrapper exists
    removeElement(document.getElementById("main-extension-wrapper"));

    //get the wrapper
    const wrapperElement = document.createElement("div");
    // wrapperElement.setAttribute(
    //     "style",
    //     `
    //     height:440px;
    //     border: none;
    //     border-top-left-radius:5px;
    //     border-top-right-radius:5px;
    //     background-color:white;
    //     position: fixed;
    //     box-shadow: 0px 12px 48px rgba(29, 5, 64, 0.32);
    //     overflow: hidden;
    //     padding: 0;
    //     bottom: 5px;
    //     right: 5px;
    //     z-index: 12334;
    //     `
    // );
    wrapperElement.setAttribute(
        "style",
        `
        height: 46px;
        width: 47px;
        
        border: none;
        border-top-left-radius:5px;
        border-top-right-radius:5px;
        background-color:white;
        position: fixed; 
        box-shadow: 0px 12px 48px rgba(29, 5, 64, 0.32);
        overflow: hidden;
        padding: 0;
        bottom: 5px;
        right: 5px;
        z-index: 12334;
        border-radius: 50%;
        `
    );
    // height:60px;
    // width: 66px;
    //
    // height: 46px;
    // width: 49px;
    //
    //sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
    wrapperElement.setAttribute("id", `main-extension-wrapper`);
    // wrapperElement.innerHTML = `<iframe id="reactionz-extension-content"; style="height:576px; width: 380px; border: 0;" allow="microphone"></iframe>
    //             <div style="position:absolute; top:0px; right:-2px;">
    //             `;
    // height: 65px;
    // width: 52px;
    //
    // height:61px;
    // width: 66px;

    wrapperElement.innerHTML = `<iframe id="reactionz-extension-content"; style="height:46px; width: 47px; border: 0; border-radius: 50%; position: relative; bottom:2px;" allow="microphone" allow="autoplay"></iframe>
                <div style="position:absolute; top:0px; right:-2px;">
                `;
    document.body.appendChild(wrapperElement);

    // load window position
    // chrome.storage.local.get("window_position", function (result) {
    //     updateWindowPosition(result.window_position);
    // });

    chrome.storage.local.get("window_position", function (result) {
        if (result.window_position) {
            updateWindowPosition(result.window_position);
        } else {
            chrome.storage.local.set({
                window_position: "position-window-bottom-right-side",
            });
        }
    });

    //
    const iframe: any = document.querySelector(
        "#main-extension-wrapper #reactionz-extension-content"
    ); //.contentWindow;

    // .contentWindow
    //console.log("iframe: ", iframe);
    iframe.setAttribute("allow", "microphone");
    iframe.src = chrome.runtime.getURL("index.html");
};

const showConversationPane = () => {
    removeElement(document.getElementById("reactionz-extension-chat-content"));
    const el = document.body.querySelector("[data-rbd-droppable-id='2-1']");
    if (el) {
        const parent = el.parentElement;
        if (parent) {
            const iframe = document.createElement("iframe");
            iframe.setAttribute(
                "style",
                `
                
                width: 380px; 
                height: 510px;
                border: 0;
                allow: autoplay
                `
            );
            //height:576px;

            //sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
            iframe.setAttribute("id", `reactionz-extension-chat-content`);
            iframe.setAttribute("class", `sc-iBtBCC jzOODa`);

            iframe && iframe.setAttribute("allow", "microphone");
            iframe &&
                (iframe.src = chrome.runtime.getURL(
                    "contact_conversation.html"
                ));

            parent.append(iframe);
        }
    }
};

function removeElement(element) {
    element && element.parentNode && element.parentNode.removeChild(element);
}

showModal();
