import {
  Button,
  Image,
  Group,
  Paper,
  Text,
  Center,
  Stack,
} from "@mantine/core";
import axios from "axios";
import Google from "assets/Google.svg";
import Naver from "assets/Naver.svg";
import Kakao from "assets/Kakao.svg";

export default function Auth() {
  const oauthProviderIds = ["google", "naver", "kakao"];

  const hostUrl = import.meta.env.VITE_API_URL;

  const getSocialIcon = (providerId: string) => {
    switch (providerId) {
      case "google":
        return Google;
      case "naver":
        return Naver;
      case "kakao":
        return Kakao;
    }
  };

  return (
    <Center h="100vh">
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" fw={500}>
          Welcome to Synergy, Continue with
        </Text>

        <Stack mb="md" mt="md">
          {oauthProviderIds.map((providerId) => (
            <Button
              key={providerId}
              radius="xl"
              variant="default"
              leftIcon={<Image src={getSocialIcon(providerId)} />}
              onClick={() => {
                const url = `${hostUrl}/oauth2/authorization/${providerId}?redirect_uri=${window.location.origin}/oauth/redirect`;
                axios.get(url).then((response) => console.log(response));
              }}
            >
              {providerId.charAt(0).toUpperCase() + providerId.slice(1)}
            </Button>
          ))}
        </Stack>
      </Paper>
    </Center>
  );
}
