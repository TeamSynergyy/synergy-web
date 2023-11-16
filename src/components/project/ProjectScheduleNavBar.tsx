import {
  Badge,
  Button,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { api } from "app/api";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";

export function ProjectScheduleNavBar() {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const id = pathname.split("/")[2];
  const { data } = api.useGetProjectScheduleQuery(id);

  if (pathname.split("/")[3]) return <></>;
  return (
    <>
      <Text size="lg" weight={700} m="md">
        최근 공지
      </Text>
      <ScrollArea h="80vh">
        <Stack>
          {data?.map((sched) => (
            <Paper key={sched.scheduleId} p="md" mt="md" withBorder>
              <Text weight={500}>{sched.title}</Text>

              {sched.label && (
                <Badge variant="light" mt="md">
                  {sched.label}
                </Badge>
              )}
              <Text size="sm" mt="xs">
                {sched.content}
              </Text>
              <Text size="sm" mt="xs">
                시작: {dayjs(sched.startAt).format("YYYY-MM-DD")}
              </Text>
              <Text size="sm">
                종료: {dayjs(sched.endAt).format("YYYY-MM-DD")}
              </Text>
            </Paper>
          ))}
        </Stack>
      </ScrollArea>
      <Button
        fullWidth
        variant="subtle"
        onClick={() => navigate(`/project/${id}/schedule`)}
      >
        more...
      </Button>
    </>
  );
}
