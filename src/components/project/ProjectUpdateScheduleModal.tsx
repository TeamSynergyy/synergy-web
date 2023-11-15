import { Button, Group, Modal, TextInput, Textarea } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { api } from "app/api";
import dayjs from "dayjs";
import { useEffect } from "react";
import { ProjectSchedule } from "types";

export const ProjectUpdateScheduleModal = ({
  opened,
  close,
  schedule,
}: {
  opened: boolean;
  close: () => void;
  schedule: ProjectSchedule;
}) => {
  const form = useForm({
    initialValues: {
      ...schedule,
      dates: [dayjs(schedule.startAt), dayjs(schedule.endAt)],
    },
    validate: {
      title: (value) => (value.trim() ? null : "필수입니다"),
      dates: (value) => (value[0] ? null : "필수입니다"),
    },
  });

  const updateSchedule = api.useUpdateProjectScheduleMutation()[0];

  useEffect(() => {
    form.setValues({
      ...schedule,
      dates: [dayjs(schedule.startAt), dayjs(schedule.endAt)],
    });
  }, [schedule]);

  return (
    <>
      <Modal opened={opened} onClose={close} title="일정 수정" centered>
        <form
          onSubmit={form.onSubmit((values) => {
            const dates = values.dates.map((date) =>
              dayjs(date).format("YYYY-MM-DDT00:00:00.000")
            );
            const updatedSchedule = {
              title: values.title,
              content: values.content,
              label: values.label,
              startAt: dates[0],
              endAt: dates[1],
              projectId: values.projectId,
              scheduleId: values.scheduleId,
            };
            updateSchedule(updatedSchedule);
            form.reset();
            close();
          })}
        >
          <TextInput
            required
            withAsterisk
            label="일정 제목"
            placeholder="일정 제목을 입력하세요"
            {...form.getInputProps("title")}
          />

          <DatePickerInput
            required
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
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};
