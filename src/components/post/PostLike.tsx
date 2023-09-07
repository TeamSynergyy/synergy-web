import { createStyles, Group, ActionIcon, Text } from "@mantine/core";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { api } from "app/api";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  likesNumber: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray[6],
  },

  likeIcon: {
    color: theme.colors.red[6],
  },
}));

export default function PostLike({
  postId,
  likes,
}: {
  postId: number;
  likes: number;
}) {
  const { classes } = useStyles();

  const isLiked = api
    .useGetMyLikedPostsQuery(null)
    .data?.postIds.includes(postId);
  const likeType = isLiked ? "unlike" : "like";

  const like = api.useLikePostMutation()[0];

  const [tempLikes, setTempLikes] = useState(likes);
  const handleLike = () => {
    isLiked ? setTempLikes(tempLikes - 1) : setTempLikes(tempLikes + 1);
    like([postId, likeType]);
  };

  return (
    <Group>
      <ActionIcon onClick={handleLike} variant="default" radius="md" size={36}>
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
      {tempLikes > 0 ? (
        <Text className={classes.likesNumber}>좋아요 {tempLikes}</Text>
      ) : null}
    </Group>
  );
}
