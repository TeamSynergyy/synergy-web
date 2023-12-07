import { api } from "app/api";
import { useParams } from "react-router-dom";
import {
  Text,
  Button,
  Box,
  Dialog,
  Flex,
  Stack,
  Center,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import ApplicantBar from "components/user/ApplicantBar";
import { StaticMap } from "react-kakao-maps-sdk";
import ProjectCard from "components/project/ProjectCard";
import UserCard from "components/user/UserCard";
import ProjectTab from "components/project/ProjectTab";

export default function ProjectDetail() {
  const id = parseInt(useParams().id as string);
  const { data: project, isFetching } = api.useGetProjectQuery(id);
  const [opened, { open, close }] = useDisclosure(false);

  const myId = api.useGetMyInfoQuery(null).data?.userId;
  const { data: leader } = api.useGetUserQuery(project?.leaderId || "");

  const { data: appliedProjectIds } = api.useGetMyAppliedProjectsQuery(null);
  const applyProject = api.useApplyProjectMutation()[0];
  const cancleApplyProject = api.useCancelApplyProjectMutation()[0];

  const isApplied = appliedProjectIds?.includes(id);

  const isLeader = project?.leaderId === myId;
  const isTeamMember = project?.teamUserIds?.includes(myId || "");

  const applicantsIdsQuery = api.useGetApplicantsIdsQuery(
    project?.projectId || 0
  );
  const applicants = isLeader ? applicantsIdsQuery.data : [];

  const staticMapCoords = {
    lat: project?.location.y || 0,
    lng: project?.location.x || 0,
  };

  const handleApply = async () => {
    try {
      if (isApplied) {
        await cancleApplyProject(id);
      } else {
        await applyProject(id);
      }
      open();
    } catch (e) {
      console.error(e);
    }
  };

  if (isFetching) return <div>loading...</div>;
  if (!project) return <div>프로젝트 데이터를 불러오지 못했습니다.</div>;

  return (
    <>
      {isTeamMember && <ProjectTab projectId={id} />}
      <Box w="100%">
        <ProjectCard project={project} isDetail />

        {staticMapCoords.lat !== 0 && (
          <>
            <Text c="dimmed" fz="sm" mt="md">
              진행 장소
            </Text>
            <Center maw={rem(700)} mx="auto">
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  paddingBottom: "56.25%",
                  overflow: "hidden",
                }}
              >
                <StaticMap
                  center={staticMapCoords}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  marker={{ position: staticMapCoords }}
                  level={3}
                />
              </div>
            </Center>
          </>
        )}
        {leader && (
          <Stack spacing={0}>
            <Text c="dimmed" fz="sm" mt="md">
              프로젝트 리더
            </Text>
            <UserCard {...leader} />
          </Stack>
        )}
        {!isTeamMember && (
          <Flex justify="right" mt={10}>
            <Button onClick={handleApply}>
              {isApplied ? "신청 취소하기" : "신청하기"}
            </Button>
          </Flex>
        )}

        {isLeader && (
          <Stack>
            <Text size="lg" weight={500} mt="xl">
              {applicants?.length !== 0 ? "팀 신청자" : ""}
            </Text>

            {applicants?.map((user) => (
              <ApplicantBar
                key={user.userId}
                projectId={project.projectId}
                user={user}
              />
            ))}
          </Stack>
        )}
      </Box>

      <Dialog
        opened={opened}
        withCloseButton
        onClose={close}
        size="lg"
        radius="md"
      >
        <Text size="sm" weight={500}>
          {isApplied ? "신청하기" : "신청 취소하기"} 완료
        </Text>
      </Dialog>
    </>
  );
}
