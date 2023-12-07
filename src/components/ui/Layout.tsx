import {
  AppShell,
  Navbar,
  Footer,
  Aside,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import { HeaderSearch } from "components/ui/HeaderSearch";
import { BottomNav } from "./BottomNav";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { NavbarContent } from "./NavbarContent";
import AsideContent from "./AsideContent";
import FloatingActionButton from "./FloatingActionButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
import { toggleNavbar } from "./layoutSlice";

import { api } from "app/api";

import {
  IconBell,
  IconHome,
  IconMessage,
  IconUsers,
} from "@tabler/icons-react";
import { useEffect } from "react";
import { SseProvider } from "app/SseContext";
import { EditUserInfoModal } from "components/user/EditUserInfoModal";

const headerLinks = [
  {
    link: "/home",
    label: "홈",
    icon: <IconHome />,
  },
  {
    link: "/people",
    label: "사람",
    icon: <IconUsers />,
  },
  {
    link: "/chat",
    label: "채팅",
    icon: <IconMessage />,
  },
  {
    link: "/notification",
    label: "알림",
    icon: <IconBell />,
  },
];

export default function Layout() {
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const opened = useSelector((state: RootState) => state.layout.opened);

  const handleToggleNavbar = () => {
    dispatch(toggleNavbar());
  };

  const navigate = useNavigate();
  const location = useLocation();

  const isChatRoom =
    location.pathname.split("/")[1] === "chat" &&
    location.pathname.split("/")[2] !== undefined;

  useEffect(() => {
    if (opened) dispatch(toggleNavbar());
  }, [location.pathname]);

  const { data: myInfo, isSuccess } = api.useGetMyInfoQuery(null);

  if (isSuccess && !myInfo.organization)
    return (
      <EditUserInfoModal
        isSignup
        opened={true}
        close={() => navigate("/home/foryou")}
      />
    );

  return (
    //   <StompProvider>
    <SseProvider>
      <AppShell
        styles={{
          main: {
            minHeight: 0,
            background:
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
          },
        }}
        navbarOffsetBreakpoint="md"
        asideOffsetBreakpoint="md"
        navbar={
          <Navbar
            p="xs"
            hiddenBreakpoint="md"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
            bg={
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white
            }
            withBorder={false}
          >
            <Navbar.Section grow mt="md">
              <NavbarContent />
            </Navbar.Section>
          </Navbar>
        }
        aside={
          <MediaQuery smallerThan="md" styles={{ display: "none" }}>
            <Aside
              p="xs"
              hiddenBreakpoint="md"
              width={{ sm: 200, lg: 300 }}
              bg={
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.white
              }
              withBorder={false}
            >
              <Aside.Section grow mt="md">
                <AsideContent />
              </Aside.Section>
            </Aside>
          </MediaQuery>
        }
        footer={
          isChatRoom ? undefined : (
            <MediaQuery largerThan="md" styles={{ display: "none" }}>
              <Footer height={56}>
                <BottomNav links={headerLinks} />
              </Footer>
            </MediaQuery>
          )
        }
        header={
          <HeaderSearch links={headerLinks}>
            <MediaQuery largerThan="md" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={handleToggleNavbar}
                size="sm"
                color={theme.colors.gray[6]}
              />
            </MediaQuery>
          </HeaderSearch>
        }
      >
        <Outlet />
        <FloatingActionButton />
      </AppShell>
    </SseProvider>
    //   </StompProvider>
  );
}
