import { MantineProvider } from "@mantine/core";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
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
import { selectCurrentToken } from "app/authSlice";
import { useSelector } from "react-redux";
import PostDetail from "pages/PostDetail";
import useAuth from "hooks/useAuth";
import { useEffect } from "react";
import Following from "pages/Following";
import Test from "pages/Test";

const PrivateRoutes = () => {
  // const auth = useSelector(selectCurrentToken);
  const { auth } = useAuth();

  return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/auth" />;
};

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/home/foryou" />} />
              <Route path="home">
                <Route index element={<Navigate to="foryou" />} />
                <Route path="foryou" element={<ForYou />} />
                <Route path="following" element={<Following />} />;
                <Route path="recent">
                  <Route path="post" element={<RecentPost />} />
                  <Route path="project" element={<RecentProject />} />R
                </Route>
              </Route>

              <Route path="people">
                <Route index element={<People />} />
                <Route path=":id" element={<Profile />} />
              </Route>

              <Route path="chat">
                <Route index element={<Chat />} />
                <Route path=":id" element={<ChatRoom />} />R
              </Route>

              <Route path="notification" element={<Notification />} />

              <Route path="post">
                <Route path=":id" element={<PostDetail />} />
              </Route>
              <Route path="project">
                <Route path=":id" element={<ProjectDetail />} />
              </Route>

              <Route path="search" element={<Search />} />

              <Route path="new/post" element={<NewPost />} />
              <Route path="new/project" element={<NewProject />} />
            </Route>

            <Route path="test" element={<Test />} />
          </Route>

          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}
