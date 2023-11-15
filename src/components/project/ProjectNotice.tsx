import {
  Button,
  CloseButton,
  Group,
  Modal,
  Paper,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { api } from "app/api";
import { useParams } from "react-router-dom";

import dayjs from "dayjs";
import ProjectTab from "./ProjectTab";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export default function ProjectNotice() {
  const id = Number(useParams().id);
  const { data: notices } = api.useGetProjectNoticesQuery(id);
  const { data: project } = api.useGetProjectQuery(Number(id));
  const deleteNotice = api.useDeleteProjectNoticeMutation()[0];

  const createNotice = api.useCreateProjectNoticeMutation()[0];

  const isLeader =
    project?.leaderId === api.useGetMyInfoQuery(null).data?.userId;

  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState("");

  return (
    <Stack>
      <ProjectTab projectId={id} />

      {isLeader && (
        <>
          <Modal opened={opened} onClose={close} title="새 공지 작성" centered>
            <Textarea
              placeholder="공지사항을 입력하세요"
              value={value}
              onChange={(event) => setValue(event.currentTarget.value)}
            />
            <Group position="right" m="md">
              <Button variant="outline" onClick={close}>
                취소
              </Button>
              <Button
                disabled={value === ""}
                onClick={() => {
                  createNotice({ projectId: id, content: value });
                  close();
                  setValue("");
                }}
              >
                작성
              </Button>
            </Group>
          </Modal>

          <Group position="center">
            <Button onClick={open}>새 공지 작성</Button>
          </Group>
        </>
      )}

      {notices?.map((notice) => (
        <Paper key={notice.noticeId} p="md" mt="md">
          <Group position="apart">
            <Text c="gray">
              {dayjs(notice.updateAt).format("YYYY/MM/DD  hh:mm")}
            </Text>
            {isLeader && (
              <CloseButton onClick={() => deleteNotice(notice.noticeId)} />
            )}
          </Group>
          <Text>{notice.content}</Text>
        </Paper>
      ))}
    </Stack>
  );
}
