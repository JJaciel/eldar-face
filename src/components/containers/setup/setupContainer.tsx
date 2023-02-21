import { Outlet, useOutletContext } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { PageContainer, LoadingScreen } from "../../common/display";
import { GET_SETUP_USER, GET_SETUP_LOCATIONS } from "./setupQueries";
import { User } from "../../../types/user";
import { SetupLocation } from "../../../types/location";

interface UserQueryResult {
  user: User | null;
  locations: SetupLocation[] | null;
}

interface LocationsQueryResult {
  user: User | null;
  locations: SetupLocation[] | null;
}

type OutletContextType = {
  user: User | null;
  locations: SetupLocation[];
};

export const SetupContainer = () => {
  const {
    loading: userQueryLoading,
    error: userQueryError,
    data: userData,
  } = useQuery<UserQueryResult>(GET_SETUP_USER.query);
  const {
    loading: locationsQueryLoading,
    error: locationsQueryError,
    data: locationsData,
  } = useQuery<LocationsQueryResult>(GET_SETUP_LOCATIONS.query);

  const isLoading = userQueryLoading || locationsQueryLoading;
  const user = userData?.user || null;
  const locations = locationsData?.locations || [];

  if (userQueryError || locationsQueryError) {
    return <PageContainer>Error setup</PageContainer>;
  }

  return (
    <PageContainer>
      <LoadingScreen isLoading={isLoading} />
      {!isLoading && <Outlet context={{ user, locations }} />}
    </PageContainer>
  );
};

export const useSetupContext = () => {
  return useOutletContext<OutletContextType>();
};
