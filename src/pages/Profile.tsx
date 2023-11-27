import { LoadingOverlay, Space, Tabs } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { api } from "app/api";
import PostListByUser from "components/user/PostListByUser";
import UserGrid from "components/user/UserGrid";
import UserProfileCard from "components/user/UserProfileCard";
import UserProfileInfo from "components/user/UserProfileInfo";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "types";

export default function Profile() {
  const [activeTab, setActiveTab] = useState<string | null>("info");
  const [lastVisitedProfileUser, setLastVisitedProfileUser] =
    useLocalStorage<User>({
      key: "lastVisitedProfileUser",
    });

  const id = useParams().id;
  if (!id) return <p>id가 없습니다.</p>;

  const { data: user, isFetching, isError, error } = api.useGetUserQuery(id);
  const { data: myInfo } = api.useGetMyInfoQuery(null);
  const { data: similarUsers } = api.useGetSimilarUsersQuery(id);

  if (isFetching) return <LoadingOverlay visible />;
  if (isError) {
    console.error(error);
    return <p>error! check console.</p>;
  }

  if (user && id !== myInfo?.userId && id !== lastVisitedProfileUser?.userId)
    setLastVisitedProfileUser(user);

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
        {similarUsers && (
          <UserGrid
            title={`${user.username}와 비슷한 사람들`}
            users={similarUsers || []}
          />
        )}
      </>
    );

  return null;
}
