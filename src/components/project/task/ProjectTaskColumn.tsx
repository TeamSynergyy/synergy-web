import { Droppable } from "@hello-pangea/dnd";
import { Paper, ScrollArea, Stack, Text } from "@mantine/core";
import { ProjectTask } from "types";
import ProjectTaskCard from "./ProjectTaskCard";

export default function ProjectTaskColumn({
  status,
  tasks,
}: {
  status: ProjectTask["status"];
  tasks: ProjectTask[];
}) {
  return (
    <Paper radius="md" p="xs" bg="#eee">
      <Stack>
        <Text weight="normal" fz="lg">
          {status}
        </Text>
        <Droppable droppableId={status}>
          {(droppableProvided) => (
            <ScrollArea h="60vh">
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
                  />
                ))}
                {droppableProvided.placeholder}
              </Stack>
            </ScrollArea>
          )}
        </Droppable>
      </Stack>
    </Paper>
  );
}
