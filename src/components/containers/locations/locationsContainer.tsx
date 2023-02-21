import { Fade } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { Outlet, useNavigate } from "react-router-dom";

import {
  PageContainer,
  Header,
  LoadingScreen,
  AddButton,
} from "../../common/display";
import { ErrorView } from "../../common/error";
import { NotFoundView } from "../../common/emptyState";
import { LocationsList } from "./locationsList";
import { GET_LOCATIONS } from "./locationsQueries";
import { Location } from "../../../types/location";

export const LocationsContainer = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery<{
    locations: Location[];
  }>(GET_LOCATIONS.query);

  const locations = data?.locations || [];

  if (!loading && !locations.length) {
    navigate("/setup");
    return null;
  }

  if (error) {
    return <ErrorView errorMessage={`Error loading locations`} />;
  }

  if (!loading && !locations.length) {
    return <NotFoundView message="Nothing to display" />;
  }

  return (
    <PageContainer>
      <LoadingScreen isLoading={loading} />
      <Header>Locations</Header>
      <Fade in={!loading}>
        <Outlet />
        <LocationsList locations={locations} />
      </Fade>

      <AddButton />
    </PageContainer>
  );
};
