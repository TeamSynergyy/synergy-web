import {
  Card,
  Title,
  Text,
  Badge,
  ScrollArea,
  Group,
  Center,
  Button,
  useMantineTheme,
  createStyles,
  Box,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconHeart } from "@tabler/icons-react";
import { api } from "app/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colors.gray[0],
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
    "&:hover": {
      backgroundColor: theme.colors.gray[2],
    },
  },
}));

const MyProjects = () => {
  const { data: myInfo } = api.useGetMyInfoQuery(null);
  const { data, isLoading, isSuccess, isError, error } =
    api.useGetProjectsByUserQuery(myInfo?.userId || "");

  const { classes } = useStyles();
  const mediaQuery = useMediaQuery("(max-width: 1200px)");

  return (
    <Card shadow="sm" padding={!mediaQuery ? "md" : "xs"}>
      <Title order={5}>내 프로젝트</Title>

      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        data &&
        data.slice(0, 5)?.map((project, i) => (
          <Link
            to={`/project/${project.projectId}`}
            style={{ textDecoration: "none" }}
            key={i}
          >
            <Card className={classes.card} w="100%" p="xs" h="auto">
              <Text>{project.name}</Text>
            </Card>
          </Link>
        ))
      )}
    </Card>
  );
};

export default MyProjects;
