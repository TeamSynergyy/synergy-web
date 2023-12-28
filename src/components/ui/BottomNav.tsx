import { Avatar, Badge, createStyles, Group, rem, Stack } from "@mantine/core";
import { api } from "app/api";
import { RootState } from "app/store";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  inner: {
    height: rem(56),
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  link: {
    display: "flex",
    justifyContent: "center",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface BottomNavProps {
  links: { link: string; label: string; icon: JSX.Element }[];
}

export function BottomNav({ links }: BottomNavProps) {
  const location = useLocation();
  const { data } = api.useGetMyInfoQuery(null);
  const messageEvents = useSelector(
    (state: RootState) => state.sse.messageEvents
  );
  const isNotiExist = messageEvents.length > 0;

  const activePage = location.pathname.split("/")[1];
  const isMyProfile =
    activePage === "people" && location.pathname.split("/")[2] === data?.userId;
  const { classes, cx } = useStyles();

  const items = links.map((link) => {
    const isNotiLink = link.label === "알림";

    return (
      <div key={link.label}>
        <Link
          to={link.link}
          className={cx(classes.link, {
            [classes.linkActive]:
              !isMyProfile && `/${activePage}` === link.link,
          })}
        >
          <Stack
            align="center"
            spacing={2}
            pos={isNotiLink ? "relative" : "inherit"}
          >
            {link.icon}
            {link.label}
            {isNotiExist && isNotiLink && (
              <Badge
                pos="absolute"
                top={5}
                right={0}
                sx={{
                  transform: "translate(50%, -50%)",
                }}
                color="red"
                variant="filled"
                size="sm"
                p={4.5}
              >
                {messageEvents.length}
              </Badge>
            )}
          </Stack>
        </Link>
      </div>
    );
  });

  return (
    <div className={classes.inner}>
      <Group w="100%" grow spacing={0}>
        {items}
        <Link
          to={`/people/${data?.userId}`}
          className={cx(classes.link, {
            [classes.linkActive]: isMyProfile,
          })}
        >
          <Stack align="center" spacing={2}>
            <Avatar src={data?.profileImageUrl} size={24} radius="xl" />
            프로필
          </Stack>
        </Link>
      </Group>
    </div>
  );
}
