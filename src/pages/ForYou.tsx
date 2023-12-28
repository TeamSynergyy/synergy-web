import PostCard from "components/post/PostCard";
import { Button, Stack } from "@mantine/core";
import { api } from "app/api";
import { useEffect, useState } from "react";
import { useIntersection } from "@mantine/hooks";
import PostSkeleton from "components/post/PostSkeleton";
import HomeTab from "components/ui/HomeTab";
import { Post } from "types";
import ProjectCard from "components/project/ProjectCard";

export default function ForYou() {
  const [end, setEnd] = useState<string | number>("");
  const [projectEnd, setProjectEnd] = useState<string | number>("");
  const { data, isLoading, isSuccess, isError, error } =
    api.useGetRecommendedPostsQuery(end);

  const { data: projects } = api.useGetRecommendedProjectsQuery(projectEnd);

  const { ref, entry } = useIntersection();

  const hasNext = data?.hasNext;

  const handleEnd = () => {
    if (data?.content) setEnd(data?.content[data?.content.length - 1].postId);
    if (projects?.content)
      setProjectEnd(projects?.content[projects?.content.length - 1].projectId);
  };

  useEffect(() => {
    if (entry?.isIntersecting && isSuccess) handleEnd();
    if (!hasNext) return;
  }, [entry?.isIntersecting, isSuccess]);

  if (isLoading) {
    return <p>"Loading..."</p>;
  }

  if (isError) {
    console.log(error);
    return <p>error! check the console message</p>;
  }

  let content;
  if (data?.content) {
    content = data.content.map((post: Post, i) => {
      if (i % 5 === 0 && projects?.content[i / 5])
        return (
          <>
            <PostCard key={"post" + i} post={post} />
            <ProjectCard
              key={"project" + i}
              project={projects?.content[i / 5]}
            />
          </>
        );
      else return <PostCard key={"post" + i} post={post} />;
    });
  }

  return (
    <>
      <HomeTab />
      <Stack w="100%">{content}</Stack>
      <Stack ref={ref} w="100%" mt="md" display={!hasNext ? "none" : "flex"}>
        <PostSkeleton />
        <PostSkeleton />
        <Button m="auto" onClick={handleEnd}>
          더 보기
        </Button>
      </Stack>
    </>
  );
}
