import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import {
  Post,
  Project,
  User,
  ChatRoom,
  Comment,
  ProjectNotice,
  ProjectSchedule,
  ProjectPeerRating,
  ProjectTask,
} from "types";
import { RootState } from "./store";
import { setAccessToken } from "./authSlice";
import axios from "axios";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.DEV
    ? "/api/v1"
    : import.meta.env.VITE_API_URL + "/api/v1",

  prepareHeaders: (headers, { getState }) => {
    headers.set("Credentials", "include");

    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  let result = await baseQuery(args, api, extraOptions);
  // if (result.error && result.error.status === 401) {
  if (result.error) {
    const state = api.getState() as RootState;
    console.log("state", state);
    const token = state.auth.token;
    console.log("token", token);
    const refreshResult: {
      header: { code: number; message: string };
      body: { token: string };
    } = await axios.get(
      import.meta.env.DEV
        ? "/api/v1/auth/refresh"
        : import.meta.env.VITE_API_URL + "/api/v1/auth/refresh",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Credentials: "include",
        },
      }
    );

    if (refreshResult.body?.token) {
      const newAccessToken = refreshResult.body.token;
      api.dispatch(setAccessToken(newAccessToken));
      result = await baseQuery(args, api, extraOptions);
    }

    if (refreshResult.header?.code === 400) {
      window.location.href = "/auth";
    }
  }

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "MyInfo",
    "Post",
    "Project",
    "LikedPostIds",
    "LikedProjectIds",
    "MyFollowings",
    "AppliedProjectId",
    "ChatRoom",
    "User",
    "RecentPosts",
    "RecentProjects",
    "ApplicantsIds",
    "PostComments",
    "FollowingPosts",
    "RecommendedPosts",
    "RecommendedProjects",
    "ProjectNotice",
    "ProjectSchedule",
    "ProjectTask",
  ],
  endpoints: (build) => ({
    // MyInfo
    getMyInfo: build.query<User, null>({
      query: () => "/users/me/info",
    }),

    editMyInfo: build.mutation<void, User>({
      query: (data) => ({
        url: "/users/me/info",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "MyInfo" },
        { type: "User", id: String(arg.userId) },
      ],
    }),

    // my data
    getMyLikedPosts: build.query<{ content: Post[] }, null>({
      query: () => "/posts/me/likes",

      providesTags: [{ type: "LikedPostIds", id: "LIST" }],
    }),

    getMyLikedProjects: build.query<{ content: Project[] }, null>({
      query: () => "/projects/me/likes",

      providesTags: [{ type: "LikedProjectIds", id: "LIST" }],
    }),

    getMyAppliedProjects: build.query<number[], null>({
      query: () => "/applies/me",

      providesTags: [{ type: "AppliedProjectId", id: "LIST" }],
    }),

    getMyChatRooms: build.query<ChatRoom[], null>({
      query: () => "/users/me/chatrooms",
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

    likePost: build.mutation<void, [number, "post_like" | "post_unlike"]>({
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

    likeProject: build.mutation<
      void,
      [number, "project_like" | "project_unlike"]
    >({
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

    follow: build.mutation<void, [string, "follow" | "unfollow", string]>({
      query: ([id, followType, myId]) => ({
        url: `/follows/${id}`,
        method: "PUT",
        body: {
          followType,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "MyFollowings", id: "LIST" },
      ],
    }),

    getMyFollowings: build.query<string[], null>({
      query: () => `/users/followings`,
      transformResponse: (response: { userIds: string[] }) => response.userIds,
      providesTags: (result, error, arg) => [
        { type: "MyFollowings", id: "LIST" },
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
      query: (id) => `/users/${id}`,
      providesTags: (result, error, arg) => [{ type: "User", id: String(arg) }],
    }),

    getSimilarUsers: build.query<User[], string>({
      query: (id) => `/users/similar/${id}?end=`,
    }),

    // Post
    createPost: build.mutation<void, FormData>({
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
      { content: Post[]; next: boolean },
      number | string
    >({
      query: (end) => `/posts/recent?end=${end}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.content.push(...newItems.content);
        currentCache.next = newItems.next;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.content.map(({ postId }) => ({
                type: "RecentPosts" as const,
                id: String(postId),
              })),
              { type: "RecentPosts", id: "LIST" },
            ]
          : [{ type: "RecentPosts", id: "LIST" }],
    }),

    getFollowingPosts: build.query<
      { content: Post[]; next: boolean },
      number | string
    >({
      query: (end) => `/posts/feed?end=${end}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.content.push(...newItems.content);
        currentCache.next = newItems.next;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.content.map(({ postId }) => ({
                type: "FollowingPosts" as const,
                id: String(postId),
              })),
              { type: "FollowingPosts", id: "LIST" },
            ]
          : [{ type: "FollowingPosts", id: "LIST" }],
    }),

    getRecommendedPosts: build.query<
      { content: Post[]; next: boolean },
      number | string
    >({
      query: (end) => `/posts/recommend?end=${end}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.content.push(...newItems.content);
        currentCache.next = newItems.next;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.content.map(({ postId }) => ({
                type: "RecommendedPosts" as const,
                id: String(postId),
              })),
              { type: "RecommendedPosts", id: "LIST" },
            ]
          : [{ type: "RecommendedPosts", id: "LIST" }],
    }),

    getTrendingPosts: build.query<Post[], null>({
      query: () => `/posts/week`,
      transformResponse: (response: { content: Post[] }) => response.content,
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
          { type: "PostComments", id: String(arg.postId) },
        ],
      }
    ),

    // Project
    createProject: build.mutation<
      void,
      Omit<
        Project,
        "projectId" | "likes" | "teamUserIds" | "leaderId" | "location"
      > & { latitude: number; longitude: number }
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

    getProject: build.query<Project, number>({
      query: (id) => `/projects/${id}`,
      providesTags: (result) =>
        result
          ? [{ type: "Project", id: String(result.projectId) }]
          : [{ type: "Project", id: "LIST" }],
    }),

    getProjectsByUser: build.query<Project[], string>({
      query: (userId) => `/projects/other?userId=${userId}`,
      transformResponse: (response: { content: Project[] }) => response.content,
    }),

    getRecentProjects: build.query<
      { content: Project[]; next: boolean },
      number | string
    >({
      query: (end) => `/projects/recent?end=${end}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.content.push(...newItems.content);
        currentCache.next = newItems.next;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.content.map(({ projectId }) => ({
                type: "RecentProjects" as const,
                id: String(projectId),
              })),
              { type: "RecentProjects", id: "LIST" },
            ]
          : [{ type: "RecentProjects", id: "LIST" }],
    }),

    getRecommendedProjects: build.query<
      { content: Project[]; next: boolean },
      number | string
    >({
      query: (end) => `/projects/recommend?end=${end}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.content.push(...newItems.content);
        currentCache.next = newItems.next;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.content.map(({ projectId }) => ({
                type: "RecommendedProjects" as const,
                id: String(projectId),
              })),
              { type: "RecommendedProjects", id: "LIST" },
            ]
          : [{ type: "RecommendedProjects", id: "LIST" }],
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

    getApplicantsIds: build.query<User[], number>({
      query: (projectId) => ({
        url: `/applies/${projectId}`,
      }),
      transformResponse: (response: { users: User[] }) => response.users,
      providesTags: (result, error, arg) => [
        { type: "ApplicantsIds", id: String(arg) },
      ],
    }),

    acceptApplicant: build.mutation<void, [number, string]>({
      query: ([projectId, userId]) => ({
        url: `/applies/accept/${projectId}`,
        method: "POST",
        body: {
          userId,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "ApplicantsIds", id: String(arg[0]) },
      ],
    }),

    rejectApplicant: build.mutation<void, [number, string]>({
      query: ([projectId, userId]) => ({
        url: `/applies/reject/${projectId}`,
        method: "DELETE",
        body: {
          userId,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "ApplicantsIds", id: String(arg[0]) },
      ],
    }),

    // Project Notice
    createProjectNotice: build.mutation<
      void,
      { projectId: number; content: string }
    >({
      query: ({ projectId, content }) => ({
        url: `/notices`,
        method: "POST",
        body: {
          projectId,
          content,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "ProjectNotice", id: String(arg.projectId) },
        { type: "ProjectNotice", id: "LIST" },
      ],
    }),

    getProjectNotices: build.query<ProjectNotice[], number | string>({
      query: (projectId) => `/notices/${projectId}`,
      providesTags: (result, error, arg) =>
        result
          ? [
              { type: "ProjectNotice", id: String(arg) },
              { type: "ProjectNotice", id: "LIST" },
            ]
          : [{ type: "ProjectNotice", id: "LIST" }],
    }),

    deleteProjectNotice: build.mutation<void, number>({
      query: (id) => ({
        url: `/notices/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "ProjectNotice", id: String(arg) },
      ],
    }),

    // Project Schedule
    createProjectSchedule: build.mutation<
      void,
      Omit<ProjectSchedule, "scheduleId">
    >({
      query: (schedule) => ({
        url: `/schedules`,
        method: "POST",
        body: schedule,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "ProjectSchedule", id: String(arg.projectId) },
        { type: "ProjectSchedule", id: "LIST" },
      ],
    }),

    getProjectSchedule: build.query<ProjectSchedule[], number | string>({
      query: (projectId) => `/schedules/${projectId}`,
      providesTags: (result, error, arg) =>
        result
          ? [
              { type: "ProjectSchedule", id: String(arg) },
              { type: "ProjectSchedule", id: "LIST" },
            ]
          : [{ type: "ProjectSchedule", id: "LIST" }],
    }),

    updateProjectSchedule: build.mutation<void, ProjectSchedule>({
      query: (schedule) => ({
        url: `/schedules/${schedule.scheduleId}`,
        method: "PUT",
        body: schedule,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "ProjectSchedule", id: String(arg.projectId) },
        { type: "ProjectSchedule", id: "LIST" },
      ],
    }),

    deleteProjectSchedule: build.mutation<void, ProjectSchedule>({
      query: (schedule) => ({
        url: `/schedules/${schedule.scheduleId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "ProjectSchedule", id: String(arg.projectId) },
        { type: "ProjectSchedule", id: "LIST" },
      ],
    }),

    // Project peer evaluation
    ratePeer: build.mutation<void, Omit<ProjectPeerRating, "rateId">>({
      query: (rating) => ({
        url: `/rates`,
        method: "POST",
        body: rating,
      }),
      // invalidatesTags: (result, error, arg) => [
      //   { type: "ProjectPeerRating", id: String(arg.projectId) },
      //   { type: "ProjectPeerRating", id: "LIST" },
      // ],
    }),

    // Project Task
    createProjectTask: build.mutation<
      void,
      Omit<ProjectTask, "ticketId" | "orderNumber">
    >({
      query: (task) => ({
        url: `/tickets`,
        method: "POST",
        body: task,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "ProjectTask", id: String(arg.projectId) },
      ],
    }),

    getProjectTasks: build.query<
      Record<ProjectTask["status"], ProjectTask[]>,
      number
    >({
      query: (projectId) => `/tickets/${projectId}`,
      transformResponse: (response: ProjectTask[]) =>
        response
          ? response
              .sort((a, b) => a.orderNumber - b.orderNumber)
              .reduce(
                (acc, task) => {
                  acc[task.status].push(task);
                  return acc;
                },
                {
                  BACKLOG: [],
                  IN_PROGRESS: [],
                  REVIEW: [],
                  DONE: [],
                } as Record<ProjectTask["status"], ProjectTask[]>
              )
          : {
              BACKLOG: [],
              IN_PROGRESS: [],
              REVIEW: [],
              DONE: [],
            },

      providesTags: (result, error, arg) => [
        { type: "ProjectTask", id: String(arg) },
      ],
    }),

    updateProjectTask: build.mutation<void, ProjectTask>({
      query: (task) => ({
        url: `/tickets/${task.ticketId}`,
        method: "PUT",
        body: task,
      }),

      invalidatesTags: (result, error, arg) => [
        { type: "ProjectTask", id: String(arg.projectId) },
      ],
    }),

    deleteProjectTask: build.mutation<void, ProjectTask>({
      query: ({ ticketId }) => ({
        url: `/tickets/${ticketId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "ProjectTask", id: String(arg.projectId) },
      ],
    }),

    // Search
    searchPosts: build.query<
      { content: Post[]; totalPages: number; totalElements: number },
      [string, number]
    >({
      query: ([search, page]) => `/posts?search=${search}&page=${page}`,
    }),

    searchProjects: build.query<
      { content: Project[]; totalPages: number; totalElements: number },
      [string, number]
    >({
      query: ([search, page]) => `/projects?search=${search}&page=${page}`,
    }),

    searchUsers: build.query<
      { content: User[]; totalPages: number; totalElements: number },
      [string, number]
    >({
      query: ([search, page]) => `/users?search=${search}&page=${page}`,
    }),

    getPostsByUser: build.query<
      { content: Post[]; totalPages: number },
      [string, number]
    >({
      query: ([userId, page]) => `/posts?authorId=${userId}&page=${page}`,
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
  }),
});
