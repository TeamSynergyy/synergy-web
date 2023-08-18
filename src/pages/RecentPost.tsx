import PostCard from "components/post/PostCard";
import { Box, Stack } from "@mantine/core";
import { api } from "app/api";
import { useEffect, useState } from "react";
import { useIntersection } from "@mantine/hooks";
import PostSkeleton from "components/post/PostSkeleton";

export default function PostList() {
  const [page, setPage] = useState(0);
  const { data, isLoading, isSuccess, isError, error } =
    api.useGetRecentPostsQuery(page);

  const { ref, entry } = useIntersection();

  useEffect(() => {
    console.log(page);
    if (entry?.isIntersecting && isSuccess) {
      setPage(page + 1);
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
      <Stack ref={ref} w="100%" mt="md">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </Stack>
    </>
  );
}
