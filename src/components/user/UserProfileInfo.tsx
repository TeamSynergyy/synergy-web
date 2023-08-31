import { Space, Stack, Text } from "@mantine/core";
import { api } from "app/api";
import ProjectCard from "components/project/ProjectCard";
import { Project } from "types";

export default function UserProfileInfo({ userId }: { userId: string }) {
  const { data: projects } = api.useGetProjectsByUserQuery(userId);

  return (
    <Stack p="xs">
      {projects !== undefined && (
        <>
          <Text fz="xl" fw={600} ml="xs">
            프로젝트
          </Text>
          {projects.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </>
      )}

      <Space h="lg" />
      <Text fz="xl" fw={600} ml="xs">
        능력
      </Text>
    </Stack>
  );
}
