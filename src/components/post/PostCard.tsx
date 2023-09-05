import { IconDots, IconMessage, IconTrash } from "@tabler/icons-react";
import {
  Card,
  Text,
  Group,
  ActionIcon,
  createStyles,
  Avatar,
  Menu,
  rem,
  Spoiler,
  Flex,
} from "@mantine/core";
import { api } from "app/api";
import { Link, useNavigate } from "react-router-dom";
import { Post } from "types";
import PostLike from "./PostLike";
import { useRef } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const useStyles = createStyles((theme) => ({
  card: {
    width: "100%",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  section: {
    padding: theme.spacing.sm,
  },

  likes: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray[6],
  },

  likeBtn: {
    color: theme.colors.red[6],
  },
}));

export default function PostCard({ post }: { post: Post }) {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const setDeletePost = api.useDeletePostMutation()[0];
  const spoilerControlRef = useRef<HTMLButtonElement>(null);

  const closeSpoilerText = "Hide";
  const openSpoiler = () => {
    if (
      spoilerControlRef.current &&
      spoilerControlRef.current.textContent !== closeSpoilerText
    ) {
      spoilerControlRef.current.click();
    }
  };
  const handleDelete = async () => {
    try {
      await setDeletePost(post.id).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  if (!post) return null;

  dayjs.extend(relativeTime);
  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section className={classes.section}>
        <Group position="apart">
          <Group>
            <Link to={`/people/${post.authorId}`}>
              <Avatar src={post.authorAvatar} radius="xl" />
            </Link>
            <Text>{post.authorName}</Text>

            <Text fz="sm" c="gray">
              {dayjs(post.createAt).fromNow()}
            </Text>
          </Group>

          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon>
                <IconDots size="1rem" />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                icon={<IconTrash size={rem(14)} />}
                color="red"
                onClick={handleDelete}
              >
                삭제하기
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group position="apart">
          <Text fz="lg" fw={500}>
            {post.title}
          </Text>
        </Group>
        <Spoiler
          maxHeight={110}
          showLabel="Show more"
          hideLabel={closeSpoilerText}
          controlRef={spoilerControlRef}
        >
          <Text mt="xs" onClick={openSpoiler}>
            {post.content}
          </Text>
        </Spoiler>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Flex w="100%" justify="space-between" align="center">
          <PostLike {...post} />
          <ActionIcon onClick={() => navigate(`/post/${post.id}`)}>
            <IconMessage size="1.25rem" />
          </ActionIcon>
        </Flex>
      </Card.Section>
    </Card>
  );
}
