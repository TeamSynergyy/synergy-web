// src/mocks/handlers.js
import { rest } from "msw";

const users = [
  {
    id: "0",
    name: "yeoularu",
    backgroundImage: "https://source.unsplash.com/random",
    avatar:
      "https://publy.imgix.net/user-uploaded/582076/2023.02/6684b7fd0476e498edc264ef5674f70645cdbf31c36bd4ab8157eca7bb49b0f2.png?w=400&h=400&auto=format&fm=png",
    email: "yeoularu@gmail.com",
    temperature: 36.8,
    major: "전기정보공학과",
    bio: "biobiobiobiobiobio자기소개",
    followingIds: ["2", "3"],
    followersIds: ["1"],
  },
  {
    id: "1",
    backgroundImage: "https://source.unsplash.com/random",
    avatar:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80",
    name: "시너지유저1",
    email: "hspoonlicker@outlook.com",
    temperature: 36.5,
    major: "기계자동차공학과",
    bio: "biobiobiobiobiobio자기소개",
    followingIds: ["0"],
    followersIds: [],
  },
  {
    id: "2",
    backgroundImage: "https://source.unsplash.com/random",
    avatar: "https://avatars.githubusercontent.com/u/109144975?v=4",
    name: "이종훈",
    email: "dfjidjfi@gmail.com",
    temperature: 73,
    major: "컴퓨터공학과",
    bio: "biobiobiobiobiobio자기소개",
    followingIds: [],
    followersIds: ["0"],
  },
  {
    id: "3",
    backgroundImage: "https://source.unsplash.com/random",
    avatar: "https://avatars.githubusercontent.com/u/69510981?v=4",
    name: "삼삼삼",
    email: "3333333333@gmail.com",
    temperature: 20.0,
    major: "안경광학과, 전자IT미디어공학과",
    bio: "biobiobiobiobiobio자기소개",
    followingIds: [],
    followersIds: ["0"],
  },
  {
    id: "4",
    backgroundImage: "https://source.unsplash.com/random",
    avatar: "https://avatars.githubusercontent.com/u/69510444?v=4",
    name: "사사사사",
    email: "4444@gmail.com",
    temperature: 44.4,
    major: "안경광학과, 전자IT미디어공학과",
    bio: "biobiobiobiobiobio자기소개",
    followingIds: [],
    followersIds: [],
  },
];

const posts = [
  {
    id: 0,
    title: "First post",
    content: "Hello!",
    authorId: 0,
    likes: 0,
    createAt: "2021-09-01T04:56:55.074",
  },
  {
    id: 1,
    title: "Second post",
    content: "Hello!",
    authorId: "1",
    likes: 1,
    createAt: "2022-01-31T04:56:55.074",
  },
  {
    id: 2,
    title: "",
    content: "Third post with no title",
    authorId: "2",
    likes: 33,
    createAt: "2022-01-31T04:56:55.074",
  },
  {
    id: 3,
    title: "4 post",
    content: "4!",
    authorId: "3",
    likes: 0,
    createAt: "2022-01-31T04:56:55.074",
  },
  {
    id: 4,
    title: "4ddsfdsfasdf",
    content: " ",
    authorId: "4",
    likes: 0,
    createAt: "2022-01-31T04:56:55.074",
  },
  {
    id: 5,
    title: "4ddsfdsfasdf",
    content:
      "long longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong longlong long",
    authorId: "4",
    likes: 0,
    createAt: "2022-01-31T04:56:55.074",
  },
].map((post) => ({
  ...post,
  authorName: users.find(({ id }) => id === post.authorId)?.name,
  authorAvatar: users.find(({ id }) => id === post.authorId)?.avatar,
}));

const projects = [
  {
    id: 0,
    name: "First project",
    content: "Hello!",
    field: "AI, IT서비스",
    startAt: "2023-09-02T00:00:000",
    endAt: "2024-09-30T00:00:000",
    likes: 0,
    teamMemberIds: ["0", "1"],
    leader: "0",
    membersCount: 2,
    applicants: ["2", "3"],
  },
  {
    id: 1,
    name: "Second project",
    content: "전기전자 프로젝트입니다.",
    field: "전기전자",
    startAt: "2023-08-30T00:00:000",
    endAt: "2024-01-12T00:00:000",
    likes: 21,
    teamMemberIds: ["0", "2", "3"],
    leader: "2",
    membersCount: 3,
    applicants: [],
  },
  {
    id: 2,
    name: "third project",
    content: "",
    field: "전기전자",
    startAt: "2024-08-30T00:00:000",
    endAt: "2025-01-12T00:00:000",
    likes: 21,
    teamMemberIds: ["2", "3"],
    leader: "3",
    membersCount: 2,
    applicants: [],
  },
];

const chatRooms = [
  {
    roomId: 0,
    participantIds: ["0", "1"],
    messages: [
      {
        id: 0,
        type: "TALK",
        roomId: 0,
        text: "hello",
        senderId: "1",
        sendTime: "2021-09-01T04:56:55.074",
      },
      {
        id: 1,
        type: "TALK",
        roomId: 0,
        text: "hi",
        senderId: "0",
        sendTime: "2023-07-25T16:23:55.074",
      },
    ],
  },
  {
    roomId: 1,
    participantIds: ["0", "2"],
    messages: [
      {
        id: 2,
        type: "TALK",
        roomId: 1,
        text: "hello",
        senderId: "0",
        sendTime: "2021-09-01T04:56:55.074",
      },
      {
        id: 3,
        type: "ENTER",
        roomId: 1,
        text: "hello",
        senderId: "2",
        sendTime: "2022-09-01T04:56:55.074",
      },
      {
        id: 4,
        type: "TALK",
        roomId: 1,
        text: "yo",
        senderId: "2",
        sendTime: "2022-01-01T04:56:55.074",
      },
      {
        id: 5,
        type: "TALK",
        roomId: 1,
        text: "yo",
        senderId: "0",
        sendTime: "2023-07-23T17:56:55.074",
      },
      {
        id: 6,
        type: "TALK",
        roomId: 1,
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\nWhy do we use it?\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        senderId: "2",
        sendTime: "2023-07-24T17:56:55.074",
      },
    ],
  },
];

const user = {
  ...users[0],
  likedPosts: [1, 2],
  likedProjects: [1],
  chatRooms: chatRooms,
  appliedProjects: [1],
};

export const handlers = [
  // User
  rest.post("/members/signup", async (req, res, ctx) => {
    // error test
    const { email } = await req.json();
    if (email === "error@test.com") return res(ctx.status(400));

    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json("회원가입 성공")
    );
  }),

  rest.post("/members/login", (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        token:
          "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6InJpdnNAa2FrYW8uY29tIiwiaWF0IjoxNjkzMzE2ODUxLCJleHAiOjE2OTM0MDMyNTF9.VHDyjaOf-5iB0FerCb2XZK6uNvY_1tsYMOsq-7mG7ws",
      })
    );
  }),

  rest.get("/members/me/info", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(users[0]));
  }),

  rest.get("/members/me/post/likes", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(user.likedPosts));
  }),
  rest.get("/members/me/project/likes", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(user.likedProjects));
  }),
  rest.get("/members/me/apply", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(user.appliedProjects));
  }),
  rest.get("/members/me/chatrooms", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(user.chatRooms));
  }),

  rest.patch("/members/me/info", async (req, res, ctx) => {
    const body = await req.json();
    const updatedUser = { ...users[0], ...body };
    console.log(updatedUser);
    users[0] = updatedUser;
    return res(ctx.status(200));
  }),

  rest.put("/members/follow/:id", (req, res, ctx) => {
    const { id } = req.params as { id: string };
    if (!id || !users.find((user) => user.id === id))
      return res(ctx.status(400));
    if (users[0].followingIds.includes(id)) {
      users[0].followingIds = users[0].followingIds.filter(
        (userId) => userId !== id
      );
    } else {
      users[0].followingIds.push(id);
    }

    return res(ctx.status(200));
  }),

  rest.put("/chat/create/:id", (req, res, ctx) => {
    const { id } = req.params as { id: string };
    if (!id || !users.find((user) => user.id === id))
      return res(ctx.status(400));
    chatRooms.push({
      roomId: 3,
      participantIds: ["0", id],
      messages: [],
    });
    return res(ctx.status(200));
  }),

  // Search
  rest.get("/post/search", (req, res, ctx) => {
    const keyword = req.url.searchParams.get("keyword");
    const page = req.url.searchParams.get("page");

    if (!keyword) return res(ctx.status(400));
    const pos = posts.filter((post) => post.content.includes(keyword));
    const result = {
      content: [
        {
          id: 999,
          title: "this is front of page" + page,
          content: page,
          authorId: 999,
          author: "page master",
          authorAvatar: "",
          likes: 0,
        },
        ...pos,
      ],
      totalElements: 100,
      totalPages: 10,
    };
    return res(ctx.status(200), ctx.json(result));
  }),
  rest.get("/project/search", (req, res, ctx) => {
    const keyword = req.url.searchParams.get("keyword");
    const page = req.url.searchParams.get("page");

    if (!keyword) return res(ctx.status(400));
    const proj = projects.filter((project) => project.name.includes(keyword));
    const result = {
      content: [
        {
          id: 1000 + Number(page),
          name: "프로젝트 page" + page,
          content: "Hello!",
          field: ["AI", "IT서비스"],
          startAt: "2023-09-01",
          endAt: "2023-09-30",
          likes: 0,
        },
        ...proj,
      ],
      totalElements: 100,
      totalPages: 10,
    };
    return res(ctx.status(200), ctx.json(result));
  }),

  rest.get("/members/search", async (req, res, ctx) => {
    const keyword = req.url.searchParams.get("keyword");
    const page = req.url.searchParams.get("page");

    if (!keyword) return res(ctx.status(400));
    const usr = users.filter((user) => user.name.includes(keyword));
    const result = {
      content: [
        {
          id: 999,
          backgroundImage: "https://source.unsplash.com/random",
          avatar: "https://avatars.githubusercontent.com/u/69510411?v=4",
          name: "page master" + page,
          email: "page@gmail.com",
          temperature: 44.4,
          major: "안경광학과, 전자IT미디어공학과",
        },
        ...usr,
      ],
      totalElements: 100,
      totalPages: 10,
    };
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return res(ctx.status(200), ctx.json(result));
  }),

  // Post
  rest.post("/post", async (req, res, ctx) => {
    const { title, content } = await req.json();
    if (title === "error") return res(ctx.status(400));
    console.log(title, content);
    posts.push({
      id: posts.at(-1)?.id ? posts.at(-1)!.id + 1 : 0,
      title,
      content,
      authorId: user.id,
      likes: 0,
      authorName: user.name,
      authorAvatar: user.avatar,
      createAt: new Date().toISOString().slice(0, -1),
    });
    console.log(posts);
    return res(ctx.status(200));
  }),

  rest.get("/post/recent", (req, res, ctx) => {
    const page = req.url.searchParams.get("page");
    console.log("recentPost", page, posts);
    return res(
      ctx.status(200),
      ctx.json({
        content: [
          {
            id: 999,
            title: "this is front of page" + page,
            content: page,
            authorId: 999,
            author: "page master",
            authorAvatar: "",
            likes: 0,
          },
          ...posts,
        ],
        totalPages: 10,
      })
    );
  }),

  rest.get("/post/:id", (req, res, ctx) => {
    const { id } = req.params as { id: string };
    return res(
      ctx.status(200),
      ctx.json(posts.find((post) => post.id === parseInt(id)))
    );
  }),

  rest.delete("/post/:id", (req, res, ctx) => {
    const { id } = req.params as { id: string };
    const index = posts.findIndex((post) => post.id === parseInt(id));
    if (index === -1) return res(ctx.status(400));
    posts.splice(index, 1);

    return res(ctx.status(200));
  }),

  rest.put("/post/:id/like", (req, res, ctx) => {
    const { id } = req.params as { id: string };
    const index = user.likedPosts.findIndex(
      (PostId) => PostId === parseInt(id)
    );
    if (index !== -1) {
      user.likedPosts.splice(index, 1);
      posts.find((post) => post.id === parseInt(id))!.likes--;
    } else {
      user.likedPosts.push(parseInt(id));
      posts.find((post) => post.id === parseInt(id))!.likes++;
    }

    return res(
      ctx.status(200),
      ctx.json({ data: posts.find((post) => post.id === parseInt(id)) })
    );
  }),

  // Project
  rest.post("/project", async (req, res, ctx) => {
    const { name, content, field, startAt, endAt } = await req.json();
    if (name === "error") return res(ctx.status(400));

    const id = projects.at(-1)?.id ? projects.at(-1)!.id + 1 : 0;
    console.log(startAt, endAt);
    projects.push({
      id,
      name,
      content,
      field,
      startAt,
      endAt,
      likes: 0,
      teamMemberIds: ["0"],
      leader: "0",
      membersCount: 1,
      applicants: [],
    });

    return res(ctx.status(200), ctx.json(id));
  }),

  rest.get("/project/recent", (req, res, ctx) => {
    const page = req.url.searchParams.get("page");
    console.log(page);
    return res(
      ctx.status(200),
      ctx.json({
        content: [
          {
            id: 1000 + Number(page),
            name: "프로젝트 page" + page,
            content: "Hello!",
            field: ["AI", "IT서비스"],
            startAt: "2023-09-01",
            endAt: "2023-09-30",
            likes: 0,
          },
          ...projects,
        ],
        totalPages: 10,
      })
    );
  }),

  rest.get("/project/:id", (req, res, ctx) => {
    const { id } = req.params as { id: string };
    return res(
      ctx.status(200),
      ctx.json(projects.find((project) => project.id === parseInt(id)))
    );
  }),

  rest.delete("/project/:id", (req, res, ctx) => {
    const { id } = req.params as { id: string };
    const index = projects.findIndex((project) => project.id === parseInt(id));
    if (index === -1) return res(ctx.status(400));
    projects.splice(index, 1);

    return res(ctx.status(200));
  }),

  rest.put("/project/:id/like", (req, res, ctx) => {
    const { id } = req.params as { id: string };
    console.log(id);
    const index = user.likedProjects.findIndex(
      (projectId) => projectId === parseInt(id)
    );
    if (index !== -1) {
      user.likedProjects.splice(index, 1);
      projects.find((project) => project.id === parseInt(id))!.likes--;
    } else {
      user.likedProjects.push(parseInt(id));
      projects.find((project) => project.id === parseInt(id))!.likes++;
    }

    return res(ctx.status(200));
  }),

  rest.post("/apply/accept", async (req, res, ctx) => {
    const { projectId, memberId } = await req.json();
    console.log(projectId, memberId);
    if (projectId === null || memberId === null) return res(ctx.status(400));
    const proj = projects.find((project) => project.id === parseInt(projectId));
    if (proj === undefined) return res(ctx.status(400));
    const index = proj.applicants.findIndex((id) => id === memberId);
    if (index === -1) return res(ctx.status(400));
    proj.applicants.splice(index, 1);
    proj.teamMemberIds.push(memberId);
    return res(ctx.status(200));
  }),

  rest.delete("/apply/reject", async (req, res, ctx) => {
    const { projectId, memberId } = await req.json();
    if (projectId === null || memberId === null) return res(ctx.status(400));
    const proj = projects.find((project) => project.id === parseInt(projectId));
    if (proj === undefined) return res(ctx.status(400));
    const index = proj.applicants.findIndex((id) => id === memberId);
    if (index === -1) return res(ctx.status(400));
    proj.applicants.splice(index, 1);
    proj.teamMemberIds.splice(
      proj.teamMemberIds.findIndex((id) => id === memberId),
      1
    );
    return res(ctx.status(200));
  }),

  rest.get("/apply/:projectId", (req, res, ctx) => {
    const { projectId } = req.params as { projectId: string };

    if (projectId === null) return res(ctx.status(400));

    const applicants = projects.find(
      (project) => project.id === parseInt(projectId)
    )?.applicants;
    return res(ctx.status(200), ctx.json(applicants));
  }),

  rest.post("/apply/:projectId", (req, res, ctx) => {
    const { projectId } = req.params as { projectId: string };
    if (projectId === null) return res(ctx.status(400));
    const index = user.appliedProjects.findIndex(
      (id) => id === parseInt(projectId)
    );
    if (index !== -1) {
      user.appliedProjects.splice(index, 1);
    } else {
      user.appliedProjects.push(parseInt(projectId));
    }

    return res(ctx.status(200));
  }),

  rest.delete("/apply/:projectId", (req, res, ctx) => {
    const { projectId } = req.params as { projectId: string };
    if (projectId === null) return res(ctx.status(400));
    const index = user.appliedProjects.findIndex(
      (id) => id === parseInt(projectId)
    );
    if (index !== -1) {
      user.appliedProjects.splice(index, 1);
    } else {
      user.appliedProjects.push(parseInt(projectId));
    }

    return res(ctx.status(200));
  }),

  rest.get("/members/:id/posts", (req, res, ctx) => {
    const { id } = req.params as { id: string };
    return res(
      ctx.status(200),
      ctx.json({
        content: posts.filter((post) => post.authorId === id),
        totalPages: 13,
      })
    );
  }),

  rest.get("/members/:id/projects", (req, res, ctx) => {
    const { id } = req.params as { id: string };
    return res(
      ctx.status(200),
      ctx.json(projects.filter((project) => project.teamMemberIds.includes(id)))
    );
  }),

  // Get User
  rest.get("/members/:id", (req, res, ctx) => {
    const { id } = req.params as { id: string };
    const user = users.find((user) => user.id === id);
    if (!user) return res(ctx.status(404));
    return res(ctx.status(200), ctx.json(user));
  }),

  rest.get("/members", (req, res, ctx) => {
    const ids = req.url.searchParams.get("ids");
    if (!ids) return res(ctx.status(400));
    const idList = ids.split(",").map((id) => id);
    const userList = users.filter((user) => idList.includes(user.id));
    return res(ctx.status(200), ctx.json(userList));
  }),
];
