import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);

  const saveChat = () =>
    chrome.runtime.sendMessage(
      { action: "getArticles", data: "yourData" },
      (response) => {
        console.log(response)
        setArticles(response.articles)
      }
    );

  return (
    <>
      <h1>Would you like to save this chat?</h1>
      <div className="card">
        <button onClick={() => saveChat()}>Save Chat!</button>
      </div>
      <div>
        <h2>Articles</h2>
        <p>{articles}</p>
      </div>
    </>
  );
}

export default App;
