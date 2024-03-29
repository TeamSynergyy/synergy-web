import {
  createStyles,
  Card,
  Avatar,
  Text,
  Button,
  rem,
  Progress,
  Stack,
  Title,
  HoverCard,
  Group,
  Modal,
  TextInput,
  Checkbox,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";

import { IconInfoCircle } from "@tabler/icons-react";
import { api } from "app/api";
import { useEffect } from "react";
import { EditUserInfoModal } from "./EditUserInfoModal";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  avatar: {
    border: `${rem(2)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }`,
  },
}));

interface UserCardImageProps {
  userId: string;
  backImage: string;
  profileImageUrl: string;
  username: string;
  major: string;
  temperature: number;
  bio: string;
}

export default function UserProfileCard({
  userId,
  backImage,
  profileImageUrl,
  username,
  major,
  temperature,
  bio,
}: UserCardImageProps) {
  const { classes, theme } = useStyles();
  const { data: myInfo } = api.useGetMyInfoQuery(null);
  const myId = myInfo?.userId || "";
  const myFollowing = api.useGetMyFollowingsQuery(null)?.data;
  const isFollowing = myFollowing?.includes(userId);
  console.log("🚀 ~ file: UserProfileCard.tsx:62 ~ isFollowing:", isFollowing);
  const followType = isFollowing ? "unfollow" : "follow";
  const [opened, { open, close }] = useDisclosure(false);

  const { refetch } = api.useGetFollowingPostsQuery("");

  const follow = api.useFollowMutation()[0];
  const handleFollow = async () => {
    try {
      const payload = await follow([userId, followType, myId]);
      refetch();
    } catch (error) {
      console.error("rejected", error);
    }
  };

  const isMe = myInfo?.userId !== userId;
  const form = useForm({
    initialValues: myInfo,

    validate: {
      username: (value) =>
        value && value.trim().length > 0 ? null : "필수입니다.",
    },
  });

  return (
    <>
      <Card withBorder padding="xl" radius="md" className={classes.card}>
        <Card.Section sx={{ backImage: `url(${backImage})`, height: 140 }} />
        <Stack align="flex-start" spacing={0} mb="md">
          <Avatar
            src={profileImageUrl}
            size={160}
            radius={80}
            mt={-30}
            className={classes.avatar}
          />
          <Title mt="sm">{username}</Title>
          <Text fz="sm" c="dimmed">
            {major}
          </Text>

          <Text fz="sm" mt="sm">
            {bio}
          </Text>
        </Stack>
        <HoverCard width={280} shadow="md" withArrow>
          <HoverCard.Target>
            <Group w="fit-content" my="xs" spacing="xs">
              <Text fz="sm" fw={600} td="underline">
                시너지 온도
              </Text>
              <IconInfoCircle size={18} />
            </Group>
          </HoverCard.Target>

          <HoverCard.Dropdown>
            <Text size="sm">
              프로젝트를 함께 한 팀원들과 매주 동료평가를 통해 산출한
              지표입니다. (기본값 36.5°)
            </Text>
          </HoverCard.Dropdown>
        </HoverCard>
        <Progress
          value={(temperature * 50) / 36.5}
          label={`${temperature}°C`}
          size="xl"
        />

        {isMe ? (
          <Button
            fullWidth
            radius="md"
            mt="xl"
            size="md"
            color={
              isFollowing
                ? "gray"
                : theme.colorScheme === "dark"
                ? undefined
                : "dark"
            }
            onClick={handleFollow}
          >
            {isFollowing ? "팔로우 취소" : "팔로우"}
          </Button>
        ) : (
          <Button
            fullWidth
            variant="outline"
            radius="md"
            mt="xl"
            size="md"
            onClick={open}
          >
            프로필 편집
          </Button>
        )}
      </Card>
      <EditUserInfoModal {...{ opened, close }} />
    </>
  );
}
