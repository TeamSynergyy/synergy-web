import { Box, Tabs } from "@mantine/core";
import { useNavigate, useLocation } from "react-router-dom";

export default function HomeTab() {
  const navigate = useNavigate();
  const location = useLocation();
  const tabValue = location.pathname.split("/").at(-1);
  console.log(tabValue);

  return (
    <>
      <Box
        sx={() => ({
          position: "fixed",
          top: 56,
          left: 0,
          zIndex: 1,
          height: 16,
          width: "100%",
          backgroundColor: "white",
        })}
      />
      <Box
        sx={() => ({
          position: "sticky",
          top: 56 + 16,
          zIndex: 1,
          marginBottom: 16,
          backgroundColor: "white",
        })}
      >
        <Tabs
          value={tabValue}
          onTabChange={(value) => navigate(`/home/${value}`)}
        >
          <Tabs.List grow>
            <Tabs.Tab value="foryou">For You</Tabs.Tab>
            <Tabs.Tab value="following">Following</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </Box>
    </>
  );
}
