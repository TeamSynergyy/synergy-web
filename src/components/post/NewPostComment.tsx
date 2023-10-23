import { Avatar, Button, Flex, Group, Paper, Textarea } from "@mantine/core";
import { api } from "app/api";
import { useState } from "react";

export default function NewPostComment({ postId }: { postId: number }) {
  const [value, setValue] = useState("");
  const writeComment = api.useWritePostCommentMutation()[0];

  const { data: myInfo } = api.useGetMyInfoQuery(null);
  const isCommentEmpty = !value.trim();

  const handleComment = async (comment: string) => {
    if (!comment) return;
    try {
      await writeComment({ postId, comment }).unwrap();
      setValue("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Paper w="100%" p="sm" withBorder>
      <Flex gap="sm">
        <Avatar src={myInfo?.profileImageUrl} radius="xl" alt="avatar" />
        <Textarea
          w="100%"
          autosize
          variant="unstyled"
          placeholder="새 댓글 작성"
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      </Flex>
      <Flex justify="flex-end">
        <Button
          mt="md"
          onClick={() => handleComment(value)}
          disabled={isCommentEmpty}
        >
          등록
        </Button>
      </Flex>
    </Paper>
  );
}
