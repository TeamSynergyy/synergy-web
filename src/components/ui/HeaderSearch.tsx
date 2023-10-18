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
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { ReactComponent as Logo } from "assets/logo.svg";
import { Link, useLocation } from "react-router-dom";
import { SearchInput } from "../search/SearchInput";
import { api } from "app/api";
import useAuth from "hooks/useAuth";

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
  const { classes, cx } = useStyles();
  const { removeAuth } = useAuth();

  const [opened, { open, close }] = useDisclosure(false);
  const isSearchPage = activePage === "search";

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
    <Header height={56} className={classes.header}>
      <div className={classes.inner}>
        {children}
        <Link
          to="/home"
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <Group mx="sm">
            <Logo width={28} />
            <Title size={"h3"}>Synergy</Title>
          </Group>
        </Link>

        <Group>
          <ActionIcon onClick={open} disabled={isSearchPage}>
            <IconSearch size="1.3rem" stroke={1.5} />
          </ActionIcon>

          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Group spacing={5}>
              {items}
              <Menu shadow="md" width={200} withinPortal>
                <Menu.Target>
                  <ActionIcon mx="sm">
                    <Avatar src={data?.avatar} size={32} radius="xl" />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Account</Menu.Label>
                  <Link
                    to={`/people/${data?.userId}`}
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <Menu.Item>내 프로필</Menu.Item>
                  </Link>
                  <Link
                    to={`/`}
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <Menu.Item onClick={removeAuth}>로그아웃</Menu.Item>
                  </Link>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </MediaQuery>
        </Group>
      </div>
      <Modal
        opened={opened}
        onClose={close}
        title="검색"
        size="100%"
        onSubmit={close}
      >
        <SearchInput />
      </Modal>
    </Header>
  );
}
