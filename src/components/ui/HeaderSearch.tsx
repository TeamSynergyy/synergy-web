import {
  createStyles,
  Header,
  Group,
  rem,
  Title,
  MediaQuery,
  ActionIcon,
  Avatar,
  Menu,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { ReactComponent as Logo } from "assets/logo.svg";
import { Link, useLocation } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: rem(56),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  link: {
    display: "block",
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

interface HeaderSearchProps {
  links: { link: string; label: string }[];
  children: React.ReactNode;
}

export function HeaderSearch({ links, children }: HeaderSearchProps) {
  const activePage = useLocation().pathname.split("/")[1];
  console.log(activePage);
  const { classes, cx } = useStyles();

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
    <Header height={56} className={classes.header}>
      <div className={classes.inner}>
        {children}
        <Group>
          <Logo width={28} />
          <Title size={"h3"}>Synergy</Title>
        </Group>

        <Group>
          <ActionIcon>
            <IconSearch size="1.25rem" stroke={1.5} />
          </ActionIcon>

          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Group spacing={5}>
              {items}
              <Menu shadow="md" width={200} withinPortal>
                <Menu.Target>
                  <Avatar radius="xl" />
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Account</Menu.Label>
                  <Menu.Item>내 프로필</Menu.Item>
                  <Menu.Item>로그아웃</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </MediaQuery>
        </Group>
      </div>
    </Header>
  );
}
