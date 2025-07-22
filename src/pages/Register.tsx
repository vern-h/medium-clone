import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// 註冊頁面元件
export default function Register() {
  // 狀態管理：使用者填寫的欄位與錯誤訊息
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 註冊送出處理函式
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();// 阻止表單預設送出行為
    setError("");

    try {
      // 呼叫後端 API 進行註冊
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",                           // 使用 POST 方法
        headers: { "Content-Type": "application/json" }, // 傳送 JSON 格式資料
        body: JSON.stringify({ username, email, password }), // 傳送註冊資料
      });

      // 如果 response 非成功狀態（例如帳號已存在）
      if (!res.ok) {
        const errorData = await res.json(); // 從 response 解析錯誤訊息
        throw new Error(errorData.message || "Register failed"); // 拋出錯誤
      }

      alert("Registration successful!"); // 成功提示
      navigate("/login");                // 跳轉到登入頁面
    } catch (err: any) {
      // 捕捉錯誤並顯示訊息
      console.error("⚠️ Registration failed:", err);
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  // 畫面渲染
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      {/* 表單容器 */}
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md text-center space-y-6">
        {/* 標題與說明 */}
        <h1 className="text-2xl font-semibold">Join Medium</h1>
        <p className="text-gray-600 text-sm">
          Create an account to get great stories in your inbox, personalize your homepage, and follow your favorite authors.
        </p>

        {/* 若發生錯誤則顯示錯誤訊息 */}
        {error && <div className="text-red-500 bg-red-100 p-2 rounded">{error}</div>}

        {/* 註冊表單 */}
        <form onSubmit={handleRegister} className="space-y-4 pt-4">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // 綁定 username 狀態
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // 綁定 email 狀態
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // 綁定 password 狀態
          />
          <Button type="submit" className="w-full">Sign up</Button>
        </form>

        {/* 已有帳號導向登入頁面 */}
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <span
            className="text-green-600 font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}