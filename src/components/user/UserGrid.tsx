import { Paper, SimpleGrid, Title, Text } from "@mantine/core";
import { User } from "types";
import UserCard from "./UserCard";

export default function UserGrid({
  title,
  users,
}: {
  title: string;
  users: User[];
}) {
  if (users.length === 0) {
    return null;
  }
  return (
    <Paper>
      <Title order={3}>{title}</Title>
      <SimpleGrid
        cols={3}
        spacing="lg"
        breakpoints={[
          { maxWidth: "md", cols: 2, spacing: "md" },
          { maxWidth: "xs", cols: 1, spacing: "sm" },
        ]}
      >
        {users.map((user) => (
          <UserCard key={user.userId} {...user} />
        ))}
      </SimpleGrid>
    </Paper>
  );
}
