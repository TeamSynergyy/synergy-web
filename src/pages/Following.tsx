import PostCard from "components/post/PostCard";
import { Button, Stack } from "@mantine/core";
import { api } from "app/api";
import { useEffect, useState } from "react";
import { useIntersection } from "@mantine/hooks";
import PostSkeleton from "components/post/PostSkeleton";
import HomeTab from "components/ui/HomeTab";

export default function Following() {
  const [end, setEnd] = useState<string | number>("");
  const { data, isLoading, isSuccess, isError, error } =
    api.useGetFollowingPostsQuery(end);

  const { ref, entry } = useIntersection();

  const hasNext = data?.next;

  const handleEnd = () => {
    if (data?.content) setEnd(data?.content[data?.content.length - 1].postId);
  };

  useEffect(() => {
    if (entry?.isIntersecting && isSuccess) handleEnd();
    if (!hasNext) return;
  }, [entry?.isIntersecting, isSuccess]);

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    // 포스트가 많아졌을 때 느려짐. <List />를 추가하도록 리팩토링 필요
    content = data.content.map((post, i) => <PostCard key={i} post={post} />);
  } else if (isError) {
    console.error(error);
    content = <p>error! check the console message</p>;
  }
  console.log(data?.next);
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
