import { Group, Stack } from "@mantine/core";
import { DragDropContext, OnDragEndResponder } from "@hello-pangea/dnd";
import ProjectTaskColumn from "./ProjectTaskColumn";
import { ProjectTask } from "types";
import ProjectTab from "../ProjectTab";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { api } from "app/api";
import NewProjectTaskModal from "./NewProjectTaskModal";
import { useAppDispatch } from "app/store";

export default function ProjectTaskBoard() {
  const id = Number(useParams().id);
  const [newTaskStatus, setNewTaskStatus] =
    useState<ProjectTask["status"]>("BACKLOG");

  const { data: tasks, isLoading } = api.useGetProjectTasksQuery(id);

  const updateTask = api.useUpdateProjectTaskMutation()[0];

  const dispatch = useAppDispatch();

  if (isLoading) return <div>loading...</div>;
  if (tasks === undefined) return <div>error</div>;

  const handleDragEnd: OnDragEndResponder = ({ destination, source }) => {
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceStatus = source.droppableId as ProjectTask["status"];
    const destinationStatus = destination.droppableId as ProjectTask["status"];
    const sourceTask = tasks[sourceStatus][source.index];
    // const destinationTask = tasks[destinationStatus][destination.index] ?? {
    //   status: destinationStatus,
    //   index: undefined, // undefined if dropped after the last item
    // };

    const newTasks = updateTaskStatusLocal(
      sourceTask,
      { status: sourceStatus, index: source.index },
      { status: destinationStatus, index: destination.index },
      tasks
    );

    dispatch(
      api.util.updateQueryData("getProjectTasks", id, (draft) => {
        draft[sourceStatus] = newTasks[sourceStatus];
        draft[destinationStatus] = newTasks[destinationStatus];
      })
    );

    const updatedTask = newTasks[destinationStatus][destination.index];

    updateTask(updatedTask);
  };

  return (
    <Stack>
      <ProjectTab projectId={id} />
      <NewProjectTaskModal status={newTaskStatus} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Group grow>
          <ProjectTaskColumn status="BACKLOG" tasks={tasks["BACKLOG"]} />
          <ProjectTaskColumn
            status="IN_PROGRESS"
            tasks={tasks["IN_PROGRESS"]}
          />
          <ProjectTaskColumn status="REVIEW" tasks={tasks["REVIEW"]} />
          <ProjectTaskColumn status="DONE" tasks={tasks["DONE"]} />
        </Group>
      </DragDropContext>
    </Stack>
  );
}

const updateTaskStatusLocal = (
  sourceTask: ProjectTask,
  source: { status: ProjectTask["status"]; index: number },
  destination: {
    status: ProjectTask["status"];
    index?: number;
  },
  tasksByStatus: Record<ProjectTask["status"], ProjectTask[]>
) => {
  // 깊은 복사를 통해 새로운 객체 생성
  const newTasksByStatus: Record<ProjectTask["status"], ProjectTask[]> =
    JSON.parse(JSON.stringify(tasksByStatus));

  if (source.status === destination.status) {
    // 동일 컬럼 내에서 이동
    const column = newTasksByStatus[source.status];
    column.splice(source.index, 1);
    column.splice(destination.index ?? column.length, 0, sourceTask);
  } else {
    // 다른 컬럼으로 이동
    const sourceColumn = newTasksByStatus[source.status];
    const destinationColumn = newTasksByStatus[destination.status];

    sourceTask = { ...sourceTask, status: destination.status };
    sourceColumn.splice(source.index, 1);
    destinationColumn.splice(
      destination.index ?? destinationColumn.length,
      0,
      sourceTask
    );
    console.log(destination.status);
  }

  Object.values(newTasksByStatus).forEach((column) => {
    column.forEach((task, index) => {
      column[index] = { ...task, orderNumber: index };
    });
  });

  return newTasksByStatus;
};
