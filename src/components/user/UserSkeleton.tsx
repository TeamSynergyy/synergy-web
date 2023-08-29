import { Avatar, Text, Button, Paper, Skeleton, Stack } from "@mantine/core";

export default function UserSkeleton() {
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
      <Stack align="center">
        <Skeleton height={120} circle mb="xl" />
        <Skeleton height={12} w="30%" radius="xl" />
        <Skeleton height={8} w="70%" radius="xl" />
        <Skeleton height={32} mt={6} radius="xs" />
      </Stack>
    </Paper>
  );
}
