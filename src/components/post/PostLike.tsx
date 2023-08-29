import { createStyles, Group, ActionIcon, Text } from "@mantine/core";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { api } from "app/api";

const useStyles = createStyles((theme) => ({
  likesNumber: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray[6],
  },

  likeIcon: {
    color: theme.colors.red[6],
  },
}));

export default function PostLike({ id, likes }: { id: number; likes: number }) {
  const { classes } = useStyles();

  const isLiked = api.useGetMyLikedPostsQuery(null).data?.includes(id);

  const setToggleLike = api.useLikePostMutation()[0];

  return (
    <Group>
      <ActionIcon
        onClick={() => {
          setToggleLike(id);
        }}
        variant="default"
        radius="md"
        size={36}
      >
        {isLiked ? (
          <IconHeartFilled
            size="1.1rem"
            className={classes.likeIcon}
            stroke={1.5}
          />
        ) : (
          <IconHeart size="1.1rem" className={classes.likeIcon} stroke={1.5} />
        )}
      </ActionIcon>
      {likes > 0 ? (
        <Text className={classes.likesNumber}>좋아요 {likes}</Text>
      ) : null}
    </Group>
  );
}
