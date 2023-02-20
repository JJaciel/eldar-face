import { Fade } from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";
import { Outlet, useNavigate } from "react-router-dom";

import { PageContainer } from "../../components/pageContainer";
import { Header } from "../../components/header";
import { AddButton } from "../../components/addButton";
import { LocationsList } from "./locationsList";
import { LoadingScreen } from "../../components/loadingScreen";
import { ErrorView } from "../../components/error/errorView";
import { NotFoundView } from "../../components/emptyState/notFoundView";

const GET_LOCATIONS = gql`
  query GetLocations {
    locations: getLocations {
      locationId
      name
      items {
        itemId
        name
      }
    }
  }
`;

interface LocationObject {
  locationId: string;
  name: string;
  items: { itemId: string; name: string }[];
}

export const LocationsContainer = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery<{
    locations: LocationObject[];
  }>(GET_LOCATIONS);

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
