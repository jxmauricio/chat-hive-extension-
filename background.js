chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getArticles") {
        // Send message to content script
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "getArticles", data: "scrape event received" }, (response) => {
                console.log(response)
                sendResponse(response);
            });
            } else {
            sendResponse({ error: "No active tab found" });
            }
        });
    }
    return true
});