import { useLocation } from "react-router-dom";
import { ContentCategory } from "./ContentCategory";
import ChatNavbar from "components/chat/ChatNavbar";
import { ProjectNoticeNavBar } from "components/project/ProjectNoticeNavBar";

export function NavbarContent() {
  const { pathname } = useLocation();
  const page = pathname.split("/")[1];

  switch (page) {
    case "chat":
      return <ChatNavbar />;
    case "home":
      return <ContentCategory />;
    case "project":
      return <ProjectNoticeNavBar />;
    default:
      return <></>;
  }
}
