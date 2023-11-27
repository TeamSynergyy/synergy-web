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

  const { data: myInfo, isLoading } = api.useGetMyInfoQuery(null);

  if (!myInfo) {
    if (isLoading) return <div>loading...</div>;
    return <div>내 정보를 불러오지 못했습니다.</div>;
  }

  const { data: similarToLastVisitedProfileUsers } =
    api.useGetSimilarUsersQuery(lastVisitedProfileUser?.userId);

  const { data: similarToMeUsers } = api.useGetSimilarUsersQuery(myInfo.userId);

  const { data: sameOrganizationUsers } = myInfo.organization
    ? api.useSearchUsersQuery([myInfo.organization, 0])
    : { data: null };

  const { data: sameInterestsUsers } = myInfo.interestAreas
    ? api.useSearchUsersQuery([myInfo.interestAreas, 0])
    : { data: null };

  const { data: sameSkillsUsers } = myInfo.skills
    ? api.useSearchUsersQuery([myInfo.skills, 0])
    : { data: null };

  return (
    <Stack>
      {lastVisitedProfileUser && (
        <UserGrid
          title={`${lastVisitedProfileUser.username}와 비슷한 사람들`}
          users={similarToLastVisitedProfileUsers || []}
        />
      )}

      <UserGrid title="나와 비슷한 사람들" users={similarToMeUsers || []} />

      {myInfo.organization && (
        <UserGrid
          title={myInfo.organization}
          users={sameOrganizationUsers?.content || []}
        />
      )}
      {myInfo.interestAreas && (
        <UserGrid
          title={myInfo.interestAreas}
          users={sameInterestsUsers?.content || []}
        />
      )}
      {myInfo.skills && (
        <UserGrid
          title={myInfo.skills}
          users={sameSkillsUsers?.content || []}
        />
      )}
    </Stack>
  );
}
