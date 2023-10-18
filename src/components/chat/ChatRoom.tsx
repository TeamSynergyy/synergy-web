import { useSelector } from "react-redux";
import { RootState } from "app/store";
import { Box, Group, MediaQuery, Stack, Text } from "@mantine/core";
import { ChatInput } from "./ChatInput";
import { redirect, useParams } from "react-router-dom";
import { api } from "app/api";
import ChatMessageCard from "./ChatMessageCard";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChatMessage, ChatRoom } from "types";
import dayjs from "dayjs";
import { ChatHeader } from "./ChatHeader";

export default function ChatRoom() {
  const { id } = useParams();
  if (!id) {
    redirect("/chat");
  }
  const { data: myInfo } = api.useGetMyInfoQuery(null);
  const { data, isSuccess, isError, error } = api.useGetMyChatRoomsQuery(null);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const [oldMessages, setOldMessages] = useState<ChatMessage[]>([]);
  useEffect(() => {
    if (isSuccess) {
      const chatRoom = data.find(
        (chatRoom: ChatRoom) => chatRoom.roomId === Number(id)
      );
      if (chatRoom) {
        setOldMessages([...chatRoom.messages]);
      }
    } else if (isError) {
      console.error(error);
    }
  }, [isSuccess, data, id, isError, error]);

  const newMessages = useSelector((state: RootState) => state.stomp.messages)
    .filter((message) => message.topic === "/topic/" + id)
    .map((message) => {
      return JSON.parse(message.body);
    });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(scrollToBottom, [newMessages]);

  const allMessages = [...oldMessages, ...newMessages];
  const content = allMessages.reduce((acc, cur, i) => {
    const next = allMessages[i + 1];
    const { text, senderId, sendTime } = cur;
    const fromMe = senderId === myInfo?.userId;

    const isLast =
      !next ||
      next.senderId !== senderId ||
      dayjs(next.sendTime).get("minute") !== dayjs(sendTime).get("minute");
    const result = [
      ...acc,
      <ChatMessageCard key={i} {...{ text, fromMe, isLast, senderId }} />,
    ];
    if (isLast) {
      const dateFormat =
        dayjs(sendTime).get("year") !== dayjs().get("year")
          ? "MMM D, YYYY, h:m A"
          : dayjs(sendTime).get("date") !== dayjs().get("date")
          ? "MMM D, h:m A"
          : "h:mm A";

      result.push(
        <Group spacing="xs" key={i + "time"}>
          {fromMe ? null : <Box w="2.375rem" />}
          <Text size="xs" c="dark" ml={fromMe ? "auto" : 0} mb="md">
            {dayjs(sendTime).format(dateFormat)}
          </Text>
        </Group>
      );
    }

    return result;
  }, []);

  return (
    <Stack mb={56} spacing={7}>
      <ChatHeader roomId={Number(id)} />
      {content}
      <ChatInput roomId={Number(id)} />
      <div ref={messagesEndRef} />
    </Stack>
  );
}
