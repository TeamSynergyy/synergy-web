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
      username: (value) =>
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
            {...form.getInputProps("username")}
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

const majorsData = [
  "기계시스템디자인공학과",
  "기계ㆍ자동차공학과",
  "안전공학과",
  "신소재공학과",
  "건설시스템공학과",
  "건축학부(건축공학전공)",
  "건축학부(건축학전공)",
  "전기정보공학과",
  "전자공학과",
  "컴퓨터공학과",
  "스마트ICT융합공학과",
  "화공생명공학과",
  "환경공학과",
  "식품공학과",
  "정밀화학과",
  "스포츠과학과",
  "안경광학과",
  "디자인학과(산업디자인전공)",
  "디자인학과(시각디자인전공)",
  "도예학과",
  "금속공예디자인학과",
  "조형예술학과",
  "행정학과",
  "영어영문학과",
  "문예창작학과",
  "산업공학과(산업정보시스템전공)",
  "산업공학과(ITM전공)",
  "MSDE학과",
  "경영학과(경영학전공)",
  "경영학과(글로벌테크노경영전공)",
  "인공지능응용학과",
  "지능형반도체공학과",
  "미래에너지융합학과",
  "기타 전공",
];

const interestAreasData = [
  "플랫폼",
  "라이프스타일",
  "금융",
  "소셜",
  "미디어",
  "교육",
  "생산성",
  "블록체인",
  "노코드",
  "인공지능",
  "커뮤니티",
  "분석",
  "디자인",
  "개발",
  "마케팅",
  "게임",
  "이커머스",
  "헬스케어",
  "바이오",
  "메타버스",
  "세일즈",
  "보안",
  "ESG",
  "임베디드",
  "영어",
  "컴퓨터과학",
  "공학",
  "생명과학",
  "사회과학",
  "경영/경제",
  "의학",
  "인문학",
  "법학",
  "교육학",
  "커뮤니케이션/미디어",
  "환경과학",
  "농학/식품과학",
  "체육/스포츠과학",
  "음악/공연예술",
];

const skillsData = [
  "프로그래밍",
  "Python",
  "Java",
  "JavaScript",
  "Clang",
  "C++",
  "C#",
  "Go",
  "React",
  "Vue.js",
  "Angular",
  "Spring",
  "Node.js",
  "Django",
  "Flask",
  "Ruby on Rails",
  "Swift",
  "Kotlin",
  "Flutter",
  "프론트엔드 개발",
  "백엔드 개발",
  "Android 개발",
  "iOS 개발",
  "데이터 분석/통계",
  "SQL",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "Firebase",
  "Oracle Database",
  "UI/UX 디자인",
  "Figma",
  "Sketch",
  "Adobe XD",
  "그래픽 디자인",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Adobe InDesign",
  "Canva",
  "비디오 편집/제작",
  "Adobe Premiere Pro",
  "Final Cut Pro",
  "DaVinci Resolve",
  "글쓰기/편집",
  "프레젠테이션/커뮤니케이션",
  "프로젝트 관리/조직화",
  "Trello",
  "Asana",
  "Jira",
  "Slack",
  "리더십/팀워크",
  "연구/정보 검색",
  "문제해결/비판적 사고",
];
