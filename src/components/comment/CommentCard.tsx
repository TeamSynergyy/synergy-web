import { Paper, Flex, Avatar, Button, Text, Stack, Group } from "@mantine/core";
import { api } from "app/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import { Comment } from "types";

export default function CommentCard({ userId, comment, updateAt }: Comment) {
  const { data: user } = api.useGetUserQuery(userId);

  dayjs.extend(relativeTime);
  dayjs.extend(utc);
  const fromNow = dayjs.utc(updateAt).local().fromNow();

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
            {comment}
          </Text>
        </Stack>
      </Flex>
    </Paper>
  );
}
