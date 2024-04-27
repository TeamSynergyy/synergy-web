import { Button, Center, Paper, PinInput, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUpAuthCode() {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      code: "",
    },

    validate: {
      code: (val) =>
        val.length < 6 ? "Password should include at least 6 characters" : null,
    },
  });

  const handleSubmit = async (values: { code: string }) => {
    console.log(values.code); // 여기서 코드를 로그로 찍어봅니다.
    try {
      await axios.post("/api/v1/auth/verify", { code: values.code });
      navigate("/auth");
    } catch (error) {
      console.error("Sign up code error:", error);
    }
  };

  return (
    <Center w="100vw" h="100vh">
      <Paper radius="md" p="xl" withBorder>
        <Text>가입한 이메일에서 인증 코드를 확인 후 입력해주세요.</Text>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Center>
              <PinInput
                length={6}
                type="number"
                oneTimeCode
                required
                value={form.values.code}
                onChange={(value) => {
                  form.setFieldValue("code", value);
                }}
                error={!!form.errors.code}
                radius="md"
              />
            </Center>
            <Button type="submit" radius="xl">
              인증하기
            </Button>
          </Stack>
        </form>
      </Paper>
    </Center>
  );
}
