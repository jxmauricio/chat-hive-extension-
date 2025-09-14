import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const saveChat = () => {
    setLoading(true);
    setSaved(false);
    chrome.runtime.sendMessage(
      { action: "getArticles", data: "yourData" },
      (response) => {
        setArticles(response.articles);
        setLoading(false);
        setSaved(true);
      }
    );
  };

  return (
    <>
      <h1>Would you like to save this chat?</h1>
      <div className="card">
        <button onClick={saveChat} disabled={loading}>Save Chat!</button>
      </div>
      <div>
        {loading && <p>Loading...</p>}
        {saved && <p>Saved!</p>}
      </div>
    </>
  );
}

export default App;
