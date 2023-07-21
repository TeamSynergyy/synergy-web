interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  likes: number;
}

interface Project {
  id: number;
  name: string;
  content: string;
  field: string[];
  createDate: string;
  endDate: string;
  likes: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  image: string;
}

interface MyInfo extends User {
  likedPosts: number[];
  likedProjects: number[];
  chatRooms: ChatRoom[];
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
  message: string;
  senderId: number;
  sendTime: string;
}

export type { Post, Project, User, MyInfo, ChatMessage, ChatRoom };
