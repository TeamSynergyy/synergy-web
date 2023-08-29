import { Card, Group, Skeleton } from "@mantine/core";

export default function PostSkeleton() {
  return (
    <Card withBorder radius="md" p="md">
      <Group align="center">
        <Skeleton height={36} circle mb="xl" />{" "}
        <Skeleton height={12} mb="xl" width="20%" radius="xl" />
      </Group>

      <Skeleton height={8} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} width="70%" radius="xl" />
      <Skeleton height={36} width={36} mt={20} />
    </Card>
  );
}
