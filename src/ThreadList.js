//ThreadList.js
import React, { useEffect, useState } from "react";
import "./ThreadList.css"; // スタイルシートのインポート
import { Link } from "react-router-dom";

function ThreadList() {
  const [threads, setThreads] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://railway.bulletinboard.techtrain.dev/threads")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setThreads(data))
      .catch((error) => setError(error.message));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="outer-container">
      <h2>新着スレッド</h2>
      <ul className="thread-list-container">
        {threads.map((thread) => (
          <li key={thread.id} className="thread-item">
            <Link to={`/thread/${thread.id}`}>{thread.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ThreadList;
