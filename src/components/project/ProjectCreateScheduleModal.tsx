import { Button, Group, Modal, TextInput, Textarea } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { api } from "app/api";
import dayjs from "dayjs";

export const ProjectCreateScheduleModal = ({
  opened,
  close,
  projectId,
}: {
  opened: boolean;
  close: () => void;
  projectId: number;
}) => {
  const form = useForm({
    initialValues: {
      title: "",
      content: "",
      label: "",
      dates: ["", ""],
    },
    validate: {
      title: (value) => (value.trim() ? null : "필수입니다"),
      dates: (value) => (value[0] ? null : "필수입니다"),
    },
  });

  const createSchedule = api.useCreateProjectScheduleMutation()[0];

  return (
    <>
      <Modal opened={opened} onClose={close} title="새 일정 작성" centered>
        <form
          onSubmit={form.onSubmit((values) => {
            const dates = values.dates.map((date) =>
              dayjs(date).format("YYYY-MM-DDT00:00:00.000")
            );
            const schedule = {
              title: values.title,
              content: values.content,
              label: values.label,
              startAt: dates[0],
              endAt: dates[1],
              projectId,
            };
            createSchedule(schedule);
            form.reset();
            close();
          })}
        >
          <TextInput
            withAsterisk
            label="일정 제목"
            placeholder="일정 제목을 입력하세요"
            {...form.getInputProps("title")}
          />

          <DatePickerInput
            withAsterisk
            type="range"
            label="일정 기간"
            placeholder="여기를 눌러 일정 기간을 선택하세요"
            allowSingleDateInRange
            {...form.getInputProps("dates")}
          />

          <Textarea
            label="일정 내용"
            placeholder="일정 내용을 입력하세요"
            {...form.getInputProps("content")}
          />

          <TextInput
            label="일정 라벨"
            placeholder="일정 라벨을 입력하세요"
            {...form.getInputProps("label")}
          />
          <Group position="right" m="md">
            <Button variant="outline" onClick={close}>
              취소
            </Button>
            <Button type="submit">저장</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};
