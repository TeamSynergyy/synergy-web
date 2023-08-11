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
import Recommendation from "pages/Recommendation";
import Notification from "pages/Notification";

const PrivateRoutes = () => {
  const auth = sessionStorage.getItem("logged-in");
  return auth ? <Outlet /> : <Navigate to="/auth" />;
};

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Recommendation />} />
              <Route path="people" element={<People />} />
              <Route path="chat">
                <Route index element={<Chat />} />
                <Route path=":id" element={<ChatRoom />} />
              </Route>
              <Route path="notification" element={<Notification />} />
              <Route path="project">
                <Route path=":id" element={<ProjectDetail />} />
              </Route>
              <Route path="profile">
                <Route path=":id" element={<Profile />} />
              </Route>
              <Route path="new/post" element={<NewPost />} />
              <Route path="new/project" element={<NewProject />} />
            </Route>
          </Route>

          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}
