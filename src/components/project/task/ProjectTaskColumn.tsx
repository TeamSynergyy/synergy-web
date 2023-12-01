import { Droppable } from "@hello-pangea/dnd";
import { Paper, Text } from "@mantine/core";
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
    <>
      <Text weight="bold" fz="lg"></Text>
      <Droppable droppableId={status}>
        {(droppableProvided) => (
          <Paper
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
            radius="md"
            p="xs"
            bg="#eee"
          >
            {tasks.map((task, index) => (
              <ProjectTaskCard key={task.ticketId} task={task} index={index} />
            ))}
            {droppableProvided.placeholder}
          </Paper>
        )}
      </Droppable>
    </>
  );
}
