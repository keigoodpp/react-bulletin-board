// Header.js
import React from "react";
import "./Header.css"; // Header コンポーネント専用のスタイルシート
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="Header">
      <h1>掲示板</h1>
      <nav>
        <ul>
          <li>
            <Link to="/thread/new">スレッドを立てる</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
