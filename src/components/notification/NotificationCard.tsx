import { useEffect, useState } from "react";
import { MessageEvent } from "event-source-polyfill";
import { ActionIcon, Button, Flex, Group, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconX } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { sseRemoveMessage } from "app/sseSlice";
import { api } from "app/api";

export default function NotificationCard({
  index,
  messageEvent,
}: {
  index: number;
  messageEvent: MessageEvent;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notificationInfo, setNotificationInfo] = useState("");

  const removeMessage = () => dispatch(sseRemoveMessage(index));
  const data = messageEvent.data;

  const { type, entityId } = JSON.parse(data);

  // RTK Query hooks
  const { data: userData, refetch: userRefetch } = api.useGetUserQuery(
    entityId,
    {
      skip: type !== "FOLLOW",
    }
  );
  const { data: projectData, refetch: projectRefetch } = api.useGetProjectQuery(
    Number(entityId),
    {
      skip:
        type !== "PROJECT_APPLY" &&
        type !== "PROJECT_ACCEPT" &&
        type !== "PROJECT_REJECT" &&
        type !== "PROJECT_NOTICE",
    }
  );
  const { data: postData } = api.useGetPostQuery(Number(entityId), {
    skip: type !== "COMMENT",
  });

  useEffect(() => {
    switch (type) {
      case "FOLLOW":
        setNotificationInfo(userData?.username || ""); // Replace 'name' with the actual user name field
        break;
      case "PROJECT_APPLY":
      case "PROJECT_ACCEPT":
      case "PROJECT_REJECT":
      case "PROJECT_NOTICE":
        setNotificationInfo(projectData?.name || ""); // Replace 'name' with the actual project name field
        break;
      case "COMMENT":
        setNotificationInfo(postData?.title || ""); // Replace 'title' with the actual post title field
        break;
    }
  }, [type, userData, projectData, postData]);

  let body;
  let handleClick;
  switch (type) {
    case "COMMENT":
      body = <Text>{notificationInfo} 게시글에 댓글이 달렸습니다.</Text>;
      handleClick = () => navigate(`/post/${Number(entityId)}`);
      break;
    case "FOLLOW":
      body = (
        <Text>{notificationInfo}님이 회원님을 팔로우하기 시작했습니다.</Text>
      );
      handleClick = () => {
        userRefetch();
        navigate(`/people/${entityId}`);
      };
      break;
    case "PROJECT_APPLY":
      body = <Text>{notificationInfo} 프로젝트에 지원자가 있습니다.</Text>;
      handleClick = () => navigate(`/project/${Number(entityId)}`);
      break;
    case "PROJECT_ACCEPT":
      body = <Text>{notificationInfo} 프로젝트 지원이 수락되었습니다.</Text>;
      handleClick = () => {
        projectRefetch();
        navigate(`/project/${Number(entityId)}`);
      };
      break;
    case "PROJECT_REJECT":
      body = <Text>{notificationInfo} 프로젝트 지원이 거절되었습니다.</Text>;
      handleClick = () => {
        projectRefetch();
        navigate(`/project/${Number(entityId)}`);
      };
      break;
    case "PROJECT_NOTICE":
      body = <Text>{notificationInfo} 프로젝트에 새 공지사항이 있습니다.</Text>;
      handleClick = () => navigate(`/project/${Number(entityId)}/notice`);
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
