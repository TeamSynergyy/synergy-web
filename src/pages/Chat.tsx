import { Center, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import ChatNavbar from "components/chat/ChatNavbar";
import NewChatButton from "components/chat/NewChatButton";

export default function Chat() {
  //  const matches = useMediaQuery("(min-width: 48em)", true);

  // return matches ? <NewChatButton /> : <ChatNavbar />;
  return (
    <Center h={200}>
      <Text>채팅방에 입장해 메세지를 주고받으세요.</Text>
    </Center>
  );
}
