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
} from "@mantine/core";
import { api } from "app/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "app/authSlice";

export default function Auth(props: PaperProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const setRegister = api.useRegisterMutation()[0];
  const [login, { isLoading }] = api.useLoginMutation();
  const { height } = useViewportSize();
  const [type, toggle] = useToggle(["login", "register"]);
  const [loadingOverlayVisible, { open, close }] = useDisclosure(false);
  const [dialogOpened, { open: dialogOpen, close: dialogClose }] =
    useDisclosure(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  return (
    <>
      <Center h={height}>
        <Paper radius="md" p="xl" withBorder {...props}>
          <Text size="lg" weight={500}>
            Welcome to Synergy, {type} with
          </Text>

          <form
            onSubmit={form.onSubmit(async (credentials) => {
              open();
              dialogClose();
              if (type === "register") {
                try {
                  await setRegister(credentials).unwrap();
                  setDialogMessage("✅ 회원가입 성공. 로그인 하세요");
                  dialogOpen();
                  toggle();
                } catch (error) {
                  setDialogMessage(
                    "❌ 회원가입 실패. 잠시 후 다시 시도해주세요"
                  );
                  dialogOpen();
                  console.error("rejected", error);
                }
              }
              if (type === "login") {
                try {
                  const { token } = await login(credentials).unwrap();
                  dispatch(setCredentials({ token }));
                  return navigate("/");
                } catch (error) {
                  setDialogMessage("❌ 로그인 실패");
                  dialogOpen();
                  console.error("rejected", error);
                }
              }

              close();
            })}
          >
            <LoadingOverlay visible={loadingOverlayVisible} overlayBlur={2} />
            <Stack>
              {type === "register" && (
                <TextInput
                  label="Name"
                  placeholder="Your name"
                  // value={form.values.name}
                  onChange={(event) =>
                    form.setFieldValue("name", event.currentTarget.value)
                  }
                  radius="md"
                />
              )}

              <TextInput
                required
                label="Email"
                placeholder="hello@mantine.dev"
                value={form.values.email}
                onChange={(event) =>
                  form.setFieldValue("email", event.currentTarget.value)
                }
                error={form.errors.email && "Invalid email"}
                radius="md"
              />

              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                value={form.values.password}
                onChange={(event) =>
                  form.setFieldValue("password", event.currentTarget.value)
                }
                error={
                  form.errors.password &&
                  "Password should include at least 6 characters"
                }
                radius="md"
              />

              {type === "register" && (
                <Checkbox
                  label="I accept terms and conditions"
                  // checked={form.values.terms}
                  onChange={(event) =>
                    form.setFieldValue("terms", event.currentTarget.checked)
                  }
                />
              )}
            </Stack>

            <Group position="apart" mt="xl">
              <Anchor
                component="button"
                type="button"
                color="dimmed"
                onClick={() => toggle()}
                size="xs"
              >
                {type === "register"
                  ? "Already have an account? Login"
                  : "Don't have an account? Register"}
              </Anchor>
              <Button type="submit" radius="xl">
                {upperFirst(type)}
              </Button>
            </Group>
          </form>
        </Paper>
      </Center>

      <Dialog
        opened={dialogOpened}
        withCloseButton
        onClose={dialogClose}
        size="lg"
        radius="md"
      >
        <Text size="sm" weight={500}>
          {dialogMessage}
        </Text>
      </Dialog>
    </>
  );
}
