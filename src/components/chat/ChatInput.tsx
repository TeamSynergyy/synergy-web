import { useContext } from "react";
import {
  TextInput,
  ActionIcon,
  useMantineTheme,
  Affix,
  MediaQuery,
} from "@mantine/core";
import { IconSend } from "@tabler/icons-react";

import { useForm } from "@mantine/form";
import { api } from "app/api";
import dayjs from "dayjs";
import { SocketContext } from "app/SocketContext";

export function ChatInput({ roomId }: { roomId: number }) {
  const { data } = api.useGetMyInfoQuery(null);

  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      text: "",
    },
  });

  const socket = useContext(SocketContext);

  // const handleSend = (text: string) => {
  //   if (text !== "") {
  //     const message = {
  //       type: "TALK",
  //       roomId,
  //       text,
  //       senderId: data?.userId,
  //       sendTime: dayjs().toISOString(),
  //     };

  //     if (!socket) return console.error("WebSocket is not connected");

  //     socket.publish({
  //       destination: "/pub/chat/room/" + String(roomId),
  //       body: JSON.stringify(message),
  //     });
  //   }
  // };

  const handleSend = (text: string) => {
    if (text !== "") {
      const message = {
        type: "TALK",
        roomId,
        text,
        senderId: data?.userId,
        sendTime: dayjs().toISOString(),
      };

      if (!socket) return console.error("Socket is not connected");

      socket.emit("chat message", message); // 'chat message' 이벤트로 메시지 전송
    }
  };

  return (
    <MediaQuery
      smallerThan="sm"
      styles={{ bottom: theme.spacing.xs, width: "100%" }}
    >
      <Affix
        w={{ sm: 400, lg: 600 }}
        px="sm"
        position={{ bottom: 20, left: "50%" }}
        sx={() => ({ transform: "translateX(-50%)" })}
      >
        <form
          onSubmit={form.onSubmit((value) => {
            handleSend(value.text);
            value.text = "";
          })}
        >
          <TextInput
            {...form.getInputProps("text")}
            radius="xl"
            size="md"
            w="100%"
            placeholder="메세지를 입력하세요"
            rightSectionWidth={42}
            rightSection={
              <ActionIcon
                type="submit"
                size={32}
                radius="xl"
                color={theme.primaryColor}
                variant="filled"
              >
                <IconSend size="1.1rem" stroke={1.5} />
              </ActionIcon>
            }
          />
        </form>
      </Affix>
    </MediaQuery>
  );
}
