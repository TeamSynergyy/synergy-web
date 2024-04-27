import { createStyles, Group, ActionIcon, Text } from "@mantine/core";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { api } from "app/api";
import { selectIsLogin } from "app/authSlice";
import { useAppDispatch } from "app/store";
import { useSelector } from "react-redux";

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

  const isLogin = useSelector(selectIsLogin);

  const isLiked = api
    .useGetMyLikedPostsQuery(null)
    .data?.content.map((post) => post.postId)
    .includes(postId);
  const likeType = isLiked ? "post_unlike" : "post_like";

  const like = api.useLikePostMutation()[0];

  // 임시 추천 재학습
  const fitModel = api.useFitModelMutation()[0];
  const dispatch = useAppDispatch();

  const handleLike = async () => {
    const payload1 = await like([postId, likeType]);
    await fitModel(null);
    const patchCollection = dispatch(
      api.util.updateQueryData("getRecommendedPosts", "", (draftPosts) => {
        draftPosts.content = [];
      })
    );

    api.util.invalidateTags([{ type: "RecommendedPosts", id: "LIST" }]);
  };

  return (
    <Group>
      <ActionIcon
        onClick={handleLike}
        variant="default"
        radius="md"
        size={36}
        disabled={!isLogin}
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
