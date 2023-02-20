import { Outlet, useOutletContext } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

import { PageContainer } from "../../components/pageContainer";
import { LoadingScreen } from "../../components/loadingScreen";

const GET_USER_DATA = gql`
  query GetUserData {
    user: getUser {
      username
    }
    locations: getLocations {
      locationId
      items {
        itemId
      }
      lists {
        listId
      }
    }
  }
`;

type UserType = { username: string | null };
type ItemType = { itemId: string };
type ListType = { listId: string };
type LocationType = {
  locationId: string;
  items: ItemType[] | null;
  lists: ListType[] | null;
};

interface QueryResult {
  user: UserType | null;
  locations: LocationType[] | null;
}

type OutletContextType = {
  user: UserType | null;
  locations: LocationType[];
};

export const SetupContainer = () => {
  const { loading, error, data } = useQuery<QueryResult>(GET_USER_DATA);

  const user = data?.user || null;
  const locations = data?.locations || [];

  if (error) {
    return (
      <PageContainer>
        <LoadingScreen isLoading={loading} />
        Error setup
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <LoadingScreen isLoading={loading} />
      {!loading && <Outlet context={{ user, locations }} />}
    </PageContainer>
  );
};

export const useSetupContext = () => {
  return useOutletContext<OutletContextType>();
};
