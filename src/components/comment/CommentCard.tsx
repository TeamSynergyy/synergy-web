import { Paper, Flex, Avatar, Button, Text, Stack, Group } from "@mantine/core";
import { api } from "app/api";
import dayjs from "dayjs";
import { Comment } from "types";

export default function CommentCard({ memberId, content, updateAt }: Comment) {
  const { data: user } = api.useGetUserQuery(memberId);
  const fromNow = dayjs(updateAt + "Z").fromNow();

  return (
    <Paper w="100%" p="sm">
      <Flex gap="xs">
        <Avatar src={user?.avatar} radius="xl" alt="avatar" />
        <Stack spacing="xs">
          <Group>
            <Text weight={600}>{user?.name}</Text>
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
