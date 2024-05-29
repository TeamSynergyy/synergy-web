import { Stack } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { api } from "app/api";
import UserGrid from "components/user/UserGrid";
import { User } from "types";

export default function People() {
  const [lastVisitedProfileUser, setLastVisitedProfileUser] =
    useLocalStorage<User>({
      key: "lastVisitedProfileUser",
    });

  const myInfoQuery = api.useGetMyInfoQuery(null);
  const similarToLastVisitedProfileUsersQuery = api.useGetSimilarUsersQuery(
    lastVisitedProfileUser?.userId || ""
  );
  const similarToMeUsersQuery = api.useGetSimilarUsersQuery(
    myInfoQuery.data?.userId || ""
  );
  const sameOrganizationUsersQuery = api.useSearchUsersQuery([
    myInfoQuery.data?.organization || "",
    0,
  ]);
  const sameInterestsUsersQuery = api.useSearchUsersQuery([
    myInfoQuery.data?.interestAreas || "",
    0,
  ]);
  const sameSkillsUsersQuery = api.useSearchUsersQuery([
    myInfoQuery.data?.skills || "",
    0,
  ]);

  if (!myInfoQuery.data) {
    if (myInfoQuery.isLoading) return <div>loading...</div>;
    return <div>내 정보를 불러오지 못했습니다.</div>;
  }

  return (
    <Stack>
      {lastVisitedProfileUser && (
        <UserGrid
          title={`${lastVisitedProfileUser.name}와 비슷한 사람들`}
          users={similarToLastVisitedProfileUsersQuery.data || []}
        />
      )}

      <UserGrid
        title="나와 비슷한 사람들"
        users={similarToMeUsersQuery.data || []}
      />

      {myInfoQuery.data.organization && (
        <UserGrid
          title={myInfoQuery.data.organization}
          users={sameOrganizationUsersQuery.data?.content || []}
        />
      )}
      {myInfoQuery.data.interestAreas && (
        <UserGrid
          title={myInfoQuery.data.interestAreas}
          users={sameInterestsUsersQuery.data?.content || []}
        />
      )}
      {myInfoQuery.data.skills && (
        <UserGrid
          title={myInfoQuery.data.skills}
          users={sameSkillsUsersQuery.data?.content || []}
        />
      )}
    </Stack>
  );
}
