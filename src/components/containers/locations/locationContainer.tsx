import { Fade } from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";
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

const GET_LOCATION = gql`
  query GetLocation($locationId: String!) {
    location: getLocation(locationId: $locationId) {
      locationId
      name
      items {
        itemId
      }
      lists {
        listId
      }
    }
  }
`;

// to use centralized type
interface LocationObject {
  locationId: string;
  name: string;
  items: { itemId: string }[];
  lists: { listId: string }[];
}

export const LocationContainer = () => {
  const { locationId } = useParams();
  const { loading, error, data } = useQuery<{
    location: LocationObject;
  }>(GET_LOCATION, {
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
