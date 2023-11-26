import { Avatar, Box, Button, Flex, Group, Paper, Text } from "@mantine/core";
import { api } from "app/api";
import { User } from "types";

export default function ApplicantBar({
  projectId,
  user,
}: {
  projectId: number;
  user: User;
}) {
  const acceptApplicant = api.useAcceptApplicantMutation()[0];
  const rejectApplicant = api.useRejectApplicantMutation()[0];

  const handleAccept = () => acceptApplicant([projectId, user.userId]);
  const handleReject = () => rejectApplicant([projectId, user.userId]);

  if (!user) return null;
  return (
    <Paper w="100%" p="md" withBorder>
      <Flex justify="space-between">
        <Group spacing="sm">
          <Avatar size={40} src={user.profileImageUrl} radius={40} />
          <div>
            <Text fz="sm" fw={500}>
              {user.username}
            </Text>
            <Text c="dimmed" fz="xs">
              {user.major}
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
