import {
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
} from "@mantine/core";
import { IconSearch, IconArrowRight } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useNavigate, useSearchParams } from "react-router-dom";

export function SearchInput({
  handleTabChange,
}: {
  handleTabChange?: (tab: string) => void;
}) {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const form = useForm({
    initialValues: {
      text: searchParams.get("query") || "",
    },
    validate: (values) => {
      const errors: Record<string, string> = {};

      if (!values.text.trim()) {
        errors.text = "Text is required";
      }

      return errors;
    },
  });

  const handleSend = (text: string) => {
    if (handleTabChange) handleTabChange("total");
    navigate(`/search?query=${text}`);
  };

  return (
    <form
      onSubmit={form.onSubmit((value) => {
        handleSend(value.text);
      })}
    >
      <TextInput
        {...form.getInputProps("text")}
        icon={<IconSearch size="1.1rem" stroke={1.5} />}
        size="md"
        placeholder="Search questions"
        rightSectionWidth={42}
        data-autofocus
      />
    </form>
  );
}
