import { Avatar, Table, Group, Text, ScrollArea } from "@mantine/core";

import { api } from "app/api";

interface UsersStackProps {
  userIds: string[];
  elements?: React.ReactNode[];
}

export function UsersStack({ userIds, elements }: UsersStackProps) {
  if (userIds.length === 0) return null;

  const { data, isLoading, isError, error } = api.useGetUsersQuery(userIds);
  if (isLoading) return <div>loading...</div>;
  if (isError) {
    console.error(error);
    return <div>error! check the console message</div>;
  }
  if (!data) return <div>데이터를 불러오지 못했습니다.</div>;

  const rows = data.map((item) => (
    <tr key={item.id}>
      <td>
        <Group spacing="sm">
          <Avatar size={40} src={item.avatar} radius={40} />
          <div>
            <Text fz="sm" fw={500}>
              {item.name}
            </Text>
            <Text c="dimmed" fz="xs">
              {item.major}
            </Text>
          </div>
        </Group>
      </td>
      {elements?.map((element, i) => (
        <td key={i}>{element}</td>
      ))}
    </tr>
  ));

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="md">
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
