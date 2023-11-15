import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Flex,
  Group,
  Menu,
  ScrollArea,
  Stack,
  Text,
  rem,
} from "@mantine/core";
import ProjectTab from "./ProjectTab";
import { useParams } from "react-router-dom";
import { api } from "app/api";
import { IconDots, IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import dayjs from "dayjs";
import {
  useDisclosure,
  useMediaQuery,
  useScrollIntoView,
} from "@mantine/hooks";
import { useState } from "react";
import { ProjectCreateScheduleModal } from "./ProjectCreateScheduleModal";
import { ProjectUpdateScheduleModal } from "./ProjectUpdateScheduleModal";

export default function ProjectSchedule() {
  const id = Number(useParams().id);
  const matches = useMediaQuery("(min-width: 48em)");
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 10,
  });

  const { data: project, isLoading } = api.useGetProjectQuery(Number(id));
  const { data } = api.useGetProjectScheduleQuery(id);

  const deleteSchedule = api.useDeleteProjectScheduleMutation()[0];

  const [opened, { open, close }] = useDisclosure(false);
  const [updateOpened, { open: updateOpen, close: updateClose }] =
    useDisclosure(false);

  const [schedId, setSchedId] = useState(0);
  const selectedSched = data?.find((sched) => sched.scheduleId === schedId);

  const getDiff = (startAt: string, endAt: string) =>
    dayjs(endAt).diff(dayjs(startAt));

  if (isLoading) return <div>loading...</div>;
  if (!project) return <div>no project</div>;

  const projectPeriod = getDiff(project.startAt, project.endAt);
  const projectStartAt = dayjs(project.startAt).format("YYYY-MM-DD");
  const projectEndAt = dayjs(project.endAt).format("YYYY-MM-DD");
  const mondays = getMondays(project.startAt, project.endAt);
  const months = getMonths(project.startAt, project.endAt);

  const verticalLineDates = [projectStartAt, ...mondays, projectEndAt];

  const getMargin = (startAt: string) =>
    (100 * getDiff(project.startAt, startAt)) / projectPeriod;
  const getWidth = (startAt: string, endAt: string) =>
    (100 * getDiff(startAt, dayjs(endAt).add(1, "day").format())) /
    projectPeriod;

  return (
    <Container px={0}>
      <ProjectTab projectId={id} />

      <Card withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding py="xs">
          <Group position="apart">
            <Text weight={500}>프로젝트 일정</Text>
            <Group>
              <ActionIcon onClick={open}>
                <IconPlus size="1.25rem" />
              </ActionIcon>
            </Group>
          </Group>
        </Card.Section>

        <ScrollArea w="100%" py="md">
          <Group
            w={`${mondays.length * 40 * (matches ? 1 : 2)}%`}
            h="100%"
            pos="relative"
            pt="lg"
            mx="md"
          >
            {verticalLineDates.map((date) => {
              return (
                <VerticalLine
                  key={"dates" + date}
                  date={date}
                  marginLeft={getMargin(date)}
                />
              );
            })}

            {
              <NowVerticalLine
                marginLeft={getMargin(dayjs().format())}
              ></NowVerticalLine>
            }

            {months.map((date) => (
              <MonthText
                key={"month" + date}
                date={date}
                marginLeft={getMargin(date)}
              />
            ))}

            <Stack spacing="xs" w="100%">
              <Box h="lg" />
              {data?.map((sched) => {
                const marginEnd = getMargin(sched.endAt);
                const badgePosition = marginEnd > 50 ? "left" : "right";
                return (
                  <Group key={sched.scheduleId} spacing="xs">
                    <Flex
                      pos="relative"
                      align="center"
                      ml={`${getMargin(sched.startAt)}%`}
                      w={`${getWidth(sched.startAt, sched.endAt)}%`}
                    >
                      {badgePosition === "left" && sched.label && (
                        <Badge
                          hidden={sched.label === ""}
                          variant="light"
                          pos="absolute"
                          left={-8}
                          top="50%"
                          sx={{
                            transform: "translate(-100%, -50%)",
                            zIndex: 100,
                          }}
                        >
                          {sched.label}
                        </Badge>
                      )}
                      <Button
                        variant={
                          sched.scheduleId === schedId ? "gradient" : "default"
                        }
                        compact
                        fullWidth
                        onClick={() => {
                          setSchedId(sched.scheduleId);
                          scrollIntoView({
                            alignment: "center",
                          });
                        }}
                      >
                        {sched.title}
                      </Button>
                    </Flex>
                    {badgePosition === "right" && sched.label && (
                      <Badge hidden={sched.label === ""} variant="light">
                        {sched.label}
                      </Badge>
                    )}
                  </Group>
                );
              })}

              <Box h="xs" />
            </Stack>
          </Group>
        </ScrollArea>
      </Card>

      {selectedSched ? (
        <Card withBorder shadow="sm" radius="md" mt="lg" p="md">
          <Group position="apart">
            <Text weight={500}>{selectedSched.title}</Text>
            <Menu withinPortal position="bottom-end" shadow="sm">
              <Menu.Target>
                <ActionIcon>
                  <IconDots size="1rem" />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  icon={<IconPencil size={rem(14)} />}
                  onClick={updateOpen}
                >
                  수정
                </Menu.Item>
                <Menu.Item
                  icon={<IconTrash size={rem(14)} />}
                  color="red"
                  onClick={() => deleteSchedule(selectedSched)}
                >
                  삭제
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
          {selectedSched.label && (
            <Badge variant="light" mt="md">
              {selectedSched.label}
            </Badge>
          )}
          <Text size="sm" mt="xs">
            {selectedSched.content}
          </Text>
          <Text size="sm" mt="xs">
            시작: {dayjs(selectedSched.startAt).format("YYYY-MM-DD")}
          </Text>
          <Text size="sm">
            종료: {dayjs(selectedSched.endAt).format("YYYY-MM-DD")}
          </Text>
        </Card>
      ) : (
        <Text mt="lg">일정을 선택하세요</Text>
      )}
      <div ref={targetRef} />

      <ProjectCreateScheduleModal
        {...{ opened, close, projectId: project.projectId }}
      />

      {selectedSched && (
        <ProjectUpdateScheduleModal
          {...{
            opened: updateOpened,
            close: updateClose,
            schedule: selectedSched,
          }}
        />
      )}
    </Container>
  );
}

const getMondays = (startAt: string, endAt: string) => {
  let start = dayjs(startAt);
  const end = dayjs(endAt);
  const mondays = [];

  while (start.isBefore(end)) {
    if (start.day() === 1) {
      mondays.push(start.format("YYYY-MM-DD"));
    }
    start = start.add(1, "day");
  }

  return mondays;
};

const getMonths = (startAt: string, endAt: string) => {
  let start = dayjs(startAt);
  const end = dayjs(endAt);
  const months = [];

  while (start.isBefore(end)) {
    months.push(start.format("YYYY-MM-DD"));

    start = start.add(1, "M");
  }

  return months;
};

const VerticalLine = ({
  date,
  marginLeft,
}: {
  date: string;
  marginLeft: number;
}) => {
  return (
    <>
      <Text c="gray" pos="absolute" left={`${marginLeft}%`} top={24} pl={8}>
        {dayjs(date).format("D")}
      </Text>
      <Divider
        orientation="vertical"
        pos="absolute"
        left={`${marginLeft}%`}
        top={28}
        bottom={0}
      />
    </>
  );
};

const NowVerticalLine = ({ marginLeft }: { marginLeft: number }) => {
  return (
    <>
      <Text c="red" pos="absolute" left={`${marginLeft}%`} top={20} pl={8}>
        Now
      </Text>
      <Divider
        orientation="vertical"
        pos="absolute"
        left={`${marginLeft}%`}
        top={20}
        bottom={0}
        color="red"
      />
    </>
  );
};

const MonthText = ({
  date,
  marginLeft,
}: {
  date: string;
  marginLeft: number;
}) => {
  return (
    <>
      <Text
        c="gray"
        pos="absolute"
        left={`${marginLeft}%`}
        top={0}
        sx={{ transform: "translateX(-50%)" }}
      >
        {dayjs(date).format("MMM")}
      </Text>
    </>
  );
};
