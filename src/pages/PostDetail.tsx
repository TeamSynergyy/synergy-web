import {
  Text,
  ActionIcon,
  Avatar,
  Card,
  Flex,
  Group,
  LoadingOverlay,
  Menu,
  createStyles,
  rem,
  Textarea,
} from "@mantine/core";
import { IconDots, IconTrash, IconMessage } from "@tabler/icons-react";
import { api } from "app/api";
import NewPostComment from "components/post/NewPostComment";
import PostCard from "components/post/PostCard";
import PostLike from "components/post/PostLike";
import dayjs from "dayjs";
import { Link, useParams } from "react-router-dom";

import relativeTime from "dayjs/plugin/relativeTime";
import CommentStack from "components/comment/CommentStack";
dayjs.extend(relativeTime);

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

export default function PostDetail() {
  const { classes } = useStyles();
  const postId = parseInt(useParams().id as string);
  const { data: post, isLoading } = api.useGetPostQuery(postId);

  const setDeletePost = api.useDeletePostMutation()[0];

  if (isLoading) return <LoadingOverlay visible />;
  if (!post) return null;

  const handleDelete = async () => {
    try {
      await setDeletePost(post.postId).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Card radius="md" p="md" className={classes.card}>
        <Card.Section className={classes.section}>
          <Group position="apart">
            <Group>
              <Link to={`/people/${post.userId}`}>
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

          <Text mt="xs">{post.content}</Text>
        </Card.Section>

        <Card.Section className={classes.section}>
          <PostLike {...post} />
        </Card.Section>

        <Card.Section>
          <ActionIcon onClick={() => null}>
            <IconMessage size="1.25rem" />
          </ActionIcon>
        </Card.Section>

        <Card.Section>
          <NewPostComment postId={postId} />
        </Card.Section>

        <Card.Section>
          <CommentStack postId={postId} />
        </Card.Section>
      </Card>
    </>
  );
}
