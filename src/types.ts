export interface User {
  id: string;
  name: string;
  avatar?: string;
  role: 'student' | 'faculty' | 'admin';
}

export interface Note {
  id: string;
  title: string;
  description: string;
  authorId: string;
  authorName: string;
  fileUrl: string;
  category: string;
  tags: string[];
  createdAt: string;
  downloads: number;
}

export interface DiscussionThread {
  id: string;
  title: string;
  authorId: string;
  authorName: string;
  content: string;
  replies: DiscussionReply[];
  tags: string[];
  createdAt: string;
  likes: number;
}

export interface DiscussionReply {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'announcement' | 'event' | 'academic' | 'technical';
  author: string;
  imageUrl?: string;
}

export type AppSection = 'home' | 'notes' | 'discussions' | 'news';
