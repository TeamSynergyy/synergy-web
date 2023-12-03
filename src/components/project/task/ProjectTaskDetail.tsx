import { Stack, Text } from "@mantine/core";
import { ProjectTask } from "types";

export default function ProjectTaskDetail({
  title,
  content,
  endAt,
  assignedTime,
  tag,
  tagColor,
  assignedUserIds,
}: ProjectTask) {
  return (
    <Stack>
      <Text>{title}</Text>
      <Text>{content}</Text>
      <Text>{endAt}</Text>
      {assignedTime !== 0 ? <Text>{assignedTime}</Text> : null}
      <Text>{tag}</Text>
      <Text>{assignedUserIds}</Text>
    </Stack>
  );
}
