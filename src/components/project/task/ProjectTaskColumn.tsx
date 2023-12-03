import { Droppable } from "@hello-pangea/dnd";
import {
  ActionIcon,
  Drawer,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { ProjectTask } from "types";
import ProjectTaskCard from "./ProjectTaskCard";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import ProjectTaskDetail from "./ProjectTaskDetail";

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

  const handleCreateTask = () => {
    setNewTaskStatus(status);
    openNewTaskModal();
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
                spacing="xs"
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

      <Drawer opened={opened} onClose={close} title={status} position="right">
        {selectedTask && <ProjectTaskDetail {...selectedTask} />}
      </Drawer>
    </>
  );
}
