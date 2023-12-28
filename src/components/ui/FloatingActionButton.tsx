import { ActionIcon, Affix, Button, rem } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconPencilPlus, IconRocket } from "@tabler/icons-react";

import { Link, useLocation } from "react-router-dom";

export default function FloatingActionButton() {
  const matches = useMediaQuery("(min-width: 48em)");
  const location = useLocation();
  const pathArray = location.pathname.split("/");

  if (pathArray[1] !== "home") return;

  let linkTo = "/new/post";
  let icon = <IconPencilPlus size="1.5rem" />;

  if (pathArray.find((path) => path === "project")) {
    linkTo = "/new/project";
    icon = <IconRocket size="1.5rem" />;
  }

  return (
    <Affix position={{ bottom: rem(20 + (matches ? 0 : 56)), right: rem(20) }}>
      <Link to={linkTo}>
        <ActionIcon w={56} h={56} color="blue" variant="filled" radius="xl">
          {icon}
        </ActionIcon>
      </Link>
    </Affix>
  );
}
