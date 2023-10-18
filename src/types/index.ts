interface Post {
  postId: number;
  title: string;
  content: string;
  authorName: string;
  authorId: number;
  authorAvatar: string;
  likes: number;
  createAt: string;
  updateAt: string;
}

interface Project {
  projectId: number;
  name: string;
  content: string;
  field: string;
  startAt: string;
  endAt: string;
  likes: number;
  teamMemberIds: string[];
  leaderId: string;
}

interface User {
  userId: string;
  name: string;
  email: string;
  avatar: string;
  backgroundImage: string;
  major: string;
  temperature: number;
  bio: string;
}

interface Comment {
  commentId: number;
  userId: string;
  postId: number;
  content: string;
  updateAt: string; // date string
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

export type { Post, Project, User, Comment, ChatMessage, ChatRoom };
