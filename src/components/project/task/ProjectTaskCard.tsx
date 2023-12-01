import { Draggable } from "@hello-pangea/dnd";
import {
  ActionIcon,
  Avatar,
  Badge,
  Group,
  Menu,
  Paper,
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
}: {
  task: ProjectTask;
  index: number;
}) {
  const deleteTask = api.useDeleteProjectTaskMutation()[0];

  const handleClick = () => deleteTask(task);
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
        >
          <Group position="apart" mb="xs">
            <Text>{task.title}</Text>
            <Menu shadow="md" width={200}>
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
            </Menu>
          </Group>
          <Group position="apart" mt="xs">
            <Text c="dimmed" size="sm">
              {task.endAt ? dayjs(task.endAt).format("YY MMM D") : ""}
              {task.assignedTime ? ` • ${task.assignedTime}H` : ""}
            </Text>
            <Badge color={task.tagColor} variant="light">
              {task.tag}
            </Badge>
          </Group>
          {task.assignedUserIds?.map((userId) => (
            <AssignedUserButton key={userId} userId={userId} />
          ))}
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
      <Group spacing="xs">
        <Avatar src={profileImageUrl} radius="sm" />
        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {username}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  );
};
