import { createContext, useEffect, useRef, useState } from "react";
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
import { Outlet, useLocation } from "react-router-dom";
import { NavbarContent } from "./NavbarContent";
import AsideContent from "./AsideContent";
import { StompProvider } from "app/StompContext";
import FloatingActionButton from "./FloatingActionButton";
import { SseProvider } from "app/SseContext";

const headerLinks = [
  {
    link: "/home",
    label: "홈",
  },
  {
    link: "/people",
    label: "사람",
  },
  {
    link: "/chat",
    label: "채팅",
  },
  {
    link: "/notification",
    label: "알림",
  },
];

export default function Layout() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const location = useLocation();
  const isChatRoom =
    location.pathname.split("/")[1] === "chat" &&
    location.pathname.split("/")[2] !== undefined;

  return (
    // <SseProvider>
    //   <StompProvider>
    <AppShell
      styles={{
        main: {
          minHeight: 0,
          background:
            theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
          bg={theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white}
          withBorder={false}
        >
          <Navbar.Section grow mt="md">
            <NavbarContent />
          </Navbar.Section>
        </Navbar>
      }
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Aside
            p="md"
            hiddenBreakpoint="sm"
            width={{ sm: 200, lg: 300 }}
            bg={
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white
            }
            withBorder={false}
          >
            <AsideContent />
          </Aside>
        </MediaQuery>
      }
      footer={
        isChatRoom ? undefined : (
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Footer height={56}>
              <BottomNav links={headerLinks} />
            </Footer>
          </MediaQuery>
        )
      }
      header={
        <HeaderSearch links={headerLinks}>
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
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
    //   </StompProvider>
    // </SseProvider>
  );
}
