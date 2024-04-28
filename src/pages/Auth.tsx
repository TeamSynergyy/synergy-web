import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Anchor,
  Stack,
  Center,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setAccessToken, setIsLogin } from "app/authSlice";
import { useDispatch } from "react-redux";

export default function Auth() {
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      // terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async (email: string, password: string) => {
    try {
      await axios.post("/api/v1/auth/register", {
        email,
        password,
      });
      navigate("/auth/code?email=" + email);
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });

      const accessToken = response.headers["access-token"];
      dispatch(setAccessToken(accessToken));
      dispatch(setIsLogin(true));
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Center w="100vw" h="100vh">
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" fw={500}>
          Welcome to Synergy, {type} with
        </Text>

        <form
          onSubmit={form.onSubmit(({ email, password }) => {
            if (type === "register") {
              handleSignUp(email, password);
            } else {
              handleLogin(email, password);
            }
          })}
        >
          <Stack>
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

            {/* {type === "register" && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
          )} */}
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              c="dimmed"
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
  );
}
