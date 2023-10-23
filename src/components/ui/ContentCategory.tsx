import {
  IconGauge,
  IconFingerprint,
  IconChevronRight,
} from "@tabler/icons-react";
import { NavLink } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleNavbar } from "./layoutSlice";

const data = [
  {
    icon: IconGauge,
    label: "최근 글",
    rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
    path: "/home/recent/post",
  },
  {
    icon: IconFingerprint,
    label: "최근 프로젝트",
    rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
    path: "/home/recent/project",
  },
];

export function ContentCategory() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleToggleNavbar = () => {
    dispatch(toggleNavbar());
  };

  return (
    <>
      {data.map((item) => (
        <Link
          to={item.path}
          key={item.label}
          style={{ color: "inherit", textDecoration: "inherit" }}
          onClick={handleToggleNavbar}
        >
          <NavLink
            active={item.path === pathname}
            label={item.label}
            rightSection={item.rightSection}
            icon={<item.icon size="1rem" stroke={1.5} />}
          />
        </Link>
      ))}
    </>
  );
}
