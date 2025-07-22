import { create } from 'zustand';

export type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
};

type PostStore = {
  posts: Post[];
  addPost: (post: Post) => void;
};

export const usePostStore = create<PostStore>((set) => ({
  posts: [],

  addPost: (post) =>
    set((state) => ({
      posts: [...state.posts, post],
    })),
}));