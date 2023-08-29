interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  authorId: number;
  authorAvatar: string;
  likes: number;
}

interface Project {
  id: number;
  name: string;
  content: string;
  field: string[];
  startAt: string;
  endAt: string;
  likes: number;
  teamMemberIds: number[];
}

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  backgroundImage: string;
  major: string;
  temperature: number;
  bio: string;
}

interface ChatRoom {
  roomId: number;
  participantIds: number[];
  messages: ChatMessage[];
}

interface ChatMessage {
  id: number;
  type: string;
  roomId: number;
  text: string;
  senderId: number;
  sendTime: string;
}

interface SearchResponse {
  totalElements: number;
  posts: Post[];
  projects: Project[];
  users: User[];
}

export type { Post, Project, User, ChatMessage, ChatRoom, SearchResponse };
