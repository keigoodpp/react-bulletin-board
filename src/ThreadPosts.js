//ThreadPosts.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ThreadPosts.css";

function ThreadPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [newPost, setNewPost] = useState(""); // 新しい投稿の内容を保持する状態を追加
  const { threadId } = useParams();

  useEffect(() => {
    fetch(
      `https://railway.bulletinboard.techtrain.dev/threads/${threadId}/posts`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setPosts(data.posts))
      .catch((error) => setError(error.message));
  }, [threadId]);

  const handlePostSubmit = () => {
    // メッセージを投稿するための関数
    fetch(
      `https://railway.bulletinboard.techtrain.dev/threads/${threadId}/posts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post: newPost, // 新しい投稿の内容
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // 新しい投稿を追加して投稿一覧を更新
        setPosts([...posts, data]);
        setNewPost(""); // フォームをクリア
      })
      .catch((error) => setError(error.message));
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="post-list-container">
      <h2>投稿一覧</h2>
      {/* メッセージ投稿フォーム */}
      <div className="post-form">
        <textarea
          rows="4"
          cols="50"
          placeholder="メッセージを入力してください"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        ></textarea>
        <button onClick={handlePostSubmit}>投稿</button>
      </div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.post}</li>
        ))}
      </ul>
    </div>
  );
}

export default ThreadPosts;
