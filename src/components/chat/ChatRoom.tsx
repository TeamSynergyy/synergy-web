import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
import { Box, Group, MediaQuery, Stack, Text } from "@mantine/core";
import { ChatInput } from "./ChatInput";
import { redirect, useParams } from "react-router-dom";
import { api } from "app/api";
import ChatMessageCard from "./ChatMessageCard";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ChatMessage, ChatRoom } from "types";
import dayjs from "dayjs";
import { ChatHeader } from "./ChatHeader";
import { messageReceived } from "app/socketSlice";

export default function ChatRoom() {
  const { id } = useParams();
  if (!id) {
    redirect("/chat");
  }
  const { data: myInfo } = api.useGetMyInfoQuery(null);
  const { data, isSuccess, isError, error, refetch } =
    api.useGetChatMessagesQuery(id as string);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const dispatch = useDispatch();
  const wsHost = import.meta.env.VITE_WEBSOCKET_URL;
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (!id) {
      redirect("/chat");
      return;
    }

    refetch();

    if (!myInfo) return;

    const ws = new WebSocket(wsHost);

    ws.onopen = () => {
      console.log("WebSocket connected");
      ws.send(
        JSON.stringify({
          chatType: "ENTER",
          userId: myInfo.userId,
          chatRoomId: id,
        })
      );
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.chatType !== "TEXT") return;
      dispatch(messageReceived(message));
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setWebSocket(ws);

    return () => {
      ws.close();
      console.log("WebSocket disconnected");
    };
  }, [myInfo, id]);

  const [oldMessages, setOldMessages] = useState<ChatMessage[]>([]);
  useEffect(() => {
    if (isSuccess) {
      setOldMessages([...data]);
    } else if (isError) {
      console.error(error);
    }
  }, [isSuccess, data, id, isError, error]);

  const newMessages = useSelector(
    (state: RootState) => state.socket.messages
  ).filter((message) => message.chatRoomId === id);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(scrollToBottom, [newMessages]);

  const allMessages = [...oldMessages, ...newMessages];
  const content = allMessages
    .map((msg, i) => {
      const next = allMessages[i + 1];
      const { message, userId, createAt } = msg;
      const fromMe = userId === myInfo?.userId;

      const isLast =
        !next ||
        next.userId !== userId ||
        dayjs(next.createAt).get("minute") !== dayjs(createAt).get("minute");
      const result = [
        <ChatMessageCard key={i} {...{ message, fromMe, isLast, userId }} />,
      ];
      if (isLast) {
        const dateFormat =
          dayjs(createAt).get("year") !== dayjs().get("year")
            ? "MMM D, YYYY, h:m A"
            : dayjs(createAt).get("date") !== dayjs().get("date")
            ? "MMM D, h:m A"
            : "h:mm A";

        result.push(
          <Group spacing="xs" key={i + "time"}>
            {fromMe ? null : <Box w="2.375rem" />}
            <Text size="xs" c="dark" ml={fromMe ? "auto" : 0} mb="md">
              {dayjs(createAt).format(dateFormat)}
            </Text>
          </Group>
        );
      }

      return result;
    }, [])
    .flat();

  return (
    <Stack mb={56} spacing={7}>
      <ChatHeader roomId={id as string} />
      {content}
      <ChatInput roomId={id as string} ws={webSocket} />
      <div ref={messagesEndRef} />
    </Stack>
  );
}
