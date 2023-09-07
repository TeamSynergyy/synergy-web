import { useSelector } from "react-redux";
import { RootState } from "app/store";
import { Button, Paper, Stack, Text } from "@mantine/core";

export default function Notification() {
  const notification = useSelector((state: RootState) => state.sse.messages);

  return (
    <Stack>
      {notification.map((noti) => (
        <Paper>
          <Text>{noti.message}</Text>
        </Paper>
      ))}
    </Stack>
  );
}
