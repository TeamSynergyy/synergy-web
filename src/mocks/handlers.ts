// src/mocks/handlers.js
import { rest } from "msw";

const posts = [
  {
    id: 0,
    title: "First post",
    content: "Hello!",
    author: "Yihua",
    likes: 0,
  },
  {
    id: 1,
    title: "Second post",
    content: "Hello!",
    author: "Yihua",
    likes: 1,
  },
  {
    id: 2,
    title: "",
    content: "Third post with no title",
    author: "Yihua",
    likes: 33,
  },
  {
    id: 3,
    title: "4 post",
    content: "4!",
    author: "12345",
    likes: 0,
  },
];

const projects = [
  {
    id: 0,
    name: "First project",
    content: "Hello!",
    field: ["AI", "IT서비스"],
    createDate: "2023-09-01",
    endDate: "2023-09-30",
    likes: 0,
  },
  {
    id: 1,
    name: "Second project",
    content: "전기전자 프로젝트입니다.",
    field: ["전기전자"],
    createDate: "2022-11-11",
    endDate: "2023-01-12",
    likes: 21,
  },
];

const chatRooms = [
  {
    roomId: 0,
    participantIds: [0, 1],
    messages: [
      {
        id: 0,
        type: "TALK",
        roomId: 0,
        text: "hello",
        senderId: 1,
        sendTime: "2021-09-01T04:56:55.074Z",
      },
      {
        id: 1,
        type: "TALK",
        roomId: 0,
        text: "hi",
        senderId: 0,
        sendTime: "2023-07-25T16:23:55.074Z",
      },
    ],
  },
  {
    roomId: 1,
    participantIds: [0, 2],
    messages: [
      {
        id: 2,
        type: "TALK",
        roomId: 1,
        text: "hello",
        senderId: 0,
        sendTime: "2021-09-01T04:56:55.074Z",
      },
      {
        id: 3,
        type: "ENTER",
        roomId: 1,
        text: "hello",
        senderId: 2,
        sendTime: "2022-09-01T04:56:55.074Z",
      },
      {
        id: 4,
        type: "TALK",
        roomId: 1,
        text: "yo",
        senderId: 2,
        sendTime: "2022-01-01T04:56:55.074Z",
      },
      {
        id: 5,
        type: "TALK",
        roomId: 1,
        text: "yo",
        senderId: 0,
        sendTime: "2023-07-23T17:56:55.074Z",
      },
      {
        id: 6,
        type: "TALK",
        roomId: 1,
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\nWhy do we use it?\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        senderId: 2,
        sendTime: "2023-07-24T17:56:55.074Z",
      },
    ],
  },
];

const users = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80",
    name: "시너지유저1",
    email: "hspoonlicker@outlook.com",
  },
  {
    id: 2,
    image: "https://avatars.githubusercontent.com/u/109144975?v=4",
    name: "이종훈",
    email: "dfjidjfi@gmail.com",
  },
  {
    id: 3,
    image: "https://avatars.githubusercontent.com/u/69510981?v=4",
    name: "삼삼삼",
    email: "3333333333@gmail.com",
  },
];

const user = {
  id: 0,
  name: "yeoularu",
  image: "https://avatars.githubusercontent.com/u/48755175?v=4",
  email: "yeoularu@gmail.com",
  likedPosts: [1, 2],
  likedProjects: [0],
  chatRooms: chatRooms,
};

export const handlers = [
  // User
  rest.post("/api/v1/members/join", async (req, res, ctx) => {
    // error test
    const { email } = await req.json();
    if (email === "error@test.com") return res(ctx.status(400));

    // Persist user's authentication in the session
    sessionStorage.setItem("joined", "true");
    return res(
      // Respond with a 200 status code
      ctx.status(200)
    );
  }),

  rest.post("/api/v1/members/login", (_, res, ctx) => {
    const joined = sessionStorage.getItem("joined");

    if (!joined) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: "Not authorized",
        })
      );
    }

    // If authenticated, return a mocked user details
    sessionStorage.setItem("logged-in", "true");
    return res(ctx.status(200));
  }),

  rest.get("/members/me", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(user));
  }),

  rest.get("/me/id", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(user.id));
  }),

  rest.get("/me/like/post", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(user.likedPosts));
  }),
  rest.get("/me/like/project", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(user.likedProjects));
  }),
  rest.get("/me/chatrooms", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(user.chatRooms));
  }),

  rest.get("/members/:id", (req, res, ctx) => {
    const { id } = req.params as { id: string };
    const user = users.find((user) => user.id === Number(id));
    if (!user) return res(ctx.status(404));
    return res(ctx.status(200), ctx.json(user));
  }),

  rest.put("/chat/create/:id", (req, res, ctx) => {
    const { id } = req.params as { id: string };
    if (!id || !users.find((user) => user.id === Number(id)))
      return res(ctx.status(400));
    chatRooms.push({
      roomId: 3,
      participantIds: [0, Number(id)],
      messages: [],
    });
    return res(ctx.status(200));
  }),

  // Post

  rest.post("/post/create", async (req, res, ctx) => {
    const { subject, content } = await req.json();
    if (subject === "error") return res(ctx.status(400));

    posts.push({
      id: posts.at(-1)?.id ? posts.at(-1)!.id + 1 : 0,
      title: subject,
      content,
      author: "new user",
      likes: 0,
    });
    console.log(posts);
    return res(ctx.status(200));
  }),

  rest.get("/post/postAll", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ data: posts }));
  }),

  rest.delete("/post/delete/:id", (req, res, ctx) => {
    const { id } = req.params as { id: string };
    const index = posts.findIndex((post) => post.id === parseInt(id));
    if (index === -1) return res(ctx.status(400));
    posts.splice(index, 1);

    return res(ctx.status(200));
  }),

  rest.get("/post/:id", (req, res, ctx) => {
    const { id } = req.params as { id: string };
    return res(
      ctx.status(200),
      ctx.json({ data: posts.find((post) => post.id === parseInt(id)) })
    );
  }),

  rest.put("/post/like/:id", (req, res, ctx) => {
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

    return res(ctx.status(200));
  }),

  // Project
  rest.post("/project/create", async (req, res, ctx) => {
    const { name, content, field, createDate, endDate } = await req.json();
    if (name === "error") return res(ctx.status(400));

    const id = projects.at(-1)?.id ? projects.at(-1)!.id + 1 : 0;

    projects.push({
      id,
      name,
      content,
      field,
      createDate,
      endDate,
      likes: 0,
    });

    return res(ctx.status(200), ctx.json(id));
  }),

  rest.get("/project/projectAll", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ data: projects }));
  }),

  rest.get("/project/:id", (req, res, ctx) => {
    const { id } = req.params as { id: string };
    return res(
      ctx.status(200),
      ctx.json({
        data: projects.find((project) => project.id === parseInt(id)),
      })
    );
  }),

  rest.delete("/project/delete/:id", (req, res, ctx) => {
    const { id } = req.params as { id: string };
    const index = projects.findIndex((project) => project.id === parseInt(id));
    if (index === -1) return res(ctx.status(400));
    projects.splice(index, 1);

    return res(ctx.status(200));
  }),

  rest.get("/project/search/:id", (req, res, ctx) => {
    const { id } = req.params as { id: string };
    const index = projects.findIndex((project) => project.id === parseInt(id));
    if (index === -1) return res(ctx.status(400));
    console.log(projects);

    return res(ctx.status(200), ctx.json({ data: projects[index] }));
  }),

  rest.put("/project/like/:id", (req, res, ctx) => {
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
];
