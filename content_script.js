console.log("content_script.js");
console.log(document.location.href)

chrome.runtime.onMessage.addListener(function(cmd, sender, sendResponse) {
    console.log("chrome.runtime.onMessage: "+cmd);
    switch(cmd) {
    case "getHtml":
        // retrieve document HTML and send to popup.js
        sendResponse({title: document.title, url: window.location.href, html: document.documentElement.innerHTML});
        break;
    case "getHeadTitle":
        // retrieve title HTML and send to popup.js
        sendResponse(document.getElementsByTagName("title")[0].innerHTML);
        break;      
    default:
        sendResponse(null);
    }
});
