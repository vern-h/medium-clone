import "./index.css";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NewPost from "@/pages/NewPost";
import PostDetail from "@/pages/PostDetail";
import { jwtDecode } from "jwt-decode";

// App 主體元件
function App() {
  // 使用者的 JWT token 與名稱
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate(); // 用於導向不同頁面

  // 頁面載入後，從 localStorage 取得登入資訊
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      try {
        const decoded: any = jwtDecode(savedToken); // 解碼 token 拿使用者名稱
        setToken(savedToken);
        setUsername(decoded.username);
      } catch {
        // 如果 token 解析失敗，移除並清空狀態
        localStorage.removeItem("token");
        setToken(null);
        setUsername(null);
      }
    }
  }, []);

  // 成功登入後更新 token 與使用者狀態
  const handleLoginSuccess = (newToken: string, newUsername: string) => {
    setToken(newToken);
    setUsername(newUsername);
    localStorage.setItem("token", newToken); // 儲存於 localStorage 供刷新後使用
  };

  // 登出處理：清除 localStorage 與狀態，導回登入頁
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUsername(null);
    navigate("/login");
  };

  return (
    <>
      {/* 導覽列（上方固定） */}
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        {/* 左側：Logo */}
        <Link to="/">
          <img
            src="https://miro.medium.com/max/8978/1*s986xIGqhfsN8U--09_AdA.png"
            className="h-10 hidden sm:block cursor-pointer"
            alt="Medium Logo"
          />
        </Link>

        {/* 右側：依登入狀態切換按鈕 */}
        <div className="flex items-center space-x-4">
          {token ? (
            <>
              {/* 已登入狀態：顯示歡迎語、發文與登出 */}
              <span className="text-gray-700 hidden sm:inline">👋 Hi, {username}</span>
              <Link to="/new" className="text-gray-500 hover:underline">Write</Link>
              <button onClick={handleLogout} className="text-gray-500 hover:underline">Logout</button>
            </>
          ) : (
            <>
              {/* 未登入狀態：顯示登入與註冊連結 */}
              <Link to="/login" className="text-gray-500 hover:underline">Login</Link>
              <Link to="/register" className="text-gray-500 hover:underline">Register</Link>
            </>
          )}
        </div>
      </nav>

      {/* 主要內容區：根據路由載入不同頁面 */}
      <div className="py-8 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLoginSuccess} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/new" element={<NewPost />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </div>
    </>
  );
}

// 外層包一層 Router，使整個應用支援前端路由
export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}