import { Avatar, Text, Button, Paper } from "@mantine/core";

interface UserCardProps {
  avatar: string;
  name: string;
  email: string;
  major: string;
}

export default function UserCard({
  avatar,
  name,
  email,
  major,
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
      <Avatar src={avatar} size={120} radius={120} mx="auto" />
      <Text ta="center" fz="lg" weight={500} mt="md">
        {name}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {email} • {major}
      </Text>

      <Button variant="default" fullWidth mt="md">
        프로필 보기
      </Button>
    </Paper>
  );
}
