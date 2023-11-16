import { createContext, useEffect, useRef, useState } from "react";
import {
  AppShell,
  Navbar,
  Footer,
  Aside,
  MediaQuery,
  Burger,
  useMantineTheme,
  Modal,
  TextInput,
  Button,
  Group,
} from "@mantine/core";
import { HeaderSearch } from "components/ui/HeaderSearch";
import { BottomNav } from "./BottomNav";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { NavbarContent } from "./NavbarContent";
import AsideContent from "./AsideContent";
import { StompProvider } from "app/StompContext";
import FloatingActionButton from "./FloatingActionButton";
import { SseProvider } from "app/SseContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
import { setNavbarOpen, toggleNavbar } from "./layoutSlice";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { api } from "app/api";
import { useForm } from "@mantine/form";
import { EditUserInfoModal } from "components/user/EditUserInfoModal";

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

  const { data: myInfo, isSuccess } = api.useGetMyInfoQuery(null);

  // if (isSuccess && !myInfo.organization)
  //   return (
  //     <EditUserInfoModal
  //       isSignup
  //       opened={true}
  //       close={() => navigate("/home/foryou")}
  //     />
  //   );

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
          p="xs"
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
            p="xs"
            hiddenBreakpoint="sm"
            width={{ sm: 200, lg: 300 }}
            bg={
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white
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
    //   </StompProvider>
    // </SseProvider>
  );
}
