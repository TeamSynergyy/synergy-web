import { Stack } from "@mantine/core";
import { api } from "app/api";
import { UserButton } from "components/user/UserButton";
import { Link } from "react-router-dom";

const ChatNavbar = () => {
  const { data } = api.useGetMyInfoQuery(null);
  const {
    data: chatRooms,
    isLoading,
    isSuccess,
    isError,
    error,
  } = api.useGetMyChatRoomsQuery(null);

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isError) {
    console.error(error);
    content = <p>error! check the console message</p>;
  } else if (isSuccess) {
    // 차후 신규 메세지 순으로 정렬하도록 기능 추가
    content = chatRooms.map(({ roomId, participantIds }, i) => {
      const partnerId = participantIds.find((id) => id !== data?.userId);
      if (!partnerId)
        return <p key={i}>대화 상대방의 데이터를 불러오지 못했습니다.</p>;

      return (
        <Link key={i} to={`/chat/${roomId}`} style={{ textDecoration: "none" }}>
          <UserButton userId={partnerId} />
        </Link>
      );
    });
  }
  return <Stack>{content}</Stack>;
};

export default ChatNavbar;
