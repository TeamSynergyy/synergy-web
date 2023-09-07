import { MessageEvent } from "event-source-polyfill";
import { Button, Center, Flex, Group, Paper, Text } from "@mantine/core";
import { Link } from "react-router-dom";
export default function NotificationCard({
  messageEvent,
}: {
  messageEvent: MessageEvent;
}) {
  const { type, data } = messageEvent;

  let content;
  switch (type) {
    case "COMMENT":
      content = (
        <>
          <Text>게시글에 댓글이 달렸습니다.</Text>
          <Link to={`/post/${Number(data)}`}>
            <Button>게시글 바로가기</Button>
          </Link>
        </>
      );
      break;
    case "FOLLOW":
      content = (
        <>
          <Text>팔로우를 받았습니다.</Text>
          <Link to={`/people/${data}`}>
            <Button>프로필 바로가기</Button>
          </Link>
        </>
      );
      break;
    case "APPLY":
      content = (
        <>
          <Text>프로젝트에 지원자가 있습니다.</Text>
          <Link to={`/project/${Number(data)}`}>
            <Button>지원자 확인하기</Button>
          </Link>
        </>
      );
      break;
    default:
      content = <Text>알 수 없는 알림입니다.</Text>;
      break;
  }
  return (
    <Paper w="100%" withBorder>
      <Flex justify="space-between" align="center" p="sm">
        {content}
      </Flex>
    </Paper>
  );
}
