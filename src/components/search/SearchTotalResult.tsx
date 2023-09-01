import { api } from "app/api";
import { Button, Space, Stack, Text } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import PostCard from "components/post/PostCard";
import ProjectCard from "components/project/ProjectCard";

import UserCard from "components/user/UserCard";

export default function SearchTotalResult({
  handleTabChange,
}: {
  handleTabChange: (tab: string) => void;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");

  if (!query) return <Text>검색어가 없습니다.</Text>;

  const { data: postsData, isLoading: isPostsLoading } =
    api.useSearchPostsQuery([query, 0]);
  const { data: projectData, isLoading: isProjectsLoading } =
    api.useSearchProjectsQuery([query, 0]);
  const { data: usersData, isLoading: isUsersLoading } =
    api.useSearchUsersQuery([query, 0]);

  if (isPostsLoading || isProjectsLoading || isUsersLoading)
    return <p>Loading...</p>;

  if (!postsData || !projectData || !usersData) return <p>Error!</p>;

  const data = {
    totalElements:
      postsData.totalElements +
      projectData.totalElements +
      usersData.totalElements,
    posts: postsData.content.slice(0, 3),
    projects: projectData.content.slice(0, 3),
    users: usersData.content.slice(0, 3),
  };

  if (!data?.totalElements) return <Text>검색 결과가 없습니다.</Text>;

  const { totalElements, posts, projects, users } = data;

  return (
    <>
      <Text size="sm" mt="sm">
        {query} 전체 검색 결과 {totalElements}건
      </Text>

      <Stack spacing="md" my="xl">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        <Button m="auto" onClick={() => handleTabChange("post")}>
          게시글 더 보기
        </Button>
      </Stack>
      <Space h="md" />
      <Stack spacing="md" my="xl">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        <Button m="auto" onClick={() => handleTabChange("project")}>
          프로젝트 더 보기
        </Button>
      </Stack>
      <Space h="md" />
      <Stack spacing="md" my="xl">
        {users.map((user) => (
          <UserCard key={user.id} {...user} />
        ))}
        <Button m="auto" onClick={() => handleTabChange("people")}>
          사람 더 보기
        </Button>
      </Stack>
    </>
  );
}
