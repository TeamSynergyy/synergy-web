import TrendingPosts from "components/post/TrendingPosts";
import { useLocation } from "react-router-dom";

function AsideContent() {
  const { pathname } = useLocation();
  const page = pathname.split("/")[1];

  switch (page) {
    case "home":
      return <TrendingPosts />;
    default:
      return <></>;
  }
}

export default AsideContent;
