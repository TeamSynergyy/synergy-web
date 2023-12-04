import {
  Avatar,
  Button,
  Group,
  Modal,
  MultiSelect,
  NumberInput,
  Select,
  TextInput,
  Text,
  Textarea,
  MultiSelectValueProps,
  SelectItemProps,
  Box,
  rem,
  CloseButton,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { api } from "app/api";
import UserAvatarName from "components/user/UserAvatarName";
import dayjs from "dayjs";
import { forwardRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProjectTask } from "types";

export default function UpdateProjectTaskForm({
  task,
  toggle,
}: {
  task: ProjectTask;
  toggle: () => void;
}) {
  const id = useParams<{ id: string }>().id;
  const { data: project } = api.useGetProjectQuery(Number(id));
  const teamUserIds = project?.teamUserIds ?? [];

  const updateTask = api.useUpdateProjectTaskWithoutOrderNumberMutation()[0];

  const form = useForm({
    initialValues: { ...task },

    validate: {},
  });

  return (
    <>
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            // await const
            const payload = await updateTask({
              ...values,
              endAt:
                values.endAt &&
                dayjs(values.endAt).format("YYYY-MM-DDT00:00:00.000"),
            });

            close();
          } catch (e) {
            console.log(e);
          }
        })}
      >
        <Select
          data={["BACKLOG", "IN_PROGRESS", "REVIEW", "DONE"]}
          label="Status"
          {...form.getInputProps("status")}
        />

        <TextInput
          withAsterisk
          required
          label="Title"
          placeholder="To Do"
          {...form.getInputProps("title")}
        />

        <Textarea
          label="Content"
          placeholder="Description"
          {...form.getInputProps("content")}
        />

        <DatePickerInput
          label="Deadline"
          placeholder="Pick dates"
          {...form.getInputProps("endAt")}
        />
        <NumberInput
          label="Time required"
          placeholder="Hour"
          {...form.getInputProps("assignedTime")}
        />

        <TextInput
          label="Tag"
          placeholder="Tag"
          {...form.getInputProps("tag")}
        />

        {/* <ColorInput
              label="Tag Color"
              withPicker={false}
              swatches={MANTINE_COLORS}
              {...form.getInputProps("tagColor")}
            /> */}

        <MultiSelect
          data={teamUserIds}
          label="Assigned User"
          valueComponent={Value}
          itemComponent={Item}
          searchable
          {...form.getInputProps("assignedUserIds")}
        />

        <Group position="right" mt="md">
          <Button variant="outline" onClick={toggle}>
            취소
          </Button>
          <Button type="submit">작업 수정</Button>
        </Group>
      </form>
    </>
  );
}

function Value({
  value,
  onRemove,
  ...others
}: MultiSelectValueProps & { value: string }) {
  return (
    <div {...others}>
      <Group spacing={2} align="center">
        <UserAvatarName userId={value} />
        <CloseButton
          onMouseDown={onRemove}
          variant="transparent"
          size={22}
          iconSize={14}
          tabIndex={-1}
        />
      </Group>
    </div>
  );
}

const Item = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ value, ...others }, ref) => {
    if (!value) return null;
    return (
      <div ref={ref} {...others}>
        <UserAvatarName userId={value} />
      </div>
    );
  }
);
