import { Paper, Flex, Avatar, Button, Text, Stack, Group } from "@mantine/core";
import { api } from "app/api";
import dayjs from "dayjs";
import { Comment } from "types";

export default function CommentCard({ userId, content, updateAt }: Comment) {
  const { data: user } = api.useGetUserQuery(userId);
  const fromNow = dayjs(updateAt + "Z").fromNow();

  return (
    <Paper w="100%" p="sm">
      <Flex gap="xs">
        <Avatar src={user?.profileImageUrl} radius="xl" alt="avatar" />
        <Stack spacing="xs">
          <Group>
            <Text weight={600}>{user?.username}</Text>
            <Text>{fromNow}</Text>
          </Group>

          <Text w="100%" sx={{ whiteSpace: "pre-wrap" }}>
            {content}
          </Text>
        </Stack>
      </Flex>
    </Paper>
  );
}
