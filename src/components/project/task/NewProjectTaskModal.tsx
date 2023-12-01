import {
  Button,
  ColorInput,
  DEFAULT_THEME,
  Group,
  MANTINE_COLORS,
  Modal,
  MultiSelect,
  NumberInput,
  Select,
  TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { api } from "app/api";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { ProjectTask } from "types";

export default function NewProjectTaskModal({
  status,
}: {
  status: ProjectTask["status"];
}) {
  const id = useParams<{ id: string }>().id;
  const { data: project } = api.useGetProjectQuery(Number(id));
  const teamUserIds = project?.teamUserIds ?? [];

  const [opened, { open, close }] = useDisclosure(false);

  const createTask = api.useCreateProjectTaskMutation()[0];

  const form = useForm({
    initialValues: {
      title: "",
      endAt: undefined,
      assignedTime: 0,
      tag: "",
      tagColor: "",
      status,
      assignedUserIds: [],
    },

    validate: {},
  });

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">
        <form
          onSubmit={form.onSubmit((values) =>
            createTask({
              ...values,
              projectId: Number(id),
              endAt: dayjs(values.endAt).format("YYYY-MM-DDT00:00:00.000"),
            })
          )}
        >
          <Select
            data={["BACKLOG", "IN_PROGRESS", "REVIEW", "DONE"]}
            label="Status"
            {...form.getInputProps("status")}
          />

          <TextInput
            withAsterisk
            label="Title"
            placeholder="To Do"
            {...form.getInputProps("title")}
          />

          <DatePickerInput
            label="Deadline"
            placeholder="Pick dates"
            {...form.getInputProps("endAt")}
          />
          <NumberInput
            label="Time required"
            placeholder="시간"
            {...form.getInputProps("assignedTime")}
          />

          <TextInput
            label="Tag"
            placeholder="Tag"
            {...form.getInputProps("tag")}
          />
          <ColorInput
            label="Tag Color"
            withPicker={false}
            swatches={MANTINE_COLORS}
            {...form.getInputProps("tagColor")}
          />

          <MultiSelect
            data={teamUserIds}
            label="Assigned User"
            {...form.getInputProps("assignedUserIds")}
          />

          <Group position="right" mt="md">
            <Button type="submit">작업 생성</Button>
          </Group>
        </form>
      </Modal>

      <Group position="center">
        <Button onClick={open}>새 작업 생성</Button>
      </Group>
    </>
  );
}
