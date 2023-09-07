import { Stack, Text } from "@mantine/core";
import HomeTab from "components/ui/HomeTab";
export default function ForYou() {
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
