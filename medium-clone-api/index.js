// 引入必要的第三方套件
const express = require("express"); // 建立 Express 應用程式
const cors = require("cors"); // 解決跨域請求問題
const bodyParser = require("body-parser"); // 用來解析 request body 的中介軟體
const jwt = require("jsonwebtoken"); // 處理 JSON Web Token 的套件
const Post = require("./models/Post"); // 預留未來與資料庫連結的 Post model，目前未使用

// 初始化 Express 應用
const app = express();

// 設定中介層：允許跨域、設定 JSON 與 URL 編碼資料的大小限制
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// 使用者與貼文暫存在記憶體的陣列（實際應改為資料庫）
const users = [];
const posts = []; // 儲存所有貼文的陣列

const SECRET = "your-secret-key"; // JWT 用的密鑰

// 建立貼文 API（POST 請求，路由為 /api/posts）
app.post("/api/posts", (req, res) => {
  // 從請求中解構出貼文資料
  const { title, content, images, author, createdAt } = req.body;

  // 驗證必填欄位
  if (!title || !content) {
    return res.status(400).json({ message: "請填寫標題與內容" });
  }

  // 組成新的貼文物件（以 timestamp 當作 id）
  const newPost = {
    id: Date.now(),
    title,
    content,
    images,
    author,
    createdAt,
  };

  // 將貼文加入 posts 陣列
  posts.push(newPost);

  // 輸出貼文至後端控制台
  console.log("✅ 新增貼文：", newPost);

  // 回傳成功結果與新貼文資料
  res.status(201).json(newPost);
});

// 取得所有貼文（GET 請求，路由為 /api/posts）
app.get("/api/posts", (req, res) => {
  res.json(posts); // 回傳所有貼文資料
});

// 取得單篇貼文（GET 請求，路由為 /api/posts/:id）
app.get("/api/posts/:id", (req, res) => {
  const id = Number(req.params.id); // 將 id 轉成數字
  const post = posts.find((p) => p.id === id); // 在陣列中尋找相符的貼文
  if (!post) {
    return res.status(404).json({ message: "找不到貼文" }); // 若找不到，回傳錯誤
  }
  res.json(post); // 回傳找到的貼文
});

// 使用者註冊功能（POST 請求，路由為 /api/register）
app.post("/api/register", (req, res) => {
  const { username, email, password } = req.body;

  // 檢查欄位是否齊全
  if (!username || !email || !password) {
    return res.status(400).json({ message: "缺少欄位" });
  }

  // 確認 email 是否已被註冊
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(409).json({ message: "Email 已被註冊" });
  }

  // 加入新使用者到 users 陣列中
  users.push({ username, email, password });

  // 回傳成功訊息
  res.status(200).json({ message: "註冊成功" });
});

// 使用者登入功能（POST 請求，路由為 /api/login）
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // 在使用者清單中找出相符帳密
  const user = users.find((u) => u.email === email && u.password === password);

  // 找不到使用者即登入失敗
  if (!user) {
    return res.status(401).json({ message: "登入失敗" });
  }

  // 產生 JWT token（有效時間為 1 小時）
  const token = jwt.sign({ email: user.email, username: user.username }, SECRET, {
    expiresIn: "1h",
  });

  // 回傳 token 給前端儲存
  res.status(200).json({ token });
});

// 啟動後端伺服器，監聽在 localhost:3000
app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
//   content,
//   images,
//   author,
//   createdAt: req.body.createdAt || Date.now(), // ✅ 兩種都保險
// });