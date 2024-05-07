interface Post {
  postId: number;
  title: string;
  content: string;
  authorName: string;
  userId: string;
  authorAvatar: string;
  thumbnailImageUrl: string;
  imagesUrl: string[];
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
  location: {
    x: number;
    y: number;
  };
  likes: number;
  teamUserIds: string[];
  leaderId: string;
}

interface ProjectNotice {
  noticeId: number;
  projectId: number;
  content: string;
  updateAt: string;
}

interface ProjectSchedule {
  scheduleId: number;
  projectId?: number;
  title: string;
  content: string;
  label: string;
  startAt: string;
  endAt: string;
}

interface ProjectPeerRating {
  rateId: number;
  projectId: number;
  giveUserId: string;
  receiveUserId: string;
  content: string;
  score: number;
}

interface ProjectTask {
  ticketId: number;
  projectId: number;
  title: string;
  content: string;
  endAt?: string;
  assignedTime?: number;
  tag?: string;
  tagColor?: string;
  status: "BACKLOG" | "IN_PROGRESS" | "REVIEW" | "DONE";
  orderNumber: number;
  assignedUserIds: string[];
}

interface User {
  userId: string;
  username: string;
  email: string;
  profileImageUrl: string;
  backImage: string;
  organization: string;
  major: string;
  minor: string;
  interestAreas: string;
  skills: string;
  temperature: number;
  bio: string;
}

interface Comment {
  commentId: number;
  userId: string;
  postId: number;
  comment: string;
  updateAt: string;
}

interface ChatRoom {
  roomId: number;
  participantIds: string[]; // 이름 userIds 변경하시죠
  messages: ChatMessage[]; // 없어짐
}

interface ChatMessage {
  id: number;
  type: string;
  roomId: number;
  message: string;
  senderId: string;
  sendTime: string;
}

export type {
  Post,
  Project,
  ProjectNotice,
  ProjectSchedule,
  ProjectPeerRating,
  ProjectTask,
  User,
  Comment,
  ChatMessage,
  ChatRoom,
};
