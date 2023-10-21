import {
  TextInput,
  Button,
  Group,
  Textarea,
  Dialog,
  Text,
  Flex,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { api } from "app/api";
import { useNavigate } from "react-router-dom";

export default function NewPost() {
  const setCreatePost = api.useCreatePostMutation()[0];

  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      title: "",
      content: "",
    },
  });

  return (
    <>
      <Flex justify="flex-end" align="center" gap="sm">
        <Text size="sm" c="gray">
          또는
        </Text>
        <Button
          size="sm"
          variant="subtle"
          onClick={() => navigate("/new/project")}
        >
          새 프로젝트
        </Button>
      </Flex>
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            await setCreatePost(values).unwrap();
            navigate("/home/recent/post");
          } catch (e) {
            open();
            console.error(e);
          }
        })}
      >
        <TextInput
          label="title"
          placeholder="Title"
          {...form.getInputProps("title")}
        />

        <Textarea
          required
          label="content"
          placeholder="content"
          {...form.getInputProps("content")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
      <Dialog
        opened={opened}
        withCloseButton
        onClose={close}
        size="lg"
        radius="md"
      >
        <Text size="sm" weight={500}>
          🚨 글 작성에 실패했습니다.
        </Text>
      </Dialog>
    </>
  );
}
