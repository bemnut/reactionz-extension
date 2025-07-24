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

// function polling() {
//     // console.log("polling");
//     setTimeout(polling, 1000 * 30);
// }

// polling();

chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: "popup-modal" });
    });
});

chrome.runtime.onMessage.addListener(function (message, sender) {
    // /console.log("message bg: ", message);
    if (message.sendBack) {
        chrome.tabs.sendMessage(sender.tab.id, message.data);
    }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.tabChanged === true) {
        //console.log("url changed");
    }
    // console.log("message: ", message);
    // const pane = document.getElementById("nav-questions");
    // console.log("pane: ", pane);
});

// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//     if (changeInfo.url) {
//         console.log("changeInfo: ", changeInfo);
//         console.log("changeInfo.url: ", changeInfo.url);
//         console.log(" tab.url : ", tab.url);
//         chrome.tabs.sendMessage(tabId, { tabChanged: true, url: tab.url });
//     }
// });

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // check for a URL in the changeInfo parameter (url is only added when it is changed)
    if (changeInfo.url) {
        // calls the inject function
        //injectScript(tabId);
    }
});

/* Set for initial active tab when open the sidepanel */
// (async () => {
//     const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
//     setActiveURL(tab.url);
//   })();

//   chrome.tabs.onActivated.addListener(async (activeInfo) => {
//     const tab = await chrome.tabs.get(activeInfo.tabId);
//     if (tab.active) {
//       console.log("======= active tab url", tab.url);
//       setActiveURL(tab.url);
//     }
//   });

//   chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
//     if (tab.active) {
//       console.log("======= active tab url", tab.url);
//       setActiveURL(tab.url);
//     }
//   });

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    const tabInfo = await chrome.tabs.get(tabId);
    if (tabInfo.active) {
        // console.log("======= active tab url", tabInfo.url);
        if (changeInfo.url && changeInfo.url.includes("app.fireberry.com")) {
            //console.log("changeInfo.url: ", changeInfo.url);
            chrome.tabs.sendMessage(tabId, { tabChanged: true, url: tab.url });
        }
    }
});

// document.addEventListener("DOMContentLoaded", function () {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         chrome.tabs.sendMessage(tabs[0].id, { type: "popup-modal" });
//     });
// });
// window.onload = function () {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         chrome.tabs.sendMessage(tabs[0].id, { type: "popup-modal" });
//     });
// };
