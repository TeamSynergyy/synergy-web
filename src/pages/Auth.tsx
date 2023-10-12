import {
  useToggle,
  upperFirst,
  useDisclosure,
  useViewportSize,
} from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Checkbox,
  Anchor,
  Stack,
  LoadingOverlay,
  Center,
  Dialog,
  Image,
  UnstyledButton,
} from "@mantine/core";
import { api } from "app/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "app/authSlice";
import { GoogleIcon, FacebookIcon, NaverIcon, KakaoIcon } from "assets";

export default function Auth(props: PaperProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const oauthProviderIds = ["google", "facebook", "naver", "kakao"];

  const hostUrl = import.meta.env.VITE_API_URL;

  const getSocialIcon = (providerId: string) => {
    switch (providerId) {
      case "google":
        return GoogleIcon;
      case "facebook":
        return FacebookIcon;
      case "naver":
        return NaverIcon;
      case "kakao":
        return KakaoIcon;
    }
  };

  return (
    <Center h="100vh">
      <Stack>
        {oauthProviderIds.map((providerId) => (
          <Button
            onClick={() => {
              const url = `${hostUrl}/api/v1/oauth2/authorization/${providerId}?redirect_uri=${window.location.origin}/oauth/redirect`;
              fetch(url).then((response) => console.log(response));
            }}
          >
            {providerId}
          </Button>
        ))}
      </Stack>
    </Center>
  );
}
