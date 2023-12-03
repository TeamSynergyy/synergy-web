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
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { api } from "app/api";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProjectTask } from "types";

export default function NewProjectTaskModal({
  status,
  opened,
  open,
  close,
}: {
  status: ProjectTask["status"];
  opened: boolean;
  open: () => void;
  close: () => void;
}) {
  const id = useParams<{ id: string }>().id;
  const { data: project } = api.useGetProjectQuery(Number(id));
  const teamUserIds = project?.teamUserIds ?? [];

  const createTask = api.useCreateProjectTaskMutation()[0];

  const form = useForm({
    initialValues: {
      title: "",
      content: "",
      endAt: undefined,
      assignedTime: 0,
      tag: "",
      tagColor: "blue",
      status,
      assignedUserIds: [],
    },

    validate: {},
  });

  useEffect(() => {
    if (form.values.status !== status) {
      form.setFieldValue("status", status);
    }
  }, [status]);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">
        <form
          onSubmit={form.onSubmit(async (values) => {
            try {
              // await const
              const payload = await createTask({
                ...values,
                projectId: Number(id),
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

const AssignedUser = ({ userId }: { userId: string }) => {
  const { data, isLoading, isError, error } = api.useGetUserQuery(userId);

  if (isLoading) return <p>"Loading..."</p>;
  if (isError) {
    console.error(error);
    return <p>error! check the console message</p>;
  }
  if (!data) return <p>사용자의 데이터를 불러오지 못했습니다.</p>;

  const { username, profileImageUrl } = data;

  return (
    <Group spacing={2}>
      <Avatar src={profileImageUrl} radius="xl" size="sm" />
      <Text size="xs">{username}</Text>
    </Group>
  );
};
