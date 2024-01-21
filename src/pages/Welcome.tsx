import {
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  Anchor,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import image from "assets/welcome.svg";
import classes from "./Welcome.module.css";
import { useNavigate } from "react-router-dom";

export function Welcome() {
  const navigate = useNavigate();

  const hostUrl = import.meta.env.VITE_API_URL;
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            <span className={classes.highlight}>Synergy</span>에 오신 것을
            환영합니다
            <br />: 팀 프로젝트 협업 SNS
          </Title>
          <Text c="dimmed" mt="md">
            Synergy는 프로젝트 협업과 소셜 네트워킹 방식을 혁신합니다. 팀
            프로젝트 참여와 관리가 쉬워집니다.
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck style={{ width: 12, height: 12 }} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>통합적 프로젝트 관리</b> - 모든 프로젝트를 한 곳에서 조직화하고
              추적 및 관리하세요.
            </List.Item>
            <List.Item>
              <b>향상된 커뮤니케이션</b> - 동료 평가 및 소셜 네트워킹 기능을
              통해 팀과 연결을 유지하세요.
            </List.Item>
          </List>

          <Group mt={30}>
            <Anchor
              href={`${hostUrl}/oauth2/authorization/google?redirect_uri=${window.location.origin}/oauth/redirect`}
            >
              <Button
                radius="xl"
                size="md"
                className={classes.control}
                onClick={() =>
                  navigate(
                    "/oauth2/authorization/google?redirect_uri=http://localhost:5173/oauth/redirect"
                  )
                }
              >
                구글 계정으로 시작하기
              </Button>
            </Anchor>
            <Button
              variant="default"
              radius="xl"
              size="md"
              className={classes.control}
              onClick={() => navigate("/home/recent/post")}
            >
              먼저 살펴보기
            </Button>
          </Group>
        </div>
        <Image src={image} className={classes.image} />
      </div>
    </Container>
  );
}
