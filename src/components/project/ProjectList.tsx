import ProjectCard from "./ProjectCard";
import { Stack } from "@mantine/core";
import { api } from "app/api";

function ProjectList() {
  const { data, isLoading, isSuccess, isError, error } =
    api.useGetAllProjectsQuery(null);

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = data.data.map(({ id }, i) => <ProjectCard key={i} id={id} />);
  } else if (isError) {
    console.error(error);
    content = <p>error! check the console message</p>;
  }

  return <Stack w="100%">{content}</Stack>;
}

export default ProjectList;
