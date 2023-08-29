import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { api } from "app/api";

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.xs,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}));

interface UserButtonProps extends UnstyledButtonProps {
  userId: number;
  icon?: React.ReactNode;
}

export function UserButton({ userId, icon, ...others }: UserButtonProps) {
  const { classes } = useStyles();

  const { data, isLoading, isError, error } = api.useGetUserQuery(userId);

  if (isLoading) return <p>"Loading..."</p>;
  if (isError) {
    console.error(error);
    return <p>error! check the console message</p>;
  }
  if (!data) return <p>대화 상대방의 데이터를 불러오지 못했습니다.</p>;

  const { name, image } = data;

  return (
    <UnstyledButton className={classes.user} {...others}>
      <Group spacing="xs">
        <Avatar src={image} radius="xl" />
        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs" lineClamp={1}>
            최근 메세지 들어갈 자리
          </Text>
        </div>

        {icon || <IconChevronRight size="0.9rem" stroke={1.5} />}
      </Group>
    </UnstyledButton>
  );
}
