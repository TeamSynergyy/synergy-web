import { ActionIcon, Header, MediaQuery, Menu, Text } from "@mantine/core";
import { IconArrowLeft, IconDots, IconTrash } from "@tabler/icons-react";
import { api } from "app/api";
import { Link } from "react-router-dom";

export function ChatHeader({ roomId }: { roomId: string }) {
  const { data } = api.useGetMyInfoQuery(null);
  const { data: chatRooms } = api.useGetMyChatRoomsQuery(null);

  const chatRoom = chatRooms?.find(
    (chatRoom: { roomId: string }) => chatRoom.roomId === roomId
  );

  const partnerId = chatRoom?.userIds.find((id) => id !== data?.userId);

  const { data: partnerData } = api.useGetUserQuery(partnerId || ""); // ""은 임시값. 차후 수정 필요

  const name = partnerData?.username || "대화 상대방";

  return (
    <MediaQuery
      largerThan="sm"
      styles={() => ({
        display: "none",
      })}
    >
      <Header
        height={56}
        px="md"
        sx={() => ({
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        })}
      >
        <Link to="/chat">
          <ActionIcon size="lg" c="dark">
            <IconArrowLeft size="1.625rem" />
          </ActionIcon>
        </Link>
        <Text variant="h5">{name}</Text>
        <Menu shadow="md" width={200} withinPortal>
          <Menu.Target>
            <IconDots size="1.625rem" />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item icon={<IconTrash size={14} />} color="red">
              채팅방 나가기
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Header>
    </MediaQuery>
  );
}
