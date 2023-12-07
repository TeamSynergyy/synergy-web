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
import ImageUploadCard from "components/ui/ImageUploadCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "types";

export default function NewPost() {
  const setCreatePost = api.useCreatePostMutation()[0];

  const [images, setImages] = useState<File[]>([]);

  const addImage = (image: File) => {
    setImages((prev) => [...prev, image]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

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
            const formData = new FormData();
            images.forEach((image) => {
              formData.append("files", image, image.name);
            });

            // 다른 필드들도 함께 추가
            formData.append("title", values.title);
            formData.append("content", values.content);

            try {
              await setCreatePost(formData).unwrap();
              navigate("/home/recent/post");
            } catch (e) {
              open();
              console.error(e);
            }

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

        <Group mt={10}>
          {Array.from({ length: 5 }).map((_, index) => (
            <ImageUploadCard
              key={index}
              visible={index <= images.length}
              imageFile={images[index]}
              onImageChange={(file) => addImage(file)}
              onImageRemove={() => removeImage(index)}
            />
          ))}
        </Group>

        <Group position="right" mt="md">
          <Button type="submit">작성</Button>
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
