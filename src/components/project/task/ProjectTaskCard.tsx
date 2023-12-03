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
  const deleteTask = api.useDeleteProjectTaskMutation()[0];

  const handleClick = () => {
    setSelectedTask(task);
    openTaskDetail();
  };

  // const handleDelete = () => deleteTask(task);
  return (
    <Draggable draggableId={task.ticketId.toString()} index={index}>
      {(provided, snapshot) => (
        <Paper
          //   className={cx(classes.task, {
          //     [classes.taskDragging]: snapshot.isDragging,
          //   })}

          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={handleClick}
          p="xs"
        >
          <Group position="apart" mb="xs">
            <Text>{task.title}</Text>
            {/* <Menu shadow="md" width={200}>
              <Menu.Target>
                <ActionIcon>
                  <IconDotsVertical size={14} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  color="red"
                  icon={<IconTrash size={14} />}
                  onClick={handleClick}
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu> */}
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
                <AssignedUserButton key={userId} userId={userId} />
              ))}
            </Stack>
          )}
        </Paper>
      )}
    </Draggable>
  );
}

const AssignedUserButton = ({ userId }: { userId: string }) => {
  const { data, isLoading, isError, error } = api.useGetUserQuery(userId);

  if (isLoading) return <p>"Loading..."</p>;
  if (isError) {
    console.error(error);
    return <p>error! check the console message</p>;
  }
  if (!data) return <p>대화 상대방의 데이터를 불러오지 못했습니다.</p>;

  const { username, profileImageUrl } = data;

  return (
    <UnstyledButton>
      <Group spacing={2}>
        <Avatar src={profileImageUrl} radius="xl" size="sm" />
        <Text size="xs">{username}</Text>
      </Group>
    </UnstyledButton>
  );
};
