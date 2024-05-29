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
import { ChatMessage } from "types";

export function ChatInput({
  roomId,
  ws,
}: {
  roomId: string;
  ws: WebSocket | null;
}) {
  const { data } = api.useGetMyInfoQuery(null);
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      inputText: "",
    },
  });

  // const handleSend = (text: string) => {
  //   if (text !== "") {
  //     const message = {
  //       type: "TALK",
  //       roomId,
  //       text,
  //       userId: data?.userId,
  //       createAt: dayjs().toISOString(),
  //     };

  //     if (!ws) return console.error("WebSocket is not connected");

  //     ws.publish({
  //       destination: "/pub/chat/room/" + String(roomId),
  //       body: JSON.stringify(message),
  //     });
  //   }
  // };
  if (!data) return <div>Error! please refresh and try again</div>;

  const handleSend = (inputText: string) => {
    if (inputText !== "") {
      const msg: Omit<ChatMessage, "id"> = {
        chatType: "TEXT",
        chatRoomId: roomId,
        message: inputText,
        userId: data.userId,
        createAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      };

      if (!ws) return console.error("Socket is not connected");

      ws.send(JSON.stringify(msg));
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
            handleSend(value.inputText);
            value.inputText = "";
          })}
        >
          <TextInput
            {...form.getInputProps("inputText")}
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
