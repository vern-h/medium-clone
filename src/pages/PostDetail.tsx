import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// 範文資料，用於 fallback 顯示預設五篇文章
const examplePosts = [
  {
    id: 1,
    title: "Understanding React Context",
    date: "2025-07-17",
    author: "Jane Doe",
    content: `
<h3><strong>How to Simplify State Management Without Third-Party Libraries</strong></h3>

<p>If you've ever worked on a growing React application, you’ve probably felt the creeping chaos. Your component tree starts spreading like wild vines, and before long, you're passing props from grandparent to parent to child to grandchild—just to get one value where it's needed. It gets messy. Fast.</p>

<p>This is where <strong>React Context</strong> steps in like a breath of fresh air. React Context lets you share values between components <em>without manually threading props through every level</em> of your tree.</p>

<!-- INSERT IMAGE HERE -->
<img src="https://i.ytimg.com/vi/I-Q60UIpBrM/maxresdefault.jpg" alt="React Context Image" style="max-width:100%; border-radius: 6px; margin: 16px 0;" />

<p>Think of Context as a built-in tool for managing state that’s relevant across multiple parts of your app—without the need for bulky external libraries like Redux or Zustand. And the best part? It’s already part of React.</p>

<p>Here are some common use cases where React Context truly shines:</p>

<ul>
  <li><strong>Global Themes:</strong> Switch between dark and light mode from anywhere in your app.</li>
  <li><strong>User Settings:</strong> Store preferences like language, font size, or layout style.</li>
  <li><strong>Authentication:</strong> Share login status and user data across protected routes.</li>
</ul>

<p>By using Context, you eliminate the pain of "prop drilling"—passing data through multiple nested components that don’t even need it, just to get it to the one that does. This not only cleans up your code but also makes it more maintainable in the long run.</p>

<p>But there's more. Combine Context with <code>useReducer</code>, and you have a state management pattern that’s lightweight yet robust. <code>useReducer</code> is especially helpful when managing complex state transitions or when your state logic involves multiple sub-values (like user info, UI flags, and errors).</p>

<p>Here's a simple example to illustrate:</p>

<pre><code>const AuthContext = createContext();

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false };
    default:
      return state;
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false
  });

  return (
    &lt;AuthContext.Provider value={{ state, dispatch }}&gt;
      {children}
    &lt;/AuthContext.Provider&gt;
  );
}</code></pre>

<p>That’s it. Clean, readable, and powerful. You’ve now replaced a state management library with just a few lines of native React code. And more importantly, you’ve taken back control over your app’s architecture.</p>

<p>So next time your props are spiraling out of control, remember: React Context isn’t just for advanced developers—it’s for anyone who wants a smarter, simpler way to manage shared state.</p>`,
  },
  {
    id: 2,
    title: "Intro to Tailwind CSS",
    date: "2025-07-17",
    author: "John Smith",
    content: `<p><strong>Why Utility-First CSS Might Just Change Your Life</strong></p>

<p>It always starts with something small. A button. You give it a bit of padding, maybe tweak the background color, add a hover effect. Before you know it, your once-tidy stylesheet has ballooned into 400 lines of tangled class names, media queries, and overrides.</p>

<p>Enter <strong>Tailwind CSS</strong> — the utility-first CSS framework that completely changes the way you write styles. At first glance, it feels… wrong. There are no custom class names. Instead, you apply styling directly in your HTML using pre-defined utility classes.</p>

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvA00GaUwlwEKhXxDgarATH7yRlRh3utSexQ&s" 
     alt="Tailwind CSS Design Example" 
     style="display: block; margin: 16px auto; max-width: 100%; border-radius: 6px;" />

<p>But after a few hours of building, something strange happens. You stop writing CSS files altogether. You stop switching between files. You stop naming classes like <code>.btn-primary</code> or <code>.text-box-dark</code>.</p>

<p>Instead, your HTML becomes your source of truth. Tailwind lets you:</p>

<ul>
  <li>Style components with precision using utility classes like <code>px-4 py-2 bg-blue-500 hover:bg-blue-600</code></li>
  <li>Build responsive layouts using intuitive breakpoints like <code>md:flex</code> or <code>lg:grid-cols-3</code></li>
  <li>Eliminate dead CSS with built-in purging</li>
</ul>

<p>And the biggest win? Speed. You’re not going back and forth between design files and style sheets. You’re shipping features, fixing bugs, and iterating on UI—all in real-time.</p>

<blockquote>
  <p>“It feels weird at first. But once you stop fighting it, you realize: You’re shipping designs faster with fewer bugs.”</p>
</blockquote>

<p>Plus, your final CSS bundle? It’s lean. Often just a few kilobytes, thanks to Tailwind’s purge tools and Just-in-Time (JIT) compiler.</p>

<p>Here’s what a styled button looks like in Tailwind:</p>

<pre><code>&lt;button class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"&gt;
  Click Me
&lt;/button&gt;</code></pre>

<p>No need to name the component or write external rules. The style is clear, explicit, and co-located with the markup.</p>

<p>Tailwind CSS may not be for everyone, but if you crave speed, consistency, and minimal context switching, it might just become your new favorite tool.</p>`,
  },
  {
    id: 3,
    title: "Why TypeScript is Taking Over JavaScript",
    date: "2025-07-17",
    author: "Alex Johnson",
    content: `<p><strong>& How Static Types Save Your Future Self</strong></p>

<p>It’s 2:00 AM. You finally squash that tricky bug, and your feature is working. You high-five yourself. Life is good.  
Fast-forward three weeks: it breaks. You open the file, stare at your own code, and think: <em>“Who wrote this?”</em></p>

<p>That’s when you wish you had used <strong>TypeScript</strong>.</p>

<!-- CENTERED IMAGE -->
<img src="https://cdn.thenewstack.io/media/2022/01/10b88c68-typescript-logo.png" 
     alt="TypeScript Logo" 
     style="display: block; margin: 16px auto; max-width: 100%; border-radius: 6px;" />

<p>TypeScript brings static typing to JavaScript. It’s like adding a safety net to a tightrope walker. You’re still flexible and fast—but you’re far less likely to fall flat.</p>

<p>Here’s what makes TypeScript a game-changer for modern developers:</p>

<ul>
  <li><strong>Catch bugs before they crash your app:</strong> TypeScript analyzes your code at compile time, not just runtime.</li>
  <li><strong>Self-documenting code:</strong> Function signatures and type annotations become built-in docs your whole team can rely on.</li>
  <li><strong>Refactoring with confidence:</strong> Renaming variables or updating interfaces doesn’t feel like defusing a bomb anymore.</li>
</ul>

<p>Of course, there’s a learning curve. Especially if you’re used to JavaScript’s dynamic, anything-goes nature. You’ll write more code up front, and yes, you might fight the compiler once in a while.</p>

<blockquote>
  <p>But trust me — once you go TypeScript, you won’t go back to plain JavaScript (unless it’s JSON).</p>
</blockquote>

<p>Even massive frameworks like React, Next.js, and Angular have embraced TypeScript as their default choice. More job postings ask for it. More teams build with it. And the ecosystem is thriving.</p>

<p>Here’s a quick example of how TypeScript improves your code:</p>

<pre><code>// JavaScript
function greet(name) {
  return "Hello, " + name.toUpperCase();
}

// TypeScript
function greet(name: string): string {
  return "Hello, " + name.toUpperCase();
}</code></pre>

<p>That small change — <code>: string</code> — gives you compile-time checks, better IDE autocomplete, and fewer runtime errors.</p>

<p>In the end, TypeScript doesn’t limit you — it empowers you. You’re building smarter, safer, and more scalable apps. Your future self will thank you.</p>.`,
  },
  {
    id: 4,
    title: "10 UX Laws Every Developer Should Know",
    date: "2025-07-17",
    author: "Maria Devlin",
    content: `<p><strong>& Why Design Is Not Just for Designers</strong></p>

<p>You’re shipping features. You’ve built that sidebar, added search, optimized the backend. But users aren’t engaging. They're confused, frustrated—or worse, leaving. So what gives?</p>

<p>Turns out, design isn’t just about colors and buttons. It’s about psychology, behavior, and how people interact with your product. And whether you realize it or not, some invisible laws are always at play.</p>

<!-- CENTERED IMAGE (you can update the src with a better UX visual if desired) -->
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5iEUTZ_sPEYn9KiWrHPjz9i7c80WrbXoSgw&s"" 
     alt="UX Laws Visual Summary" 
     style="display: block; margin: 16px auto; max-width: 100%; border-radius: 6px;" />

<p>Here are a few of the most critical UX laws every developer should know:</p>

<ul>
  <li><strong>Hick’s Law:</strong> The more choices a user has, the longer it takes them to make a decision. Simplicity isn’t just nice—it’s strategic.</li>
  <li><strong>Fitts’s Law:</strong> The time to acquire a target is a function of distance and size. Make clickable elements big and close to where users expect them.</li>
  <li><strong>Jakob’s Law:</strong> Users spend most of their time on other websites. They prefer yours to work similarly, not differently.</li>
</ul>

<p>And that’s just the start. There’s also the <strong>Law of Proximity</strong> (group related items), the <strong>Law of Common Region</strong> (use borders and backgrounds to show connection), and the <strong>Serial Position Effect</strong> (people remember first and last items better).</p>

<p>All of these laws reflect one simple truth: <em>people don’t just use your product—they experience it</em>. Every interaction is an opportunity to delight or frustrate. Every click is a test of intuition.</p>

<blockquote>
  <p>You don’t need to be a designer. But you <em>do</em> need to care about user experience.</p>
</blockquote>

<p>Because design isn’t just how it looks. <strong>Design is how it works.</strong></p>`,
  },
  {
    id: 5,
    title: "How AI Is Changing Frontend Development",
    date: "2025-07-17",
    author: "Jamie Synth",
    content: `<p><strong>& Why Your Next Teammate Might Not Be Human</strong></p>

<p>You used to spend 30 minutes writing a responsive navbar. Now, you just type <em>“build a navbar”</em>, and an AI assistant instantly spits out HTML, CSS, and JavaScript that actually works.</p>

<p>This isn’t some distant vision of the future. It’s happening right now — in your IDE, in your browser, and in your design tools.</p>

<!-- CENTERED IMAGE -->
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3L3BAyaO26EaWy_JvjzJLv2CS9Bnep_vEYxJJ8MS4bZQUOknuywFDjts_RFc-c8l2HmA&usqp=CAU" 
     alt="AI in Frontend Development" 
     style="display: block; margin: 16px auto; max-width: 100%; border-radius: 6px;" />

<p>AI is rapidly becoming a front-end developer’s best friend. Here’s what it’s already doing:</p>

<ul>
  <li><strong>GitHub Copilot</strong> now writes up to 40% of your code — autocomplete on steroids.</li>
  <li><strong>ChatGPT</strong> can explain legacy spaghetti code faster than your senior engineer.</li>
  <li><strong>Design-to-code tools</strong> convert Figma mockups directly into React components.</li>
</ul>

<p>At first, it’s easy to panic. If AI can write code, does that mean it’s coming for your job?  
Actually, no. It’s coming for your <em>busywork</em>.</p>

<blockquote>
  <p>AI isn’t replacing frontend devs. It’s replacing <em>boring work</em>, letting you focus on creativity, logic, and product thinking.</p>
</blockquote>

<p>Imagine spending less time converting static designs into pixel-perfect components and more time solving real user problems. Imagine offloading repetitive documentation or testing boilerplate to tools that never get tired.</p>

<p>This isn’t a threat — it’s a superpower. The best developers won’t just code. They’ll orchestrate, guide, and collaborate with AI to build better products, faster.</p>

<p>So yes, your next teammate might not be human. But they’ll make you a better developer.  
And that’s the upgrade we’ve been waiting for.</p>`,
  },
];

// 定義 Post 資料型別
type Post = {
  _id?: string; // 從後端資料庫來的 _id
  id?: string; // 範文或本地貼文使用的 id
  title: string;
  author: string;
  content: string;
  createdAt?: string;
  date?: string;
  images?: string[];
};

export default function PostDetail() {
  const { id } = useParams(); // 透過 React Router 取得文章 ID
  const [post, setPost] = useState<Post | null>(null); // 記錄目前要顯示的文章

  // 掛載時或 id 變動時，嘗試從後端讀取貼文
  useEffect(() => {
    axios.get(`http://localhost:3000/api/posts/${id}`)
      .then((res) => {
        setPost(res.data); // 若成功取得貼文，存入 state
      })
      .catch(() => {
        // 若後端找不到，則 fallback 到範文
        const fallback = examplePosts.find((p) => String(p.id) === String(id));
        setPost(fallback || null);
      });
  }, [id]);

  // 若找不到貼文（後端與範文皆無），顯示錯誤訊息
  if (!post) {
    return (
      <div className="p-6 text-center text-red-500">找不到這篇文章 🛸</div>
    );
  }

  // 正常顯示文章內容
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      {/* 標題 */}
      <h1 className="text-4xl font-bold">{post.title}</h1>

      {/* 日期與作者資訊 */}
      <p className="text-sm text-muted-foreground">
        {post.createdAt
          ? new Date(post.createdAt).toLocaleDateString() // 後端日期轉為可讀格式
          : post.date || "Unknown date"}{" "}
        · {post.author}
      </p>

      {/* 如果有圖片（多張只顯示第一張） */}
      {post.images?.[0] && (
        <img
          src={post.images[0]}
          alt={post.title}
          className="rounded-md w-full h-64 object-cover"
        />
      )}

      {/* 顯示文章內容（支援 HTML 格式） */}
      <article
        className="prose prose-neutral max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}