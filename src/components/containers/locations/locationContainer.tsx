import { Fade } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { useParams, Outlet, useOutletContext } from "react-router-dom";

import { Header, LoadingScreen } from "../../common/display";
import { ErrorView } from "../../common/error";
import { NotFoundView } from "../../common/emptyState";
import { GET_LOCATION } from "./locationsQueries";
import { Location } from "../../../types/location";

type OutletContextType = {
  location: Location;
};

export const LocationContainer = () => {
  const { locationId } = useParams();
  const { loading, error, data } = useQuery<{
    location: Location;
  }>(GET_LOCATION.query, {
    variables: {
      locationId: locationId as string,
    },
  });

  if (error) {
    return (
      <ErrorView
        errorMessage={`Error loading location; locationId=${locationId}`}
      />
    );
  }

  const location = data?.location;

  if (!loading && !location) {
    return <NotFoundView />;
  }

  return (
    <>
      <LoadingScreen isLoading={loading} />
      <Header>Location</Header>
      <Fade in={!loading}>
        {location && (
          <Outlet
            context={{
              location,
            }}
          />
        )}
      </Fade>
    </>
  );
};

export const useLocationContext = () => {
  return useOutletContext<OutletContextType>();
};
