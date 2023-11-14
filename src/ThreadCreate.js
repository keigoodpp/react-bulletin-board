//ThreadCreate.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigateをインポート
import "./ThreadCreate.css";

function ThreadCreate() {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // useNavigateフックを使ってnavigate関数を取得

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsLoading(true);
    setError(null);

    fetch("https://railway.bulletinboard.techtrain.dev/threads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // 成功した場合のリダイレクト処理
        navigate("/"); // スレッドリストページ（通常はホームページ）へリダイレクト
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="thread-create-container">
      <h1 className="thread-create-title">新規スレッド作成</h1>
      <form onSubmit={handleSubmit} className="thread-create-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="スレッドのタイトル"
          className="thread-create-input"
        />
        <button type="submit" className="thread-create-submit">
          作成
        </button>
      </form>
    </div>
  );
}

export default ThreadCreate;
