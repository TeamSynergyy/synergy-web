import { Avatar, Text, Button, Paper } from "@mantine/core";
import { Link } from "react-router-dom";

interface UserCardProps {
  userId: string;
  profileImageUrl: string;
  username: string;
  email: string;
  major: string;
  minor?: string;
}

export default function UserCard({
  userId,
  profileImageUrl,
  username,
  email,
  major,
  minor,
}: UserCardProps) {
  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Avatar src={profileImageUrl} size={120} radius={120} mx="auto" />
      <Text ta="center" fz="lg" weight={500} mt="md">
        {username}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {email} • {major}
      </Text>
      {minor && (
        <Text ta="center" c="dimmed" fz="sm">
          복수/부전공: {minor}
        </Text>
      )}
      <Link to={`/people/${userId}`}>
        <Button variant="default" fullWidth mt="md">
          프로필 보기
        </Button>
      </Link>
    </Paper>
  );
}
