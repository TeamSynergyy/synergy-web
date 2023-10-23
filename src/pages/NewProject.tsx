import {
  TextInput,
  Button,
  Group,
  Textarea,
  Dialog,
  Text,
  MultiSelect,
  Flex,
  Checkbox,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { api } from "app/api";
import { useNavigate } from "react-router-dom";
import { DateInput } from "@mantine/dates";
import dayjs from "dayjs";
import usePage from "hooks/usePage";
import MapInfo from "components/project/MapInfo";
import { useState } from "react";

const data = ["웹개발", "앱개발", "머신러닝", "인공지능"];

export default function NewProject() {
  const setCreateProject = api.useCreateProjectMutation()[0];
  const { initPage } = usePage();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [coord, setCoord] = useState<[number, number]>([0, 0]);
  const form = useForm({
    initialValues: {
      name: "",
      content: "",
      field: "",
      startAt: "",
      endAt: "",
      latitude: 0,
      longitude: 0,
    },
    validate: {
      endAt: (endAt, values) =>
        dayjs(values.startAt) > dayjs(endAt)
          ? "시작일이 종료일보다 늦습니다."
          : null,
    },
  });

  return (
    <>
      <Flex justify="flex-end" align="center" gap="sm">
        <Text size="sm" c="gray">
          또는
        </Text>
        <Button
          size="sm"
          variant="subtle"
          onClick={() => navigate("/new/post")}
        >
          새 글 쓰기
        </Button>
      </Flex>
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            const startAt =
              dayjs(values.startAt).format("YYYY-MM-DD") + "T00:00:00.000Z";
            const endAt = values.endAt
              ? dayjs(values.startAt).format("YYYY-MM-DD") + "T00:00:00.000Z"
              : "";
            await setCreateProject({
              ...values,
              startAt,
              endAt,
              latitude: coord[0],
              longitude: coord[1],
            }).unwrap();
            initPage("recentProject");
            navigate(`/home/recent/project`);
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

        <Select
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

        <div>
          <br />
          <MapInfo coord={coord} setCoord={setCoord} />
        </div>

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
