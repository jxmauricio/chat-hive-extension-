chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "getArticles") {
    //const articles = Array.from(document.querySelectorAll('article')[2].querySelector('.whitespace-pre-wrap').innerText);
    sendResponse({articles:"I am a response from the content script!"});
  }
});