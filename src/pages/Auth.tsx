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
  const host = import.meta.env.VITE_API_URL;

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      name: "",
      major: "",
      // terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
      name: (val) =>
        type === "register" && val.length < 1 ? "Invalid name" : null,
      major: (val) =>
        type === "register" && val.length < 1 ? "Invalid major" : null,
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async (
    email: string,
    password: string,
    name: string,
    major: string
  ) => {
    try {
      await axios.post(host + "/api/v1/users", {
        email,
        password,
        name,
        major,
      });
      // navigate("/auth/code?email=" + email);

      toggle();
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post(host + "/api/v1/users/login", {
        email,
        password,
      });

      const accessToken = response.headers["authorization"].split(" ")[1];
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
          onSubmit={form.onSubmit(({ email, password, name, major }) => {
            if (type === "register") {
              handleSignUp(email, password, name, major);
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

            {type === "register" && (
              <>
                <TextInput
                  required
                  label="이름"
                  placeholder="홍길동"
                  value={form.values.name}
                  onChange={(event) =>
                    form.setFieldValue("name", event.currentTarget.value)
                  }
                  error={form.errors.name && "Invalid name"}
                  radius="md"
                />
                <TextInput
                  required
                  label="전공"
                  placeholder="컴퓨터공학과"
                  value={form.values.major}
                  onChange={(event) =>
                    form.setFieldValue("major", event.currentTarget.value)
                  }
                  error={form.errors.major && "Invalid major"}
                  radius="md"
                />
              </>

              // <Checkbox
              //   label="I accept terms and conditions"
              //   checked={form.values.terms}
              //   onChange={(event) =>
              //     form.setFieldValue("terms", event.currentTarget.checked)
              //   }
              // />
            )}
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
