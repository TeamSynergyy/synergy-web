import { useState } from "react";
import {
  IconGauge,
  IconFingerprint,
  IconChevronRight,
} from "@tabler/icons-react";
import { NavLink } from "@mantine/core";
import { Link, useParams } from "react-router-dom";

const data = [
  {
    icon: IconGauge,
    label: "최신 글",
    rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
    path: "/home/recent/post",
  },
  {
    icon: IconFingerprint,
    label: "최신 프로젝트",
    rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
    path: "/home/recent/project",
  },
];

export function ContentCategory() {
  const [active, setActive] = useState(0);

  return (
    <>
      {data.map((item, index) => (
        <Link
          to={item.path}
          key={item.label}
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <NavLink
            active={index === active}
            label={item.label}
            rightSection={item.rightSection}
            icon={<item.icon size="1rem" stroke={1.5} />}
            onClick={() => setActive(index)}
          />
        </Link>
      ))}
    </>
  );
}
