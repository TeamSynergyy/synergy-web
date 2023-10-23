import { Card, LoadingOverlay } from "@mantine/core";
import { api } from "app/api";
import NewPostComment from "components/post/NewPostComment";
import PostCard from "components/post/PostCard";

import dayjs from "dayjs";
import { useParams } from "react-router-dom";

import relativeTime from "dayjs/plugin/relativeTime";
import CommentStack from "components/comment/CommentStack";
dayjs.extend(relativeTime);

export default function PostDetail() {
  const postId = parseInt(useParams().id as string);
  const { data: post, isLoading } = api.useGetPostQuery(postId);

  if (isLoading) return <LoadingOverlay visible />;
  if (!post) return null;

  return (
    <>
      <PostCard post={post} isDetail />

      <Card.Section mt={10}>
        <NewPostComment postId={postId} />
      </Card.Section>

      <Card.Section>
        <CommentStack postId={postId} />
      </Card.Section>
    </>
  );
}
