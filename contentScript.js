chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "getArticles") {
    try {
        const articles = Array.from(document.querySelectorAll('article')[2].querySelector('.whitespace-pre-wrap').innerText);
        sendResponse({articles : "this ia string"});
    } catch (error) {
        sendResponse({ articles: "your query failed bro"});
    }

  }
  return true; // Keep the message channel open for async response
});