import { Droppable } from "@hello-pangea/dnd";
import {
  ActionIcon,
  Drawer,
  Group,
  Menu,
  Paper,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { ProjectTask } from "types";
import ProjectTaskCard from "./ProjectTaskCard";
import { useDisclosure, useToggle } from "@mantine/hooks";
import { useState } from "react";
import ProjectTaskDetail from "./ProjectTaskDetail";
import { IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react";
import { api } from "app/api";
import UpdateProjectTaskForm from "./UpdateProjectTaskForm";

export default function ProjectTaskColumn({
  status,
  tasks,
  setNewTaskStatus,
  openNewTaskModal,
}: {
  status: ProjectTask["status"];
  tasks: ProjectTask[];
  setNewTaskStatus: (status: ProjectTask["status"]) => void;
  openNewTaskModal: () => void;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedTask, setSelectedTask] = useState<ProjectTask | undefined>();
  const [isUpdating, toggle] = useToggle([false, true]);

  const handleCreateTask = () => {
    setNewTaskStatus(status);
    openNewTaskModal();
  };

  const deleteTask = api.useDeleteProjectTaskMutation()[0];

  const handleDelete = () => {
    if (selectedTask) {
      deleteTask(selectedTask);
    }
    close();
  };

  return (
    <>
      <Paper radius="md" p="xs" bg="#eee">
        <Stack>
          <Group position="apart">
            <Text weight="normal">{status}</Text>
            <ActionIcon onClick={handleCreateTask}>+</ActionIcon>
          </Group>
          <Droppable droppableId={status}>
            {(droppableProvided) => (
              <Stack
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
                spacing={0}
                mih="60vh"
              >
                {tasks.map((task, index) => (
                  <ProjectTaskCard
                    key={task.ticketId}
                    task={task}
                    index={index}
                    setSelectedTask={setSelectedTask}
                    openTaskDetail={open}
                  />
                ))}
                {droppableProvided.placeholder}
              </Stack>
            )}
          </Droppable>
        </Stack>
      </Paper>

      <Drawer.Root opened={opened} onClose={close} position="right">
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>{selectedTask?.status}</Drawer.Title>
            <Group>
              <Menu shadow="md">
                <Menu.Target>
                  <ActionIcon size={22}>
                    <IconDotsVertical size={14} />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    icon={<IconPencil size={14} />}
                    onClick={() => toggle()}
                  >
                    수정
                  </Menu.Item>
                  <Menu.Item
                    color="red"
                    icon={<IconTrash size={14} />}
                    onClick={handleDelete}
                  >
                    삭제
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>

              <Drawer.CloseButton />
            </Group>
          </Drawer.Header>
          <Drawer.Body>
            {selectedTask &&
              (isUpdating ? (
                <UpdateProjectTaskForm task={selectedTask} toggle={toggle} />
              ) : (
                <ProjectTaskDetail {...selectedTask} />
              ))}
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
}
