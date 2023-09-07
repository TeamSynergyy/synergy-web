import { Stack, Text } from "@mantine/core";
import { SseContext } from "app/SseContext";
import HomeTab from "components/ui/HomeTab";
import { useContext } from "react";
import { Link } from "react-router-dom";
export default function ForYou() {
  const es = useContext(SseContext);
  console.log(es);
  return (
    <>
      <HomeTab />
      <Stack
        mih={300}
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
        })}
        align="center"
      >
        <Text> 개발중 </Text>
      </Stack>
    </>
  );
}
