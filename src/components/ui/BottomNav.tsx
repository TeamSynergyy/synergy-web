import { Avatar, createStyles, Group, rem } from "@mantine/core";
import { api } from "app/api";
import { ChatInput } from "components/chat/ChatInput";
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
  links: { link: string; label: string }[];
}

export function BottomNav({ links }: BottomNavProps) {
  const activePage = useLocation().pathname.split("/")[1];
  const { classes, cx } = useStyles();

  const { data } = api.useGetMyInfoQuery(null);

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: `/${activePage}` === link.link,
      })}
    >
      {link.label}
    </Link>
  ));

  return (
    <div className={classes.inner}>
      <Group w="100%" grow spacing={0}>
        {items}
        <Link to={`/people/${data?.id}`} className={cx(classes.link)}>
          <Avatar src={data?.avatar} size="sm" radius="xl" />
        </Link>
      </Group>
    </div>
  );
}
