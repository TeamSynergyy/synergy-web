import {
  Modal,
  TextInput,
  Group,
  Button,
  Select,
  MultiSelect,
  Checkbox,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { api } from "app/api";
import { useState } from "react";
import { interestAreasData, majorsData, skillsData } from "utils/commonData";

export function EditUserInfoModal({
  opened,
  close,
  isSignup = false,
}: {
  opened: boolean;
  close: () => void;
  isSignup?: boolean;
}) {
  const [checked, setChecked] = useState(!isSignup);
  const { data: myInfo } = api.useGetMyInfoQuery(null);
  const editMyInfo = api.useEditMyInfoMutation()[0];

  const form = useForm({
    initialValues: myInfo && { ...myInfo },

    validate: {
      name: (value) =>
        value && value.trim().length > 0 ? null : "필수입니다.",
      organization: (value) =>
        value && value.trim().length > 0 ? null : "필수입니다.",
      minor: (value, values) => {
        if (!value) return null;
        if (!values.major) return "전공을 먼저 입력하세요.";
        if (value === values.major)
          return "전공과 복수/부전공은 달라야 합니다.";
      },
    },
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={isSignup ? "회원가입" : "프로필 편집"}
        centered
      >
        <form
          onSubmit={form.onSubmit((values) => {
            console.log(values);
            editMyInfo(values);
          })}
        >
          <TextInput
            label="이름"
            placeholder="사용할 이름을 입력하세요"
            withAsterisk
            {...form.getInputProps("name")}
          />
          <Select
            label="소속"
            placeholder="소속(대학)을 입력하세요"
            data={["서울과학기술대학교", "기타 소속"]}
            withAsterisk
            searchable
            clearable
            {...form.getInputProps("organization")}
          />
          <Select
            label="전공"
            placeholder="전공을 입력하세요"
            data={majorsData}
            searchable
            clearable
            {...form.getInputProps("major")}
          />
          <Select
            label="복수/부전공"
            placeholder="(선택)복수/부전공을 입력하세요"
            data={majorsData}
            searchable
            clearable
            {...form.getInputProps("minor")}
          />
          {/* <MultiSelect
            label="관심분야"
            placeholder="관심분야를 입력하세요"
            data={interestAreasData}
            searchable
            clearable
            {...form.getInputProps("interestAreas")}
          />
          <MultiSelect
            label="스킬"
            placeholder="스킬을 입력하세요"
            data={skillsData}
            searchable
            clearable
            {...form.getInputProps("skills")}
          /> */}
          <Select
            label="관심분야"
            placeholder="관심분야를 입력하세요"
            data={interestAreasData}
            searchable
            clearable
            {...form.getInputProps("interestAreas")}
          />
          <Select
            label="스킬"
            placeholder="스킬을 입력하세요"
            data={skillsData}
            searchable
            clearable
            {...form.getInputProps("skills")}
          />
          <TextInput
            label="자기소개"
            placeholder="자기소개를 입력하세요"
            {...form.getInputProps("bio")}
          />

          {isSignup && (
            <Checkbox
              mt="md"
              label="서비스 이용약관, 개인정보처리방침에 동의합니다."
              checked={checked}
              onChange={(event) => setChecked(event.currentTarget.checked)}
            />
          )}

          <Group position="right" mt="md">
            <Button type="submit" onClick={close} disabled={!checked}>
              {isSignup ? "회원가입" : "저장"}
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}
