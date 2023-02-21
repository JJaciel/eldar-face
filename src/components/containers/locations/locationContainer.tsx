import { Fade } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import {
  PageContainer,
  Header,
  Surface,
  LoadingScreen,
} from "../../common/display";
import { ErrorView } from "../../common/error";
import { NotFoundView } from "../../common/emptyState";
import { LocationDetail } from "./locationDetail";
import { GET_LOCATION } from "./locationsQueries";
import { Location } from "../../../types/location";

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
    <PageContainer>
      <LoadingScreen isLoading={loading} />
      <Header>Location</Header>
      <Fade in={!loading}>
        {location && (
          <Surface>
            <LocationDetail location={location} />
          </Surface>
        )}
      </Fade>
    </PageContainer>
  );
};
