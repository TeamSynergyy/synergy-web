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
  id: string;
  backgroundImage: string;
  avatar: string;
  name: string;
  major: string;
  temperature: number;
  bio: string;
}

export default function UserProfileCard({
  id,
  backgroundImage,
  avatar,
  name,
  major,
  temperature,
  bio,
}: UserCardImageProps) {
  const { classes, theme } = useStyles();
  const { data: myInfo } = api.useGetMyInfoQuery(null);
  const myFollowing = myInfo?.followingIds;
  const isFollowing = myFollowing?.includes(id);
  const followType = isFollowing ? "unfollow" : "follow";
  const editMyInfo = api.useEditMyInfoMutation()[0];
  const [opened, { open, close }] = useDisclosure(false);
  const follow = api.useFollowMutation()[0];
  const handleFollow = () => {
    follow([id, followType]);
  };

  const isMe = myInfo?.id !== id;
  const form = useForm({
    initialValues: { ...myInfo },

    validate: {
      name: (value) =>
        value && value.trim().length > 0 ? null : "필수입니다.",
    },
  });

  return (
    <>
      <Card withBorder padding="xl" radius="md" className={classes.card}>
        <Card.Section
          sx={{ backgroundImage: `url(${backgroundImage})`, height: 140 }}
        />
        <Stack align="flex-start" spacing={0} mb="md">
          <Avatar
            src={avatar}
            size={160}
            radius={80}
            mt={-30}
            className={classes.avatar}
          />
          <Title mt="sm">{name}</Title>
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
      <Modal opened={opened} onClose={close} title="프로필 편집" centered>
        <form onSubmit={form.onSubmit((values) => editMyInfo(values))}>
          <TextInput
            label="이름"
            placeholder="사용할 이름을 입력하세요"
            {...form.getInputProps("name")}
          />
          <TextInput
            label="전공"
            placeholder="전공을 입력하세요"
            {...form.getInputProps("major")}
          />
          <TextInput
            label="자기소개"
            placeholder="자기소개를 입력하세요"
            {...form.getInputProps("bio")}
          />
          <TextInput
            label="배경 이미지 주소"
            placeholder="배경 이미지 주소을 입력하세요"
            {...form.getInputProps("backgroundImage")}
          />

          <TextInput
            label="프로필 사진 주소"
            placeholder="사용할 프로필 사진 주소를 입력하세요"
            {...form.getInputProps("avatar")}
          />

          <Group position="right" mt="md">
            <Button type="submit" onClick={close}>
              저장
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}
