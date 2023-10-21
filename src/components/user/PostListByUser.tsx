import { api } from "app/api";
import { Button, Stack, Text } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import PostCard from "components/post/PostCard";
import { useIntersection } from "@mantine/hooks";
import PostSkeleton from "components/post/PostSkeleton";
import { useState, useEffect } from "react";

export default function PostListByUser({ userId }: { userId: string }) {
  const [page, setPage] = useState(0);
  const [isEnd, setIsEnd] = useState(false);

  const { data, isLoading, isSuccess, isError, error } =
    api.useGetPostsByUserQuery([userId, page]);

  const { ref, entry } = useIntersection();
  useEffect(() => {
    if (entry?.isIntersecting && isSuccess) {
      setPage((prev) => prev + 1);
    }
    if (page === data?.totalPages) return setIsEnd(true);
  }, [entry?.isIntersecting, isSuccess]);

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = data.content?.map((post, i) => <PostCard key={i} post={post} />);
  } else if (isError) {
    console.error(error);
    content = <p>error! check the console message</p>;
  }

  return (
    <>
      <Stack w="100%" mt="sm">
        {content}
      </Stack>
      <Stack ref={ref} w="100%" pt="md" display={isEnd ? "none" : "flex"}>
        <PostSkeleton />
        <PostSkeleton />
        <Button m="auto" onClick={() => setPage((prev) => prev + 1)}>
          더 보기
        </Button>
      </Stack>
    </>
  );
}
