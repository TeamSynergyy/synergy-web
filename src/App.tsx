import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import { store } from "app/store";
import {
  People,
  Chat,
  Notification,
  Auth,
  NewPost,
  NewProject,
  ProjectDetail,
  Recommendation,
} from "pages";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Layout from "components/ui/Layout";

const PrivateRoutes = () => {
  const auth = sessionStorage.getItem("logged-in");
  return auth ? <Outlet /> : <Navigate to="/auth" />;
};

export default function App() {
  return (
    <Provider store={store}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Layout />}>
                <Route index element={<Recommendation />} />
                <Route path="people" element={<People />} />
                <Route path="chat" element={<Chat />} />
                <Route path="notification" element={<Notification />} />
                <Route path="project">
                  <Route path=":id" element={<ProjectDetail />} />
                </Route>
                <Route path="new/post" element={<NewPost />} />
                <Route path="new/project" element={<NewProject />} />
              </Route>
            </Route>

            <Route path="/auth" element={<Auth />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </Provider>
  );
}
