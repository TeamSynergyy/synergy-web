import {
  TextInput,
  Button,
  Group,
  Textarea,
  Dialog,
  Text,
  MultiSelect,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { api } from "app/api";
import { useNavigate } from "react-router-dom";
import { DateInput } from "@mantine/dates";

export default function NewProject() {
  const setCreateProject = api.useCreateProjectMutation()[0];
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      name: "",
      content: "",
      field: [],
      startAt: "",
      endAt: "",
    },
  });

  const data = [
    { value: "기계자동차", label: "기계자동차" },
    { value: "전기전자", label: "전기전자" },
    { value: "IT서비스", label: "IT서비스" },
    { value: "AI", label: "AI" },
    { value: "인문학", label: "인문학" },
    { value: "어학", label: "어학" },
    { value: "창업", label: "창업" },
    { value: "기타", label: "기타" },
  ];

  return (
    <>
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            const id = await setCreateProject(values).unwrap();
            navigate(`/project/${id}`);
          } catch (e) {
            open();
            console.error(e);
          }
        })}
      >
        <TextInput
          required
          label="name"
          placeholder="프로젝트 이름"
          {...form.getInputProps("name")}
        />

        <Textarea
          required
          label="content"
          placeholder="프로젝트 내용"
          {...form.getInputProps("content")}
        />

        <MultiSelect
          required
          data={data}
          label="field"
          placeholder="분야"
          {...form.getInputProps("field")}
        />

        <DateInput
          required
          valueFormat="YYYY-MM-DD"
          label="startAt"
          placeholder="시작일"
          {...form.getInputProps("startAt")}
        />

        <DateInput
          valueFormat="YYYY-MM-DD"
          label="endAt"
          placeholder="종료예정일"
          {...form.getInputProps("endAt")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
      <Dialog
        opened={opened}
        withCloseButton
        onClose={close}
        size="lg"
        radius="md"
      >
        <Text size="sm" weight={500}>
          🚨 프로젝트 생성에 실패했습니다.
        </Text>
      </Dialog>
    </>
  );
}
