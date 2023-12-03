import { useSelector } from "react-redux";
import { RootState } from "app/store";
import { Paper, Stack, Text } from "@mantine/core";
import NotificationCard from "components/notification/NotificationCard";

export default function Notification() {
  const messageEvents = useSelector(
    (state: RootState) => state.sse.messageEvents
  );

  return (
    <Stack>
      {messageEvents.map((messageEvent, i) => (
        <NotificationCard key={i} index={i} messageEvent={messageEvent} />
      ))}
    </Stack>
  );
}
