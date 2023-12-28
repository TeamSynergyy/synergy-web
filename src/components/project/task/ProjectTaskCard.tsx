import { Draggable } from "@hello-pangea/dnd";
import {
  ActionIcon,
  Avatar,
  Badge,
  Group,
  Menu,
  Paper,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { IconDotsVertical, IconMenu, IconTrash } from "@tabler/icons-react";
import { api } from "app/api";
import UserAvatarName from "components/user/UserAvatarName";
import dayjs from "dayjs";
import { ProjectTask } from "types";

export default function ProjectTaskCard({
  task,
  index,
  setSelectedTask,
  openTaskDetail,
}: {
  task: ProjectTask;
  index: number;
  setSelectedTask: (task: ProjectTask) => void;
  openTaskDetail: () => void;
}) {
  const handleClick = () => {
    setSelectedTask(task);
    openTaskDetail();
  };

  // const handleDelete = () => deleteTask(task);
  return (
    <Draggable draggableId={task.ticketId.toString()} index={index}>
      {(provided, snapshot) => (
        <Paper
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={handleClick}
          mb="xs"
          p="xs"
          shadow={snapshot.isDragging ? "sm" : "none"}
        >
          <Group position="apart" mb="xs">
            <Text>{task.title}</Text>
          </Group>
          <Group position="apart" mt="xs">
            <Text c="dimmed" size="sm">
              {task.endAt ? dayjs(task.endAt).format("MMM D") : ""}
              {task.assignedTime && task.endAt ? " • " : ""}
              {task.assignedTime ? `${task.assignedTime}H` : ""}
            </Text>
            {task.tag && (
              <Badge color={task.tagColor} variant="light">
                {task.tag}
              </Badge>
            )}
          </Group>
          {task.assignedUserIds.length > 0 && (
            <Stack mt="xs" spacing="xs">
              {task.assignedUserIds?.map((userId) => (
                <UserAvatarName key={userId} userId={userId} />
              ))}
            </Stack>
          )}
        </Paper>
      )}
    </Draggable>
  );
}
