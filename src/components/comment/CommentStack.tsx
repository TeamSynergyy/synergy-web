import { Stack } from "@mantine/core";
import { api } from "app/api";
import CommentCard from "./CommentCard";

export default function CommentStack({ postId }: { postId: number }) {
  const { data } = api.useGetPostCommentsQuery(postId);

  return (
    <Stack>
      {data &&
        data.map((comment) => (
          <CommentCard key={comment.commentId} {...comment} />
        ))}
    </Stack>
  );
}
