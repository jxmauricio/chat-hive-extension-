import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);

  const saveChat = () =>
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "getArticles" },
        (response) => {
          if (response && response.articles) {
            setArticles(response.articles);
          }
        }
      );
    });

  return (
    <>
      <h1>Would you like to save this chat?</h1>
      <div className="card">
        <button
          onClick={() => saveChat()}
        >
          Save Chat!
        </button>
      </div>
      <div>
        <h2>Articles</h2>
        <p>{JSON.stringify(articles,null,2)}</p>
      </div>
    </>
  );
}

export default App;
