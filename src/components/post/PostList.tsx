import PostCard from "./PostCard";
import { Stack } from "@mantine/core";
import { api } from "app/api";

function PostList() {
  const { data, isLoading, isSuccess, isError, error } =
    api.useGetAllPostsQuery(null);

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = data.data.map(({ id }, i) => <PostCard key={i} id={id} />);
  } else if (isError) {
    console.error(error);
    content = <p>error! check the console message</p>;
  }

  return <Stack w="100%">{content}</Stack>;
}

export default PostList;
