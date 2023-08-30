import { Box, Paper, Tabs } from "@mantine/core";
import { SearchInput } from "components/search/SearchInput";
import SearchPostsResult from "components/search/SearchPostsResult";
import SearchProjectsResult from "components/search/SearchProjectsResult";

import SearchTotalResult from "components/search/SearchTotalResult";
import SearchUsersResult from "components/search/SearchUsersResult";
import { useState } from "react";

export default function Search() {
  const [activeTab, setActiveTab] = useState<string | null>("total");

  const handleTabChange = (tab: string) => setActiveTab(tab);

  let content;
  if (activeTab === "total")
    content = <SearchTotalResult handleTabChange={handleTabChange} />;
  if (activeTab === "post") content = <SearchPostsResult />;
  if (activeTab === "project") content = <SearchProjectsResult />;
  if (activeTab === "people") content = <SearchUsersResult />;

  return (
    <>
      <Paper
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

          backgroundColor: "white",
        })}
      >
        <SearchInput handleTabChange={handleTabChange} />

        <Tabs value={activeTab} onTabChange={setActiveTab} defaultValue="total">
          <Tabs.List>
            <Tabs.Tab value="total">전체</Tabs.Tab>
            <Tabs.Tab value="post">게시글</Tabs.Tab>
            <Tabs.Tab value="project">프로젝트</Tabs.Tab>
            <Tabs.Tab value="people">사람</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </Box>
      {content}
    </>
  );
}
