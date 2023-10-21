import { Avatar, Box, Button, Flex, Group, Paper, Text } from "@mantine/core";
import { api } from "app/api";

export default function ApplicantBar({
  projectId,
  userId,
}: {
  projectId: number;
  userId: string;
}) {
  const { data: item } = api.useGetUserQuery(userId);
  const acceptApplicant = api.useAcceptApplicantMutation()[0];
  const rejectApplicant = api.useRejectApplicantMutation()[0];

  const handleAccept = () => acceptApplicant([projectId, userId]);
  const handleReject = () => rejectApplicant([projectId, userId]);

  if (!item) return null;
  return (
    <Paper w="100%" p="md" withBorder>
      <Flex justify="space-between">
        <Group spacing="sm">
          <Avatar size={40} src={item.profileImageUrl} radius={40} />
          <div>
            <Text fz="sm" fw={500}>
              {item.username}
            </Text>
            <Text c="dimmed" fz="xs">
              {item.major}
            </Text>
          </div>
        </Group>
        <Group spacing="sm">
          <Button onClick={handleAccept}>수락</Button>
          <Button onClick={handleReject}>거절</Button>
        </Group>
      </Flex>
    </Paper>
  );
}
