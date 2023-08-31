interface Post {
  id: number;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
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
  teamMemberIds: string[];
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  backgroundImage: string;
  major: string;
  temperature: number;
  bio: string;
  followerIds: string[];
  followingIds: string[];
}

interface ChatRoom {
  roomId: number;
  participantIds: string[];
  messages: ChatMessage[];
}

interface ChatMessage {
  id: number;
  type: string;
  roomId: number;
  text: string;
  senderId: string;
  sendTime: string;
}

export type { Post, Project, User, ChatMessage, ChatRoom };
