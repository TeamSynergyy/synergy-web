interface Post {
  id: number;
  title: string;
  content: string;
  authorName: string;
  authorId: number;
  authorAvatar: string;
  likes: number;
  createAt: string;
}

interface Project {
  id: number;
  name: string;
  content: string;
  field: string;
  startAt: string;
  endAt: string;
  likes: number;
  teamMemberIds: string[];
  leader: string;
  membersCount: number;
}

interface User {
  memberId: string;
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
