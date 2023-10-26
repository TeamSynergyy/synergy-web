import { Space, Stack, Text } from "@mantine/core";
import { api } from "app/api";
import ProjectCard from "components/project/ProjectCard";
import { Project } from "types";

export default function UserProfileInfo({ userId }: { userId: string }) {
  const { data } = api.useGetProjectsByUserQuery(userId);
  const projects = data;
  console.log(data);
  return (
    <Stack p="xs">
      {projects !== undefined && (
        <>
          <Text fz="xl" fw={600} ml="xs">
            프로젝트
          </Text>
          {projects.map((project: Project) => (
            <ProjectCard key={project.projectId} project={project} />
          ))}
        </>
      )}

      <Space h="lg" />
    </Stack>
  );
}
