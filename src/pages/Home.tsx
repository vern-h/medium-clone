// React hooks
import { useEffect, useState } from "react";

// 用於客戶端路由跳轉
import { Link } from "react-router-dom";

// lucide-react 的 icon
import { Calendar, MessageCircle, Eye } from "lucide-react";

// 發送 HTTP 請求
import axios from "axios";

// 預設的五篇推薦文章，會顯示在首頁與 sidebar（右側欄）
const examplePosts = [
  {
    id: 1,
    title: "Understanding React Context",
    tag: "React",
    author: "Jane Doe",
    date: "July 17, 2025",
    views: 1234,
    comments: 6,
    image: "https://i.ytimg.com/vi/I-Q60UIpBrM/maxresdefault.jpg",
  },
  {
    id: 2,
    title: "Intro to Tailwind CSS",
    tag: "CSS",
    author: "John Smith",
    date: "July 16, 2025",
    views: 834,
    comments: 3,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvA00GaUwlwEKhXxDgarATH7yRlRh3utSexQ&s",
  },
  {
    id: 3,
    title: "Why TypeScript is Taking Over JavaScript",
    tag: "TypeScript",
    author: "Emily Stone",
    date: "July 15, 2025",
    views: 920,
    comments: 5,
    image: "https://cdn.thenewstack.io/media/2022/01/10b88c68-typescript-logo.png",
  },
  {
    id: 4,
    title: "10 UX Laws Every Developer Should Know",
    tag: "UX Design",
    author: "Mark Li",
    date: "July 14, 2025",
    views: 1456,
    comments: 9,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5iEUTZ_sPEYn9KiWrHPjz9i7c80WrbXoSgw&s",
  },
  {
    id: 5,
    title: "How AI Is Changing Frontend Development",
    tag: "AI",
    author: "Sara Chen",
    date: "July 13, 2025",
    views: 1883,
    comments: 12,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3L3BAyaO26EaWy_JvjzJLv2CS9Bnep_vEYxJJ8MS4bZQUOknuywFDjts_RFc-c8l2HmA&usqp=CAU",
  },
];

// 定義 Post 資料型別（本地貼文和 MongoDB 貼文可能有不同 id 命名）
type Post = {
  _id?: string;
  id?: string;
  title: string;
  tag?: string;
  author: string;
  date: string;
  views?: number;
  comments?: number;
  image?: string;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  // 元件掛載時從後端 API 取得貼文資料，並與預設範文合併
  useEffect(() => {
    axios.get("http://localhost:3000/api/posts")
      .then((res) => {
        // 將後端回傳資料加工，加上隨機 views / comments
        const backendPosts: Post[] = res.data.map((post: any) => ({
          ...post,
          date: post.createdAt || post.date,
          views: Math.floor(Math.random() * 1000),
          comments: Math.floor(Math.random() * 10),
        }));

        // 合併預設範文與使用者貼文
        setPosts([...examplePosts, ...backendPosts]);
      })
      .catch((err) => {
        console.error("Failed to load posts", err);
        // 若 API 請求失敗則僅顯示範文
        setPosts(examplePosts);
      });
  }, []);

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8 gap-10">
      {/* 主內容區域（貼文列表） */}
      <div className="flex-1 space-y-8">
        {posts.map((post) => (
          <div
            key={post._id || post.id}
            className="flex flex-col sm:flex-row border-b pb-6 gap-4 sm:gap-6 hover:bg-gray-50 p-4 rounded transition"
          >
            {/* 貼文文字區塊 */}
            <div className="flex-1 space-y-2">
              <Link to={`/post/${post._id || post.id}`}>
                <h2 className="text-xl font-bold text-gray-900 hover:underline">{post.title}</h2>
              </Link>

              <span className="inline-block bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-medium">
                In {post.tag || "General"} by <span className="font-semibold">{post.author}</span>
              </span>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-1">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  {new Date(post.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Eye size={16} /> {post.views}
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle size={16} /> {post.comments}
                </div>
              </div>
            </div>

            {/* 貼文縮圖 */}
            <img
              src={post.image || post.images?.[0] || "https://source.unsplash.com/random/400x300?" + post.tag}
              alt={post.title}
              className="w-full sm:w-40 h-40 sm:h-28 object-cover rounded-md"
            />
          </div>
        ))}
      </div>

      {/* 側邊欄區域（僅在中大型螢幕顯示在右側，小螢幕會自動顯示在下方） */}
      <div className="w-full md:w-64 space-y-8">
        {/* 推薦文章（Staff Picks） */}
        <div>
          <div className="border-b pb-2 mb-2 text-sm font-semibold text-gray-700">Staff Picks</div>
          <ul className="space-y-4">
            {examplePosts.map((post) => (
              <li key={post.id}>
                <Link to={`/post/${post.id}`} className="flex items-start gap-3 hover:bg-gray-50 p-2 rounded transition">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="text-sm text-gray-800 font-medium">{post.title}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 推薦標籤（Recommended Tags） */}
        <div>
          <div className="border-b pb-2 mb-2 text-sm font-semibold text-gray-700">Recommended Tags</div>
          <div className="flex flex-wrap gap-2 text-sm">
            {["React", "CSS", "TypeScript", "UX Design", "AI"].map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full hover:bg-gray-200 cursor-default"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}