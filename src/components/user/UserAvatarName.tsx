import { Group, Avatar, Text } from "@mantine/core";
import { api } from "app/api";

export default function UserAvatarName({ userId }: { userId: string }) {
  const { data, isLoading, isError, error } = api.useGetUserQuery(userId);

  if (isLoading) return <p>"Loading..."</p>;
  if (isError) {
    console.error(error);
    return <p>error! check the console message</p>;
  }
  if (!data) return <p>사용자의 데이터를 불러오지 못했습니다.</p>;

  const { username, profileImageUrl } = data;

  return (
    <Group spacing={2}>
      <Avatar src={profileImageUrl} radius="xl" size="sm" />
      <Text size="xs">{username}</Text>
    </Group>
  );
}
