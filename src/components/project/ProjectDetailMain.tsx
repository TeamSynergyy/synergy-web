import { Box, Stack, Flex, Button, Dialog, Text } from "@mantine/core";
import ApplicantBar from "components/user/ApplicantBar";
import UserCard from "components/user/UserCard";
import { StaticMap } from "react-kakao-maps-sdk";
import ProjectCard from "./ProjectCard";
import { useDisclosure } from "@mantine/hooks";
import { api } from "app/api";
import { useParams } from "react-router-dom";

export function ProjectDetailMain() {
  const id = parseInt(useParams().id as string);
  const { data: project, isFetching } = api.useGetProjectQuery(id);
  const [opened, { open, close }] = useDisclosure(false);

  const myId = api.useGetMyInfoQuery(null).data?.userId;
  const { data: leader } = api.useGetUserQuery(project?.leaderId || "");

  const { data: appliedProjectIds } = api.useGetMyAppliedProjectsQuery(null);
  const applyProject = api.useApplyProjectMutation()[0];

  const isApplied = appliedProjectIds?.includes(id);

  const isLeader = project?.leaderId === myId;
  const isTeamMember = project?.teamUserIds?.includes(myId || "");

  const applicantsIdsQuery = api.useGetApplicantsIdsQuery(
    project?.projectId || 0
  );
  const applicantIds = isLeader ? applicantsIdsQuery.data?.userIds : [];

  const staticMapCoords = {
    lat: project?.location.y || 0,
    lng: project?.location.x || 0,
  };

  const handleApply = async () => {
    try {
      await applyProject(id);
      open();
    } catch (e) {
      console.error(e);
    }
  };

  if (!project) return <div>프로젝트 데이터를 불러오지 못했습니다.</div>;
  if (isFetching) return <div>loading...</div>;

  return (
    <>
      <Box w="100%">
        <ProjectCard project={project} isDetail />

        {staticMapCoords.lat !== 0 && (
          <>
            <Text c="dimmed" fz="sm" mt="md">
              진행 장소
            </Text>
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
              {applicantIds?.length !== 0 ? "팀 신청자" : ""}
            </Text>

            {applicantIds?.map((id) => (
              <ApplicantBar
                key={id}
                projectId={project.projectId}
                userId={id}
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
