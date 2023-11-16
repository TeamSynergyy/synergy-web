import TrendingPosts from "components/post/TrendingPosts";
import { ProjectScheduleNavBar } from "components/project/ProjectScheduleNavBar";
import { useLocation } from "react-router-dom";

function AsideContent() {
  const { pathname } = useLocation();
  const page = pathname.split("/")[1];

  switch (page) {
    case "home":
      return <TrendingPosts />;
    case "project":
      return <ProjectScheduleNavBar />;
    default:
      return <></>;
  }
}

export default AsideContent;
