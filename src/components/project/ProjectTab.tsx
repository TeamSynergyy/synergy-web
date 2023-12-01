import { Box, Tabs } from "@mantine/core";
import { useNavigate, useLocation } from "react-router-dom";

export default function ProjectTab({ projectId }: { projectId: number }) {
  const navigate = useNavigate();
  const location = useLocation();
  const tabValue = location.pathname.split("/project/").at(-1);
  console.log(tabValue);

  return (
    <Box mb="md">
      <Tabs
        value={tabValue}
        onTabChange={(value) => navigate(`/project/${value}`)}
      >
        <Tabs.List>
          <Tabs.Tab value={`${projectId}`}>프로젝트</Tabs.Tab>
          <Tabs.Tab value={`${projectId}/notice`}>공지사항</Tabs.Tab>
          <Tabs.Tab value={`${projectId}/schedule`}>일정</Tabs.Tab>
          <Tabs.Tab value={`${projectId}/task`}>작업</Tabs.Tab>
          <Tabs.Tab value={`${projectId}/peer-rating`}>동료 평가</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </Box>
  );
}
