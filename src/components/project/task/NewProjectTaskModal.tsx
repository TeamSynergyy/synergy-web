import {
  Button,
  ColorInput,
  Group,
  Modal,
  NumberInput,
  Select,
  TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { api } from "app/api";
import { useParams } from "react-router-dom";
import { ProjectTask } from "types";

export default function NewProjectTaskModal({
  status,
}: {
  status: ProjectTask["status"];
}) {
  const id = useParams<{ id: string }>().id;

  const [opened, { open, close }] = useDisclosure(false);

  const createTask = api.useCreateProjectTaskMutation()[0];

  const form = useForm({
    initialValues: {
      title: "",
      endAt: "",
      assignedTime: 0,
      tag: "",
      tagColor: "",
      status,
      assignedUserId: "",
    },

    validate: {},
  });

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">
        <form
          onSubmit={form.onSubmit((values) =>
            createTask({ ...values, projectId: Number(id) })
          )}
        >
          <Select
            data={["Backlog", "In progress", "Review", "Done"]}
            label="Status"
            {...form.getInputProps("status")}
          />

          <TextInput
            withAsterisk
            label="Title"
            placeholder="your@email.com"
            {...form.getInputProps("title")}
          />

          <DatePickerInput
            label="Deadline"
            valueFormat="YYYY-MM-DDT00:00:00"
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
            format="hex"
            withPicker={false}
            swatches={[
              "#25262b",
              "#868e96",
              "#fa5252",
              "#e64980",
              "#be4bdb",
              "#7950f2",
              "#4c6ef5",
              "#228be6",
              "#15aabf",
              "#12b886",
              "#40c057",
              "#82c91e",
              "#fab005",
              "#fd7e14",
            ]}
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
