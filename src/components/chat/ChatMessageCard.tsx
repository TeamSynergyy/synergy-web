import React from "react";
import { Avatar, Box, Group, Paper, Text } from "@mantine/core";
import { api } from "app/api";
import { Link } from "react-router-dom";

const ChatMessageCard: React.FC<{
  text: string;
  fromMe?: boolean;
  isLast?: boolean;
  senderId?: string;
}> = ({ text, fromMe = false, isLast = false, senderId }) => {
  const { data } = senderId ? api.useGetUserQuery(senderId) : { data: null };

  return (
    <Group spacing="xs">
      {fromMe ? null : data && isLast ? (
        <Box mt="auto">
          <Link to={`/people/${data.userId}`}>
            <Avatar src={data.avatar} radius="xl" />
          </Link>
        </Box>
      ) : (
        <Box w="2.375rem" />
      )}
      <Paper
        sx={(theme) => {
          return {
            backgroundColor: fromMe
              ? theme.colors.blue[5]
              : theme.colors.gray[1],
            width: "fit-content",
            maxWidth: "80%",
            overflowWrap: "anywhere",
            padding: `${theme.spacing.sm} ${theme.spacing.md}`,

            marginLeft: fromMe ? "auto" : 0,
            borderRadius: isLast
              ? `${theme.radius.xl} ${theme.radius.xl} ${
                  fromMe
                    ? `${theme.radius.sm} ${theme.radius.xl}`
                    : `${theme.radius.xl} ${theme.radius.sm}`
                }`
              : theme.radius.xl,
            transition: "border-radius 0.5s ease",
          };
        }}
      >
        <Text c={fromMe ? "white" : "dark"}>{text}</Text>
      </Paper>
    </Group>
  );
};

export default ChatMessageCard;
