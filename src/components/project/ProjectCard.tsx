import {
  Card,
  Avatar,
  Text,
  Progress,
  Badge,
  Group,
  Title,
  Button,
  createStyles,
  Box,
  Menu,
  ActionIcon,
  rem,
} from "@mantine/core";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router-dom";
import { Project } from "types";
import ProjectLike from "./ProjectLike";
import { api } from "app/api";
import { IconDots, IconEdit, IconTrash, IconUsers } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  likesNumber: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray[6],
  },

  likeIcon: {
    color: theme.colors.red[6],
  },
}));

export default function ProjectCard({
  project,
  isDetail = false,
}: {
  project: Project;
  isDetail?: boolean;
}) {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const deleteProject = api.useDeleteProjectMutation()[0];

  if (!project) return null;

  const {
    projectId,
    name,
    content,
    field,
    startAt,
    endAt,
    likes,
    leaderId,
    teamUserIds,
  } = project;

  const numTeamMembers = teamUserIds?.length || 0;
  const isLeader = api.useGetMyInfoQuery(null).data?.userId === leaderId;
  const today = dayjs();
  const dday = Math.floor(today.diff(dayjs(project.startAt), "day", true));
  const progress =
    (100 * dday) / dayjs(project.endAt).diff(dayjs(project.startAt), "day");

  // 현재 삭제 대신 넣어놈 수정 필요
  const handleEdit = async () => {
    try {
      await deleteProject({ id: projectId }).unwrap();
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProject({ id: projectId }).unwrap();
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card
      withBorder={!isDetail}
      padding={isDetail ? 0 : "lg"}
      radius="md"
      w="100%"
    >
      {isDetail && (
        <Group position="apart" mb="md">
          <div></div>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon>
                <IconDots size="1rem" />
              </ActionIcon>
            </Menu.Target>

            {isLeader && (
              <Menu.Dropdown>
                <Menu.Item
                  icon={<IconEdit size={rem(14)} />}
                  onClick={handleEdit}
                >
                  수정하기
                </Menu.Item>
                <Menu.Item
                  icon={<IconTrash size={rem(14)} />}
                  color="red"
                  onClick={handleDelete}
                >
                  삭제하기
                </Menu.Item>
              </Menu.Dropdown>
            )}
          </Menu>
        </Group>
      )}
      <Group position="apart">
        <Badge>D{dday < 0 ? dday : `+${dday}`}</Badge>
        <Group spacing="xs">
          <IconUsers color="gray" size="1.25rem" />
          <Text c="gray" fz="lg">
            {numTeamMembers}
          </Text>
        </Group>
      </Group>

      <Title fz="lg" fw={500} mt="md">
        {name}
      </Title>

      <Text c="dark" mt={5}>
        {content}
      </Text>

      <Text c="gray" my="md">
        분야:{" "}
        <Text
          span
          c="dark"
          fw={500}
          sx={(theme) => ({
            color: theme.colorScheme === "dark" ? theme.white : theme.black,
          })}
        >
          {field}
        </Text>
      </Text>

      <Text c="dark">
        {startAt?.split("T")[0]} ~ {endAt ? endAt.split("T")[0] : ""}
      </Text>

      {endAt && <Progress value={progress} mb={5} color="gray" />}

      <Group position="apart" mt="md">
        <Group>
          <ProjectLike {...{ id: projectId, likes }} />

          {likes > 0 ? (
            <Text className={classes.likesNumber}>좋아요 {likes}</Text>
          ) : null}
        </Group>

        {!isDetail && (
          <Link to={`/project/${projectId}`}>
            <Button variant="default">자세히 보기</Button>
          </Link>
        )}
      </Group>
    </Card>
  );
}
