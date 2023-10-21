interface Post {
  postId: number;
  title: string;
  content: string;
  authorName: string;
  userId: number;
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
  coordLat: number;
  coordLng: number;
  likes: number;
  teamUserIds: string[];
  leaderId: string;
}

interface User {
  userId: string;
  username: string;
  email: string;
  profileImageUrl: string;
  backImage: string;
  major: string;
  temperature: number;
  bio: string;
}

interface Comment {
  commentId: number;
  userId: string;
  postId: number;
  content: string;
  updateAt: string;
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
