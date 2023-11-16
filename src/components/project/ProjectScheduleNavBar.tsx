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
        일정
      </Text>
      <ScrollArea h="80vh">
        <Stack>
          {data?.map((sched) => (
            <Paper key={sched.scheduleId} p="md" mt="md">
              <Text c="gray">{dayjs(sched.startAt).format("YYYY-MM-DD")}</Text>
              <Text c="gray">{dayjs(sched.endAt).format("YYYY-MM-DD")}</Text>

              <Text>{sched.title}</Text>

              {sched.label && <Badge variant="light">{sched.label}</Badge>}
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
