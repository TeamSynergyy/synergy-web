import { Badge, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
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
      <Text weight={500} fz="xl">
        {title}
      </Text>

      {tag && (
        <div>
          <Badge c={tagColor}>{tag}</Badge>
        </div>
      )}
      {endAt && (
        <Text c="dimmed">마감 기한: {dayjs(endAt).format("MMMM D, YYYY")}</Text>
      )}
      {assignedTime !== 0 ? (
        <Text c="dimmed">소요 시간: {assignedTime}시간</Text>
      ) : null}
      <Text>{assignedUserIds}</Text>
      <Text>{content}</Text>
    </Stack>
  );
}
