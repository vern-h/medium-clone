import { useState, useEffect } from "react"; 
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button"; 
import { useNavigate } from "react-router-dom"; // 用於導頁功能
import { jwtDecode } from "jwt-decode"; // 用來解析 token
import axios from "axios"; // HTTP 請求套件

export default function NewPost() {
  // 狀態管理
  const [title, setTitle] = useState(""); 
  const [content, setContent] = useState(""); 
  const [images, setImages] = useState<string[]>([]); 
  const [username, setUsername] = useState(""); 

  const navigate = useNavigate(); // 用於導頁

  // 掛載時從 localStorage 中取得登入的 username
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token); // 解碼 token
        setUsername(decoded.username); // 儲存登入者名稱
      } catch (err) {
        console.error("Token 解析失敗", err);
      }
    }
  }, []);

  // 處理圖片上傳並轉成 base64 存入 state
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            setImages((prev) => [...prev, reader.result as string]); // 加入新圖片
          }
        };
        reader.readAsDataURL(file); // 將圖片轉為 base64
      });
    }
  };

  // 刪除圖片預覽
  const handleDeleteImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index)); // 移除指定 index 圖片
  };

  // 發送貼文資料至後端
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newPost = {
        id: Date.now(), // 前端臨時 id，後端會使用 MongoDB 自動生成 _id
        title,
        content,
        images,
        author: username,
        createdAt: new Date().toISOString(), // 傳送目前時間
      };

      const res = await axios.post("http://localhost:3000/api/posts", newPost);

      console.log("✅ Post created:", res.data); // 成功後顯示貼文
      navigate("/"); // 發佈成功後回首頁
    } catch (err) {
      console.error("❌ 發佈失敗", err);
      alert("❌ 發佈失敗");
    }
  };

  return (
    <div className="bg-white min-h-screen px-4 sm:px-8 py-6">
      <div className="max-w-4xl mx-auto">
        {/* 上方導覽列：顯示草稿使用者名稱與發佈按鈕 */}
        <div className="flex justify-between items-center mb-8">
          <span className="text-sm text-gray-500">Draft in <b>{username || "..."}</b></span>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-green-200 text-green-800 hover:bg-green-300 text-sm px-4 py-1 rounded-full"
          >
            Publish
          </Button>
        </div>

        {/* 輸入標題 */}
        <textarea
          rows={1}
          placeholder="Title"
          className="w-full text-3xl sm:text-6xl font-serif font-bold resize-none border-none focus:outline-none bg-transparent mb-6 placeholder:text-gray-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* 圖片上傳區塊 */}
        <div className="mb-4">
          <label className="flex items-center gap-2 cursor-pointer text-gray-500 hover:text-black">
            <span className="text-3xl font-light">＋</span> Add images
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* 圖片預覽清單 */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {images.map((img, idx) => (
              <div key={idx} className="relative">
                <img src={img} alt={`upload-${idx}`} className="rounded-md object-cover w-full h-48" />
                <button
                  onClick={() => handleDeleteImage(idx)}
                  type="button"
                  className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded hover:bg-opacity-80"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 文章內容 */}
        <textarea
          rows={15}
          placeholder="Tell your story..."
          className="w-full border-0 resize-none bg-transparent focus:ring-0 focus:outline-none text-base sm:text-lg placeholder:text-gray-400 font-light"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  );
}