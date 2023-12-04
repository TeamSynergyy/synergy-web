import {
  Card,
  Title,
  Text,
  Badge,
  ScrollArea,
  Group,
  Center,
  Button,
  useMantineTheme,
  createStyles,
  Box,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconHeart } from "@tabler/icons-react";
import { api } from "app/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colors.gray[0],
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
    "&:hover": {
      backgroundColor: theme.colors.gray[2],
    },
  },
}));

const TrendingPosts = () => {
  const { data: posts, isLoading } = api.useGetTrendingPostsQuery(null);

  const { classes } = useStyles();
  const mediaQuery = useMediaQuery("(max-width: 1200px)");

  const titleLength = mediaQuery ? 18 : 28;

  return (
    <Card shadow="sm" padding={!mediaQuery ? "md" : "xs"}>
      <Title order={5}>Trending</Title>

      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        posts?.slice(0, 5).map((post, i) => (
          <Link
            to={`/post/${post.postId}`}
            style={{ textDecoration: "none" }}
            key={i}
          >
            <Card className={classes.card} w="100%" p="xs" h="auto">
              <Text>
                {post.title
                  ? post.title.slice(0, titleLength) +
                    (post.title.length > titleLength ? "..." : "")
                  : post.content.slice(0, titleLength) +
                    (post.content.length > titleLength ? "..." : "")}
              </Text>

              <Group position="apart">
                <Text c="gray" fz="xs">
                  {post.authorName}
                </Text>
                <Group spacing={5}>
                  <IconHeart color="pink" fill="pink" size={16} />
                  <Text c="gray" fz="xs">
                    {post.likes}
                  </Text>
                </Group>
              </Group>
            </Card>
          </Link>
        ))
      )}
    </Card>
  );
};

export default TrendingPosts;
