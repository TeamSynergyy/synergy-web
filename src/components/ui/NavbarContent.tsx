import { useLocation } from "react-router-dom";
import { ContentCategory } from "./ContentCategory";
import ChatNavbar from "components/chat/ChatNavbar";

export function NavbarContent() {
  const { pathname } = useLocation();
  const page = pathname.split("/")[1];
  console.log(page);
  switch (page) {
    case "chat":
      return <ChatNavbar />;
    case "home":
      return <ContentCategory />;
    default:
      return <></>;
  }
}
