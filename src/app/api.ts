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
    "Post",
    "Project",
    "LikedPostId",
    "LikedProjectId",
    "FollowingId",
    "FollowerId",
    "ChatRoom",
    "User",
    "MyInfo",
  ],
  endpoints: (build) => ({
    // Auth
    register: build.mutation<
      void,
      { email: string; password: string; name: string }
    >({
      query: (credentials) => ({
        url: "/api/v1/members/signup",
        method: "POST",
        body: credentials,
      }),
    }),

    login: build.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/api/v1/members/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // MyInfo
    getMyInfo: build.query<User, null>({
      query: () => "/me/info",
      providesTags: [{ type: "MyInfo" }],
    }),

    getMyLikedPosts: build.query<number[], null>({
      query: () => "/me/like/post",
      providesTags: [{ type: "LikedPostId", id: "LIST" }],
    }),

    getMyLikedProjects: build.query<number[], null>({
      query: () => "/me/like/project",
      providesTags: [{ type: "LikedProjectId", id: "LIST" }],
    }),

    getMyAppliedProjects: build.query<number[], null>({
      query: () => "/me/apply",
    }),

    getMyChatRooms: build.query<ChatRoom[], null>({
      query: () => "/me/chatrooms",
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
        url: "/me/info",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "MyInfo" },
        { type: "User", id: String(arg.id) },
      ],
    }),

    likePost: build.mutation<void, number>({
      query: (id) => ({
        url: `/post/${id}/like`,
        method: "PUT",
      }),

      invalidatesTags: (result, error, arg) => [
        { type: "Post", id: String(arg) },
        { type: "LikedPostId", id: "LIST" },
      ],
    }),

    likeProject: build.mutation<void, number>({
      query: (id) => ({
        url: `/project/${id}/like`,
        method: "PUT",
      }),

      invalidatesTags: (result, error, arg) => [
        { type: "Project", id: String(arg) },
        { type: "LikedProjectId", id: "LIST" },
      ],
    }),

    follow: build.mutation<void, string>({
      query: (id) => ({
        url: `/members/follow/${id}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "User", id: String(arg) },
        { type: "FollowingId", id: "LIST" },
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
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),

    getPost: build.query<Post, number>({
      query: (id) => `/post/${id}`,
      providesTags: (result, error, arg) => [{ type: "Post", id: String(arg) }],
    }),

    getRecentPosts: build.query<
      { contents: Post[]; totalPages: number },
      number
    >({
      query: (page) => `/post/recent?page=${page}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.contents.push(...newItems.contents);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
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
      number,
      Omit<Project, "id" | "likes" | "teamMemberIds">
    >({
      query: (project) => ({
        url: "/project",
        method: "POST",
        body: project,
      }),
      invalidatesTags: [{ type: "Project", id: "LIST" }],
    }),

    getProject: build.query<Project, { id: number }>({
      query: ({ id }) => `/project/${id}`,
      providesTags: (result) =>
        result
          ? [{ type: "Project", id: String(result.id) }]
          : [{ type: "Project", id: "LIST" }],
    }),

    getRecentProjects: build.query<
      { contents: Project[]; totalPages: number },
      number
    >({
      query: (page) => `/project/recent?page=${page}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.contents.push(...newItems.contents);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
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
      }),
    }),

    // Search
    searchPosts: build.query<
      { contents: Post[]; totalPages: number; totalElements: number },
      [string, number]
    >({
      query: ([keyword, page]) =>
        `/post/search?keyword=${keyword}&page=${page}`,
    }),

    searchProjects: build.query<
      { contents: Project[]; totalPages: number; totalElements: number },
      [string, number]
    >({
      query: ([keyword, page]) =>
        `/project/search?keyword=${keyword}&page=${page}`,
    }),

    searchUsers: build.query<
      { contents: User[]; totalPages: number; totalElements: number },
      [string, number]
    >({
      query: ([keyword, page]) =>
        `members/search?keyword=${keyword}&page=${page}`,
    }),

    getPostsByUser: build.query<
      { contents: Post[]; totalPages: number },
      [string, number]
    >({
      query: ([userId, page]) => `/members/${userId}/posts?page=${page}`,
      serializeQueryArgs: ({ queryArgs, endpointName }) => {
        return endpointName + queryArgs[0];
      },
      merge: (currentCache, newItems) => {
        currentCache.contents.push(...newItems.contents);
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
