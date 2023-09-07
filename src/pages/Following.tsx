import HomeTab from "components/ui/HomeTab";
import PostCard from "components/post/PostCard";
import { Box, Button, Stack } from "@mantine/core";
import { api } from "app/api";
import { useEffect, useState } from "react";
import { useIntersection } from "@mantine/hooks";
import PostSkeleton from "components/post/PostSkeleton";
import usePage from "hooks/usePage";

export default function Following() {
  const { initPage, getPage, increasePage } = usePage();
  const pageKey = "following";
  const [page, setPage] = useState(getPage(pageKey) || 0);
  const { data, isLoading, isSuccess, isError, error } =
    api.useGetFollowingContentsQuery(page);

  const { ref, entry } = useIntersection();

  const isEnd = data?.totalPages !== undefined && data?.totalPages <= page;

  const handlePage = () => {
    increasePage(pageKey);
    setPage(getPage(pageKey));
  };

  useEffect(() => {
    if (getPage(pageKey) === undefined) {
      initPage(pageKey);
    }
  }, []);

  useEffect(() => {
    if (entry?.isIntersecting && isSuccess) handlePage();
    if (isEnd) return;
  }, [entry?.isIntersecting, isSuccess]);

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = data.content.map((post, i) => <PostCard key={i} post={post} />);
  } else if (isError) {
    console.error(error);
    content = <p>error! check the console message</p>;
  }

  return (
    <>
      <HomeTab />
      <Stack w="100%">{content}</Stack>
      <Stack ref={ref} w="100%" mt="md" display={isEnd ? "none" : "flex"}>
        <PostSkeleton />
        <PostSkeleton />
        <Button m="auto" onClick={handlePage}>
          더 보기
        </Button>
      </Stack>
    </>
  );
}
