import { Draggable } from "@hello-pangea/dnd";
import { ActionIcon, Badge, Group, Menu, Paper, Text } from "@mantine/core";
import { IconMenu, IconTrash } from "@tabler/icons-react";
import { ProjectTask } from "types";

export default function ProjectTaskCard({
  task,
  index,
}: {
  task: ProjectTask;
  index: number;
}) {
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
            <Menu.Target>
              <ActionIcon>
                <IconMenu />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Task</Menu.Label>
              <Menu.Item color="red" icon={<IconTrash size={14} />}>
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Group>
          <Group position="apart" mt="xs">
            <Text c="dimmed" size="sm">
              {task.endAt} {task.assignedTime && `• ${task.assignedTime}H`}
            </Text>
            <Badge color={task.tagColor} variant="outline">
              {task.tag}
            </Badge>
          </Group>
        </Paper>
      )}
    </Draggable>
  );
}
