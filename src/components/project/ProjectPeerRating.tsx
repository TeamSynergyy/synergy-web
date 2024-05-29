import {
  Avatar,
  Button,
  Collapse,
  Group,
  Paper,
  Rating,
  Textarea,
  Text,
  Center,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { api } from "app/api";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import ProjectTab from "./ProjectTab";
import UserAvatarName from "components/user/UserAvatarName";

export default function ProjectPeerRating() {
  const { pathname } = useLocation();

  const id = pathname.split("/")[2];

  const { data: project, isLoading } = api.useGetProjectQuery(Number(id));
  const { data: myInfo } = api.useGetMyInfoQuery(null);
  const isLeader = project?.leaderId === myInfo?.userId;

  const confirmPeerRating = api.useConfirmPeerRatingMutation()[0];
  const [teamUsers, setTeamUsers] = useState<
    { userId: string; temperature: number }[]
  >([]);
  const handleConfirmPeerRating = async () => {
    try {
      const payload = await confirmPeerRating(Number(id)).unwrap();
      setTeamUsers(payload);
    } catch (error) {
      console.error("rejected", error);
    }
  };

  if (isLoading) return <div>loading...</div>;
  if (!project) return <div>프로젝트를 불러오지 못했습니다.</div>;
  return (
    <>
      <ProjectTab projectId={project.projectId} />

      {isLeader && (
        <Center w="100%">
          <Button onClick={handleConfirmPeerRating}>평가 확정하기</Button>
        </Center>
      )}

      {isLeader && teamUsers.length > 0 && (
        <Center w="100%">
          <Stack>
            {teamUsers.map((user) => (
              <Group>
                <UserAvatarName userId={user.userId} />
                <Text c="dark"> {user.temperature}°C</Text>
              </Group>
            ))}
          </Stack>
        </Center>
      )}
      {project.teamUserIds.length > 1 ? (
        project.teamUserIds
          .filter((id) => id !== myInfo?.userId)
          .map((userId: string) => <UserRatingCollapse userId={userId} />)
      ) : (
        <Text>평가할 팀원이 없습니다.</Text>
      )}
    </>
  );
}

const UserRatingCollapse = ({ userId }: { userId: string }) => {
  const location = useLocation();
  const { data, isLoading, isError, error } = api.useGetUserQuery(userId);
  const { data: myInfo } = api.useGetMyInfoQuery(null);

  const [opened, { toggle }] = useDisclosure(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [content, setContent] = useState("");

  const ratePeer = api.useRatePeerMutation()[0];

  if (isLoading) return <p>"Loading..."</p>;
  if (isError) {
    console.error(error);
    return <p>error! check the console message</p>;
  }
  if (!data || !myInfo) return <p>사용자의 데이터를 불러오지 못했습니다.</p>;

  const { name, profileImageUrl } = data;

  return (
    <Paper w="100%" p="xs" my="md">
      <Group spacing="xs">
        <Avatar src={profileImageUrl} radius="xl" />
        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>
        </div>
        <Button onClick={toggle} disabled={opened}>
          평가하기
        </Button>
      </Group>
      <Collapse in={opened}>
        <Rating value={ratingValue} onChange={setRatingValue} p="xs" />
        <Textarea
          placeholder="평가 내용을 입력해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {ratingValue === 0 && (
          <Text color="red" size="xs" ml="auto">
            별을 선택해 평가 점수를 입력해주세요.
          </Text>
        )}

        <Group py="xs">
          <Button onClick={toggle} variant="default" ml="auto">
            취소
          </Button>
          <Button
            disabled={ratingValue === 0}
            onClick={() => {
              ratePeer({
                projectId: Number(location.pathname.split("/")[2]),
                giveUserId: myInfo.userId,
                receiveUserId: userId,
                score: ratingValue,
                content,
              });
              toggle();
            }}
          >
            평가 제출하기
          </Button>
        </Group>
      </Collapse>
    </Paper>
  );
};
