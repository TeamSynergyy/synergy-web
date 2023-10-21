import { Button, Stack } from "@mantine/core";
import { api } from "app/api";
import { useEffect, useState } from "react";
import { useIntersection } from "@mantine/hooks";
import PostSkeleton from "components/post/PostSkeleton";
import ProjectCard from "components/project/ProjectCard";

export default function RecentProject() {
  const [end, setEnd] = useState<null | number>(null);
  const { data, isLoading, isSuccess, isError, error } =
    api.useGetRecentProjectsQuery(end);

  const { ref, entry } = useIntersection();

  const isLast = data?.next === false;

  const handleEnd = () => {
    if (!data?.content) return;
    setEnd(data?.content[data?.content.length - 1].projectId);
  };

  useEffect(() => {
    if (entry?.isIntersecting && isSuccess) handleEnd();
    if (isLast) return;
  }, [entry?.isIntersecting, isSuccess]);

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = data.content.map((project, i) => (
      <ProjectCard key={i} project={project} />
    ));
  } else if (isError) {
    console.error(error);
    content = <p>error! check the console message</p>;
  }

  return (
    <>
      <Stack w="100%">{content}</Stack>
      <Stack ref={ref} w="100%" mt="md" display={isLast ? "none" : "flex"}>
        <PostSkeleton />
        <PostSkeleton />
        <Button m="auto" onClick={handleEnd}>
          더 보기
        </Button>
      </Stack>
    </>
  );
}
