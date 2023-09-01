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
} from "@mantine/core";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Project } from "types";

const avatars = [
  "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80",
];

const useStyles = createStyles((theme) => ({
  likesNumber: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray[6],
  },

  likeIcon: {
    color: theme.colors.red[6],
  },
}));

export default function ProjectCard({ project }: { project: Project }) {
  const { classes } = useStyles();

  if (!project) return null;

  const { id, name, content, field, startAt, endAt, likes } = project;

  const today = dayjs();
  const dday = Math.floor(today.diff(dayjs(project.startAt), "day", true));

  return (
    <Card withBorder padding="lg" radius="md" w="100%">
      <Badge>D{dday < 0 ? dday : `+${dday}`}</Badge>

      <Title fz="lg" fw={500} mt="md">
        {name}
      </Title>
      <Text c="dark" mt={5}>
        {content}
      </Text>

      <Text c="dimmed" fz="sm" mt="md">
        분야:{" "}
        <Text
          span
          fw={500}
          sx={(theme) => ({
            color: theme.colorScheme === "dark" ? theme.white : theme.black,
          })}
        >
          {field}
        </Text>
      </Text>

      <Text>
        {startAt?.split("T")[0]} ~ {endAt ? endAt.split("T")[0] : ""}
      </Text>

      <Progress value={(23 / 36) * 100} mt={5} />

      <Group position="apart" mt="md">
        <Avatar.Group spacing="sm">
          <Avatar src={avatars[0]} radius="xl" />
          <Avatar src={avatars[1]} radius="xl" />
          <Avatar src={avatars[2]} radius="xl" />
          <Avatar radius="xl">+5</Avatar>
        </Avatar.Group>

        <Group>
          {likes > 0 ? (
            <Text className={classes.likesNumber}>좋아요 {likes}</Text>
          ) : null}
          <Link to={`/project/${id}`}>
            <Button>자세히 보기</Button>
          </Link>
        </Group>
      </Group>
    </Card>
  );
}
