import { ButtonProps, Group, Avatar, Text, Button, Paper } from "@mantine/core";
import { api } from "app/api";

interface UserButtonProps extends ButtonProps {
  userId: string;
  handleClick: () => void;
}

export function UserCustomButton({
  userId,
  handleClick,
  ...others
}: UserButtonProps) {
  const { data, isLoading, isError, error } = api.useGetUserQuery(userId);

  if (isLoading) return <p>"Loading..."</p>;
  if (isError) {
    console.error(error);
    return <p>error! check the console message</p>;
  }
  if (!data) return <p>사용자의 데이터를 불러오지 못했습니다.</p>;

  const { name, profileImageUrl } = data;

  return (
    <Paper w="100%" p="xs">
      <Group spacing="xs">
        <Avatar src={profileImageUrl} radius="xl" />
        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>
        </div>
        <Button onClick={handleClick} {...others} />
      </Group>
    </Paper>
  );
}
