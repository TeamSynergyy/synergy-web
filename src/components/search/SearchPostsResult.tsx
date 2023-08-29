import { api } from "app/api";
import { Button, Stack, Text } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import PostCard from "components/post/PostCard";
import { useIntersection } from "@mantine/hooks";
import PostSkeleton from "components/post/PostSkeleton";
import { useState, useEffect } from "react";
import SearchPagination from "./SearchPagination";

export default function SearchPostsResult() {
  const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const { data, isLoading, isSuccess, isError, error } =
    api.useSearchPostsQuery([query, page - 1]);

  const totalPages = data?.totalPages;

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = data.contents?.map((post, i) => <PostCard key={i} post={post} />);
  } else if (isError) {
    console.error(error);
    content = <p>error! check the console message</p>;
  }

  return (
    <>
      <Stack w="100%">
        <Text size="sm" mt="sm">
          {query} 게시글 검색 결과 {data?.totalElements}건
        </Text>
        {content}
        {totalPages && <SearchPagination {...{ totalPages, page, setPage }} />}
      </Stack>
    </>
  );
}
