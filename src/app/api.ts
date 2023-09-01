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
    "LikedPostId",
    "LikedProjectId",
    "AppliedProjectId",
    "ChatRoom",
    "User",
    "RecentPosts",
    "RecentProjects",
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
      providesTags: [{ type: "LikedPostId", id: "LIST" }],
    }),

    getMyLikedProjects: build.query<number[], null>({
      query: () => "/members/me/project/likes",
      providesTags: [{ type: "LikedProjectId", id: "LIST" }],
    }),

    getMyAppliedProjects: build.query<number[], null>({
      query: () => "/members/me/apply",
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
        { type: "User", id: String(arg.id) },
      ],
    }),

    likePost: build.mutation<void, [number, "like" | "unlike"]>({
      query: ([id, likeType]) => ({
        url: `/post/${id}/like`,
        method: "PUT",
        body: {
          likeType,
        },
      }),

      invalidatesTags: (result, error, arg) => [
        { type: "Post", id: String(arg) },
        { type: "LikedPostId", id: "LIST" },
      ],
    }),

    likeProject: build.mutation<void, [number, "like" | "unlike"]>({
      query: ([id, likeType]) => ({
        url: `/project/${id}/like`,
        method: "PUT",
        body: {
          likeType,
        },
      }),

      invalidatesTags: (result, error, arg) => [
        { type: "Project", id: String(arg) },
        { type: "LikedProjectId", id: "LIST" },
      ],
    }),

    follow: build.mutation<void, [string, "follow" | "unfollow"]>({
      query: ([id, followType]) => ({
        url: `/members/follow/${id}`,
        method: "PUT",
        body: {
          followType,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "User", id: String(arg) },
        { type: "MyInfo" },
      ],
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
              ...result.map(({ id }) => ({
                type: "User" as const,
                id: String(id),
              })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),

    // Post
    createPost: build.mutation<void, { title: string; content: string }>({
      query: (post) => ({
        url: "/post",
        method: "POST",
        body: post,
      }),
      invalidatesTags: [
        { type: "Post", id: "LIST" },
        { type: "RecentPosts", id: "LIST" },
      ],
    }),

    getPost: build.query<Post, number>({
      query: (id) => `/post/${id}`,
      providesTags: (result, error, arg) => [{ type: "Post", id: String(arg) }],
    }),

    getRecentPosts: build.query<
      { content: Post[]; totalPages: number },
      number
    >({
      query: (page) => `/post/recent?page=${page}`,
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
        url: `/post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Post", id: String(arg) },
      ],
    }),

    // Project
    createProject: build.mutation<
      void,
      Omit<Project, "id" | "likes" | "teamMemberIds">
    >({
      query: (project) => ({
        url: "/project",
        method: "POST",
        body: project,
      }),
      invalidatesTags: [
        { type: "Project", id: "LIST" },
        { type: "RecentProjects", id: "LIST" },
      ],
    }),

    getProject: build.query<Project, { id: number }>({
      query: ({ id }) => `/project/${id}`,
      providesTags: (result) =>
        result
          ? [{ type: "Project", id: String(result.id) }]
          : [{ type: "Project", id: "LIST" }],
    }),

    getRecentProjects: build.query<
      { content: Project[]; totalPages: number },
      number
    >({
      query: (page) => `/project/recent?page=${page}`,
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
        url: `/project/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Post", id: String(arg.id) },
      ],
    }),

    applyProject: build.mutation<void, number>({
      query: (id) => ({
        url: `/apply?projectId=${id}`,
        method: "PUT",
      }),
      invalidatesTags: [{ type: "AppliedProjectId", id: "LIST" }],
    }),

    // Search
    searchPosts: build.query<
      { content: Post[]; totalPages: number; totalElements: number },
      [string, number]
    >({
      query: ([keyword, page]) =>
        `/post/search?keyword=${keyword}&page=${page}`,
    }),

    searchProjects: build.query<
      { content: Project[]; totalPages: number; totalElements: number },
      [string, number]
    >({
      query: ([keyword, page]) =>
        `/project/search?keyword=${keyword}&page=${page}`,
    }),

    searchUsers: build.query<
      { content: User[]; totalPages: number; totalElements: number },
      [string, number]
    >({
      query: ([keyword, page]) =>
        `members/search?keyword=${keyword}&page=${page}`,
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
