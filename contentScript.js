chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "getArticles") {
    try {
        const articles = Array.from(document.querySelectorAll('article'))
          .map(article => {
            const el = article.querySelector('.whitespace-pre-wrap');
            return el ? el.innerText : null;
          }).filter(text => text !== null);
        console.log(articles);
        sendResponse({articles : articles});
    } catch (error) {
        sendResponse({ articles: "your query failed bro"});
    }

  }
  return true; // Keep the message channel open for async response
});