import { MessageEvent } from "event-source-polyfill";
import { Button, Center, Flex, Group, Paper, Text } from "@mantine/core";
import { Link } from "react-router-dom";
export default function NotificationCard({
  messageEvent,
}: {
  messageEvent: MessageEvent;
}) {
  const data = JSON.parse(messageEvent.data);
  if (data[1] !== "{") return null;
  const { type, content } = JSON.parse(messageEvent.data);

  let body;
  switch (type) {
    case "COMMENT":
      body = (
        <>
          <Text>게시글에 댓글이 달렸습니다.</Text>
          <Link to={`/post/${Number(content)}`}>
            <Button>게시글 바로가기</Button>
          </Link>
        </>
      );
      break;
    case "FOLLOW":
      body = (
        <>
          <Text>팔로우를 받았습니다.</Text>
          <Link to={`/people/${content}`}>
            <Button>프로필 바로가기</Button>
          </Link>
        </>
      );
      break;
    case "APPLY":
      body = (
        <>
          <Text>프로젝트에 지원자가 있습니다.</Text>
          <Link to={`/project/${Number(content)}`}>
            <Button>지원자 확인하기</Button>
          </Link>
        </>
      );
      break;
  }
  return (
    <Paper w="100%" withBorder>
      <Flex justify="space-between" align="center" p="sm">
        {body}
      </Flex>
    </Paper>
  );
}
