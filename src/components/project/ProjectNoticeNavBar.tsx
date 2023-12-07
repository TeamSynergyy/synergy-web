import { Button, Group, Paper, ScrollArea, Stack, Text } from "@mantine/core";
import { api } from "app/api";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";

export function ProjectNoticeNavBar() {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const id = pathname.split("/")[2];
  const { data: notices } = api.useGetProjectNoticesQuery(id);

  if (pathname.split("/")[3]) return <></>;
  return (
    <>
      <Text size="lg" weight={700} m="md">
        최근 공지
      </Text>
      <ScrollArea h="80vh">
        <Stack>
          {notices?.map((notice) => (
            <Paper key={notice.noticeId} p="md" mt="md">
              <Text c="gray">
                {dayjs(notice.updateAt).local().format("YYYY/MM/DD  HH:mm")}
              </Text>

              <Text>{notice.content}</Text>
            </Paper>
          ))}
        </Stack>
      </ScrollArea>
      <Button
        fullWidth
        variant="subtle"
        onClick={() => navigate(`/project/${id}/notice`)}
      >
        more...
      </Button>
    </>
  );
}
