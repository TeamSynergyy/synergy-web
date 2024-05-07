import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOverlay, MantineProvider } from "@mantine/core";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import {
  selectCurrentToken,
  selectIsLogin,
  setAccessToken,
} from "app/authSlice";
import Layout from "components/ui/Layout";
import ChatRoom from "components/chat/ChatRoom";
import Profile from "pages/Profile";
import Auth from "pages/Auth";
import Chat from "pages/Chat";
import NewPost from "pages/NewPost";
import NewProject from "pages/NewProject";
import People from "pages/People";
import ProjectDetail from "pages/ProjectDetail";
import ForYou from "pages/ForYou";
import Notification from "pages/Notification";
import RecentPost from "pages/RecentPost";
import RecentProject from "pages/RecentProject";
import Search from "pages/Search";
import PostDetail from "pages/PostDetail";
import Following from "pages/Following";
import ProjectNotice from "components/project/ProjectNotice";
import ProjectSchedule from "components/project/ProjectSchedule";
import ProjectPeerRating from "components/project/ProjectPeerRating";
import ProjectTaskBoard from "components/project/task/ProjectTaskBoard";

import { Welcome } from "pages/Welcome";
import SignUpAuthCode from "pages/SignUpAuthCode";
import { api } from "app/api";
import { useAppDispatch } from "app/store";

// for test chat
const TestAuthPage = () => {
  const appDispatch = useAppDispatch();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [participantId, setParticipantId] = useState("");
  const [roomId, setRoomId] = useState("");

  const handleSubmit = async () => {
    await appDispatch(
      api.util.upsertQueryData("getMyInfo", null, {
        userId: id,
        username: "user-" + id,

        email: "string",
        profileImageUrl: "string",
        backImage: "string",
        organization: "string",
        major: "string",
        minor: "string",
        interestAreas: "string",
        skills: "string",
        temperature: 38,
        bio: "string",
      })
    );
    await appDispatch(
      api.util.upsertQueryData("getMyChatRooms", null, [
        {
          roomId: Number(roomId),
          participantIds: [id, participantId],
          messages: [],
        },
      ])
    );
    dispatch(setAccessToken("test access token"));
    navigate(`/chat/${roomId}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter ID"
        />

        <input
          type="text"
          value={participantId}
          onChange={(e) => setParticipantId(e.target.value)}
          placeholder="Enter participant's Id"
        />
        <input
          type="number"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter Room ID (number)"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const PrivateRoutes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectCurrentToken);

  const refetchToken = useCallback(async () => {
    if (token) return;

    const userId = localStorage.getItem("last-login-user-id");
    if (!userId) navigate("/auth");

    const refreshResult: {
      header: { code: number; message: string };
      body: { token: string };
    } = await axios.get(
      import.meta.env.VITE_API_URL +
        "/api/v1/auth/reissue-with-refreshtoken/" +
        userId
    );

    if (refreshResult.body?.token) {
      const newAccessToken = refreshResult.body.token;
      dispatch(setAccessToken(newAccessToken));
    }
  }, [token]);

  if (!token) {
    refetchToken();
  }

  // for test
  return token ? <Outlet /> : <Navigate to="/auth-test" />;
  return token ? <Outlet /> : <Navigate to="/auth" />;
};

export default function App() {
  const token = useSelector(selectCurrentToken);

  return (
    <MantineProvider withCSSVariables withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={<Navigate to={token ? "/home/foryou" : "/welcome"} />}
          />

          <Route path="/welcome" element={<Welcome />} />
          <Route path="/auth" element={<Auth />} />

          {/* for test */}
          <Route path="/auth-test" element={<TestAuthPage />} />

          <Route path="/auth/code" element={<SignUpAuthCode />} />
          <Route path="/home/recent" element={<Layout />}>
            <Route path="post" element={<RecentPost />} />
            <Route path="project" element={<RecentProject />} />
          </Route>

          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Layout />}>
              <Route path="home">
                <Route index element={<Navigate to="foryou" />} />
                <Route path="foryou" element={<ForYou />} />
                <Route path="following" element={<Following />} />
              </Route>

              <Route path="people">
                <Route index element={<People />} />
                <Route path=":id" element={<Profile />} />
              </Route>

              <Route path="chat">
                <Route index element={<Chat />} />
                <Route path=":id" element={<ChatRoom />} />
              </Route>

              <Route path="notification" element={<Notification />} />

              <Route path="post">
                <Route path=":id" element={<PostDetail />} />
              </Route>
              <Route path="project">
                <Route path=":id">
                  <Route index element={<ProjectDetail />} />
                  <Route path="notice" element={<ProjectNotice />} />
                  <Route path="schedule" element={<ProjectSchedule />} />
                  <Route path="task" element={<ProjectTaskBoard />} />
                  <Route path="peer-rating" element={<ProjectPeerRating />} />
                </Route>
              </Route>

              <Route path="search" element={<Search />} />

              <Route path="new/post" element={<NewPost />} />
              <Route path="new/project" element={<NewProject />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}
