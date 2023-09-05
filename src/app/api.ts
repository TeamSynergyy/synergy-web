import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post, Project, User, ChatRoom } from "types";
import { RootState } from "./store";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: [
    "MyInfo",
    "Post",
    "Project",
    "LikedPostIds",
    "LikedProjectIds",
    "Follows",
    "AppliedProjectId",
    "ChatRoom",
    "User",
    "RecentPosts",
    "RecentProjects",
    "ApplicantsIds",
    "PostComments",
  ],
  endpoints: (build) => ({
    // Auth
    register: build.mutation<
      void,
      { email: string; password: string; name: string }
    >({
      query: (credentials) => ({
        url: "/members/signup",
        method: "POST",
        body: credentials,
      }),
    }),

    login: build.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/members/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // MyInfo
    getMyInfo: build.query<User, null>({
      query: () => "/members/me/info",
      providesTags: [{ type: "MyInfo" }],
    }),

    getMyLikedPosts: build.query<number[], null>({
      query: () => "/members/me/post/likes",
      providesTags: [{ type: "LikedPostIds", id: "LIST" }],
    }),

    getMyLikedProjects: build.query<number[], null>({
      query: () => "/members/me/project/likes",
      providesTags: [{ type: "LikedProjectIds", id: "LIST" }],
    }),

    getMyFollows: build.query<
      { followers: string[]; followings: string[] },
      null
    >({
      query: () => "/follows",
      providesTags: [{ type: "Follows", id: "me" }],
    }),

    getMyAppliedProjects: build.query<{ projectIds: number[] }, null>({
      query: () => "/applies/me",
      providesTags: [{ type: "AppliedProjectId", id: "LIST" }],
    }),

    getMyChatRooms: build.query<ChatRoom[], null>({
      query: () => "/members/me/chatrooms",
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ roomId }) => ({
                type: "ChatRoom" as const,
                id: String(roomId),
              })),
              { type: "ChatRoom", id: "LIST" },
            ]
          : [{ type: "ChatRoom", id: "LIST" }],
    }),

    editMyInfo: build.mutation<void, Partial<User>>({
      query: (data) => ({
        url: "/members/me/info",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "MyInfo" },
        { type: "User", id: String(arg.memberId) },
      ],
    }),

    likePost: build.mutation<void, [number, "like" | "unlike"]>({
      query: ([id, likeType]) => ({
        url: `/posts/${id}/like`,
        method: "PUT",
        body: {
          likeType,
        },
      }),

      invalidatesTags: (result, error, arg) => [
        { type: "Post", id: String(arg) },
        { type: "LikedPostIds", id: "LIST" },
      ],
    }),

    likeProject: build.mutation<void, [number, "like" | "unlike"]>({
      query: ([id, likeType]) => ({
        url: `/projects/${id}/like`,
        method: "PUT",
        body: {
          likeType,
        },
      }),

      invalidatesTags: (result, error, arg) => [
        { type: "Project", id: String(arg) },
        { type: "LikedProjectIds", id: "LIST" },
      ],
    }),

    follow: build.mutation<void, [string, "follow" | "unfollow"]>({
      query: ([id, followType]) => ({
        url: `/follows/${id}`,
        method: "PUT",
        body: {
          followType,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Follows", id: "me" },
        { type: "Follows", id: String(arg) },
      ],
    }),

    getFollows: build.query<
      { followers: string[]; followings: string[] },
      string
    >({
      query: (id) => `/follows/${id}`,
      providesTags: (result, error, arg) => [{ type: "Follows", id: arg }],
    }),

    createChatRoom: build.mutation<void, string>({
      query: (userId) => ({
        url: `/chat/create/${userId}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "ChatRoom", id: "LIST" },
      ],
    }),

    // Users
    getUser: build.query<User, string>({
      query: (id) => `/members/${id}`,
      providesTags: (result, error, arg) => [{ type: "User", id: String(arg) }],
    }),

    getUsers: build.query<User[], string[]>({
      query: (ids) => `/members?ids=${ids.join(",")}`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ memberId }) => ({
                type: "User" as const,
                id: memberId,
              })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),

    // Post
    createPost: build.mutation<void, { title: string; content: string }>({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: [
        { type: "Post", id: "LIST" },
        { type: "RecentPosts", id: "LIST" },
      ],
    }),

    getPost: build.query<Post, number>({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, arg) => [{ type: "Post", id: String(arg) }],
    }),

    getRecentPosts: build.query<
      { content: Post[]; totalPages: number },
      number
    >({
      query: (page) => `/posts/recent?page=${page}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.content.push(...newItems.content);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.content.map(({ id }) => ({
                type: "RecentPosts" as const,
                id: String(id),
              })),
              { type: "RecentPosts", id: "LIST" },
            ]
          : [{ type: "RecentPosts", id: "LIST" }],
    }),

    deletePost: build.mutation<void, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Post", id: String(arg) },
      ],
    }),

    getPostComments: build.query<Comment[], number>({
      query: (postId) => `/comments/${postId}`,
      providesTags: (result, error, arg) =>
        result
          ? [
              { type: "PostComments", id: String(arg) },
              { type: "PostComments", id: "LIST" },
            ]
          : [{ type: "PostComments", id: "LIST" }],
    }),

    writePostComment: build.mutation<void, { postId: number; comment: string }>(
      {
        query: (body) => ({
          url: `/comments`,
          method: "POST",
          body,
        }),
        invalidatesTags: (result, error, arg) => [
          { type: "Post", id: String(arg.postId) },
        ],
      }
    ),

    // Project
    createProject: build.mutation<
      void,
      Omit<
        Project,
        "id" | "likes" | "teamMemberIds" | "leader" | "membersCount"
      >
    >({
      query: (project) => ({
        url: "/projects",
        method: "POST",
        body: project,
      }),
      invalidatesTags: [
        { type: "Project", id: "LIST" },
        { type: "RecentProjects", id: "LIST" },
      ],
    }),

    getProject: build.query<Project, { id: number }>({
      query: ({ id }) => `/projects/${id}`,
      providesTags: (result) =>
        result
          ? [{ type: "Project", id: String(result.id) }]
          : [{ type: "Project", id: "LIST" }],
    }),

    getRecentProjects: build.query<
      { content: Project[]; totalPages: number },
      number
    >({
      query: (page) => `/projects/recent?page=${page}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.content.push(...newItems.content);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.content.map(({ id }) => ({
                type: "RecentProjects" as const,
                id: String(id),
              })),
              { type: "RecentProjects", id: "LIST" },
            ]
          : [{ type: "RecentProjects", id: "LIST" }],
    }),

    deleteProject: build.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Post", id: String(arg.id) },
      ],
    }),

    applyProject: build.mutation<void, number>({
      query: (id) => ({
        url: `/applies/${id}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "AppliedProjectId", id: "LIST" }],
    }),

    cancelApplyProject: build.mutation<void, number>({
      query: (id) => ({
        url: `/applies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "AppliedProjectId", id: "LIST" }],
    }),

    getApplicantsIds: build.query<{ memberIds: string[] }, number>({
      query: (projectId) => ({
        url: `/applies/${projectId}`,
      }),
      providesTags: (result, error, arg) => [
        { type: "ApplicantsIds", id: String(arg) },
      ],
    }),

    acceptApplicant: build.mutation<void, [number, string]>({
      query: ([projectId, memberId]) => ({
        url: `/applies/accept`,
        method: "POST",
        body: {
          projectId,
          memberId,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "ApplicantsIds", id: String(arg[0]) },
      ],
    }),

    rejectApplicant: build.mutation<void, [number, string]>({
      query: ([projectId, memberId]) => ({
        url: `/applies/reject`,
        method: "DELETE",
        body: {
          projectId,
          memberId,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "ApplicantsIds", id: String(arg[0]) },
      ],
    }),

    // Search
    searchPosts: build.query<
      { content: Post[]; totalPages: number; totalElements: number },
      [string, number]
    >({
      query: ([keyword, page]) =>
        `/posts/search?keyword=${keyword}&page=${page}`,
    }),

    searchProjects: build.query<
      { content: Project[]; totalPages: number; totalElements: number },
      [string, number]
    >({
      query: ([keyword, page]) =>
        `/projects/search?keyword=${keyword}&page=${page}`,
    }),

    searchUsers: build.query<
      { content: User[]; totalPages: number; totalElements: number },
      [string, number]
    >({
      query: ([keyword, page]) =>
        `/members/search?keyword=${keyword}&page=${page}`,
    }),

    getPostsByUser: build.query<
      { content: Post[]; totalPages: number },
      [string, number]
    >({
      query: ([userId, page]) => `/members/${userId}/posts?page=${page}`,
      serializeQueryArgs: ({ queryArgs, endpointName }) => {
        return endpointName + queryArgs[0];
      },
      merge: (currentCache, newItems) => {
        currentCache.content.push(...newItems.content);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    getProjectsByUser: build.query<Project[], string>({
      query: (userId) => `/members/${userId}/projects`,
    }),
  }),
});
