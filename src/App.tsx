import { useCallback } from "react";
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
import OauthRedirect from "pages/OauthRedirect";
import ProjectNotice from "components/project/ProjectNotice";
import ProjectSchedule from "components/project/ProjectSchedule";
import ProjectPeerRating from "components/project/ProjectPeerRating";
import ProjectTaskBoard from "components/project/task/ProjectTaskBoard";

import { Welcome } from "pages/Welcome";

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
      import.meta.env.VITE_API_URL + "/api/v1/auth/refresh/" + userId
    );
    // 성공적인 요청에 대한 처리

    if (refreshResult.body?.token) {
      const newAccessToken = refreshResult.body.token;
      dispatch(setAccessToken(newAccessToken));
    }
  }, [token]); // 의존성 배열에 token 추가

  if (!token) {
    refetchToken();
  }

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
          <Route path="/oauth/redirect" element={<OauthRedirect />} />
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
                {/* <Route path="recent">
                  <Route path="post" element={<RecentPost />} />
                  <Route path="project" element={<RecentProject />} />
                </Route> */}
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
