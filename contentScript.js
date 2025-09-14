chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "getArticles") {
    try {
      const urlParts = window.location.href.split("/")
      console.log(urlParts)
      var conversationId = urlParts[urlParts.length - 1];
      var conversationLink = window.location.href;
      var model = "ChatGPT"
      var conversationPayload = {
        conversationId,
        conversationLink,
        model 
      }
      console.log(conversationPayload)
      const articles = [...document.querySelectorAll("article")];
      //grab user questions
      const userInput = articles
        .map((article) => {
          const el = article.querySelector(".whitespace-pre-wrap");
          return el ? el.innerText : null;
        })
        .filter((text) => text !== null);
      console.log("User Input",userInput)
      // grab ai answers
      const aiOutput = articles.map((article) => {
        const el = [...article
          .querySelectorAll("[data-start]")]
          .map((el) => el.innerText)
          .join(" ");
        return el ? el : null;
      }).filter((text) => text !== null);
      console.log("Ai Output",aiOutput)
      var messages = [];
      for (let i = 0; i < userInput.length; i++) {
        messages.push({ role: "user", content: userInput[i] });
        messages.push({ role: "assistant", content: aiOutput[i] });
      }
      console.log("Finished up the for loop")
      console.log(messages)
      conversationPayload.messages = messages;
      console.log(conversationPayload)
      sendResponse({ articles: conversationPayload});
    } catch (error) {
      console.log(error)
      sendResponse({ articles: "query failed bruh bruh"});
    }
  }
  return true; // Keep the message channel open for async response
});
