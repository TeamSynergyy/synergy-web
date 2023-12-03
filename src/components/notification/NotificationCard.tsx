import { MessageEvent } from "event-source-polyfill";
import { ActionIcon, Button, Flex, Group, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconX } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { sseRemoveMessage } from "app/sseSlice";
export default function NotificationCard({
  index,
  messageEvent,
}: {
  index: number;
  messageEvent: MessageEvent;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeMessage = () => dispatch(sseRemoveMessage(index));
  const data = messageEvent.data;
  if (data[0] !== "{") return null;
  const { type, content } = JSON.parse(data);

  let body;
  let handleClick;
  switch (type) {
    case "COMMENT":
      body = <Text>~ 게시글에 댓글이 달렸습니다.</Text>;
      handleClick = () => navigate(`/post/${Number(content)}`);
      break;
    case "FOLLOW":
      body = <Text>~님이 회원님을 팔로우하기 시작했습니다.</Text>;
      handleClick = () => navigate(`/people/${content}`);
      break;
    case "PROJECT_APPLY":
      body = <Text>~ 프로젝트에 지원자가 있습니다.</Text>;
      handleClick = () => navigate(`/project/${Number(content)}`);
      break;
    case "PROJECT_ACCEPT":
      body = <Text>~ 프로젝트 지원이 수락되었습니다.</Text>;
      handleClick = () => navigate(`/project/${Number(content)}`);
      break;
    case "PROJECT_REJECT":
      body = <Text>~ 프로젝트 지원이 거절되었습니다.</Text>;
      handleClick = () => navigate(`/project/${Number(content)}`);
      break;
    case "NOTICE":
      body = <Text>~ 프로젝트에 새 공지사항이 있습니다.</Text>;
      handleClick = () => navigate(`/project/${Number(content)}/notice`);
      break;
  }
  return (
    <Group position="apart">
      <Button variant="subtle" color="dark" onClick={handleClick}>
        {body}
      </Button>
      <ActionIcon onClick={removeMessage}>
        <IconX />
      </ActionIcon>
    </Group>
  );
}
