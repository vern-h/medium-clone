import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// 用於跳轉頁面
import { useNavigate } from "react-router-dom";

// 解碼 JWT，用來取得登入者的 username
import { jwtDecode } from "jwt-decode";

// 接收從父元件傳入的函式（登入後處理）
interface LoginProps {
  onLogin: (token: string, username: string) => void;
}

// 登入元件
export default function Login({ onLogin }: LoginProps) {
  // 使用者輸入的 email / 密碼
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 錯誤訊息
  const [error, setError] = useState("");

  // 用於導頁
  const navigate = useNavigate();

  // 登入提交處理
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // 防止頁面重整
    setError(""); // 每次 submit 前清除錯誤訊息

    try {
      // 發送登入請求
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // 若回傳非 200 OK，則丟出錯誤
      if (!res.ok) throw new Error("Login failed");

      // 解析回傳的 JSON
      const data = await res.json();

      // 使用 jwtDecode 解出 username
      const decoded: any = jwtDecode(data.token);

      // 將 token 存入 localStorage
      localStorage.setItem("token", data.token);

      // 呼叫父層傳入的登入處理函式（保存登入狀態）
      onLogin(data.token, decoded.username);

      // 顯示成功提示並跳轉回首頁
      alert("Login successful!");
      navigate("/");
    } catch (err: any) {
      // 若有錯誤則顯示在畫面上
      setError(err.message || "Login failed. Please try again.");
    }
  };

  // 登入畫面 JSX
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md text-center space-y-6">
        {/* 標題 */}
        <h1 className="text-2xl font-semibold">Sign In With Email</h1>

        {/* 說明文字 */}
        <p className="text-gray-600 text-sm">
          Enter the email address & password associated with your account, and we'll send you right to home page.
        </p>

        {/* 錯誤訊息區塊（若有錯誤才顯示） */}
        {error && <div className="text-red-500 bg-red-100 p-2 rounded">{error}</div>}

        {/* 登入表單 */}
        <form onSubmit={handleLogin} className="space-y-4 pt-4">
          <Input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // 更新 email 狀態
          />
          <Input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // 更新密碼狀態
          />
          <Button type="submit" className="w-full">Continue</Button>
        </form>

        {/* 註冊提示文字 */}
        <p className="text-sm text-gray-600">
          Don’t have an account?{" "}
          <span
            className="text-green-600 font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}