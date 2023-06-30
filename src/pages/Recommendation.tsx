import { Button, Group, Stack } from "@mantine/core";
import { api } from "app/api";
import { Link } from "react-router-dom";
import PostList from "components/post/PostList";
import ProjectList from "components/project/ProjectList";

export default function Recommendation() {
  return (
    <Stack
      mih={300}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      })}
      align="center"
    >
      <Group>
        <Link to={"/new/post"}>
          <Button>글 쓰기</Button>
        </Link>
        <Link to={"/new/project"}>
          <Button>새 프로젝트</Button>
        </Link>
      </Group>

      <PostList />
      <ProjectList />
    </Stack>
  );
}
