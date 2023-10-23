import { LoadingOverlay, Space, Tabs } from "@mantine/core";
import { api } from "app/api";
import PostListByUser from "components/user/PostListByUser";
import UserProfileCard from "components/user/UserProfileCard";
import UserProfileInfo from "components/user/UserProfileInfo";

import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Profile() {
  const [activeTab, setActiveTab] = useState<string | null>("info");

  const id = useParams().id;
  if (!id) return <p>id가 없습니다.</p>;

  const { data: user, isFetching, isError, error } = api.useGetUserQuery(id);

  if (isFetching) return <LoadingOverlay visible />;
  if (isError) {
    console.error(error);
    return <p>error! check console.</p>;
  }

  let content;
  if (activeTab === "info") content = <UserProfileInfo userId={id} />;
  if (activeTab === "post") content = <PostListByUser userId={id} />;

  if (user)
    return (
      <>
        <UserProfileCard {...user} />
        <Space h="lg" />
        <Tabs value={activeTab} onTabChange={setActiveTab} defaultValue="info">
          <Tabs.List>
            <Tabs.Tab value="info">프로필</Tabs.Tab>
            <Tabs.Tab value="post">게시글</Tabs.Tab>
          </Tabs.List>
          {content}
        </Tabs>
      </>
    );

  return null;
}
