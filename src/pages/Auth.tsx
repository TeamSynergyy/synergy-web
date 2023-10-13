import {
  Button,
  Image,
  Group,
  Paper,
  Text,
  Center,
  Stack,
} from "@mantine/core";
import Google from "assets/Google.svg";
import Naver from "assets/Naver.svg";
import Kakao from "assets/Kakao.svg";

export default function Auth() {
  const oauthProviderIds = ["Google", "Naver", "Kakao"];

  const hostUrl = import.meta.env.VITE_API_URL;

  const getSocialIcon = (providerId: string) => {
    switch (providerId) {
      case "Google":
        return Google;
      case "Naver":
        return Naver;
      case "Kakao":
        return Kakao;
    }
  };

  return (
    <Center h="100vh">
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" fw={500}>
          Welcome to Synergy, Login with
        </Text>

        <Stack mb="md" mt="md">
          {oauthProviderIds.map((providerId) => (
            <Button
              key={providerId}
              radius="xl"
              variant="default"
              leftIcon={<Image src={getSocialIcon(providerId)} />}
              onClick={() => {
                const url = `${hostUrl}/api/v1/oauth2/authorization/${providerId}?redirect_uri=${window.location.origin}/oauth/redirect`;
                fetch(url).then((response) => console.log(response));
              }}
            >
              {providerId}
            </Button>
          ))}
        </Stack>
      </Paper>
    </Center>
  );
}
