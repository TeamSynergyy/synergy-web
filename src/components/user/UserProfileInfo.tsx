import { Space, Stack, Text } from "@mantine/core";
import { api } from "app/api";
import ProjectCard from "components/project/ProjectCard";
import { Project } from "types";

export default function UserProfileInfo({ userId }: { userId: string }) {
  const { data: user } = api.useGetUserQuery(userId);
  const { data: projects } = api.useGetProjectsByUserQuery(userId);
  return (
    <Stack p="xs">
      {user?.interestAreas && (
        <>
          <Text fz="xl" fw={600} ml="xs">
            관심분야
          </Text>
          <Text>- {user?.interestAreas}</Text>
        </>
      )}

      {user?.skills && (
        <>
          <Text fz="xl" fw={600} ml="xs">
            기술
          </Text>
          <Text>- {user?.skills}</Text>
        </>
      )}

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
