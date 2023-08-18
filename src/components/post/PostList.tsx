import PostCard from "./PostCard";
import { Box, Stack } from "@mantine/core";
import { api } from "app/api";
import { useEffect, useState } from "react";
import { useIntersection } from "@mantine/hooks";
import PostSkeleton from "./PostSkeleton";

function PostList() {
  const [page, setPage] = useState(0);
  const { data, isLoading, isSuccess, isError, error } =
    api.useGetRecentPostsQuery(page);

  const { ref, entry } = useIntersection();

  useEffect(() => {
    if (entry?.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, [entry?.isIntersecting]);

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = data.data.map((post, i) => <PostCard key={i} post={post} />);
  } else if (isError) {
    console.error(error);
    content = <p>error! check the console message</p>;
  }

  return (
    <>
      <Stack w="100%">{content}</Stack>
      <Stack ref={ref} w="100%">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </Stack>
    </>
  );
}

export default PostList;
