import { Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { Header, Content } from "../../common/display";
import { useLocationsOutletContext } from "./locationsOutlet";

const LocationsListItem = ({
  locationId,
  locationName,
}: {
  locationId: string;
  locationName: string;
}) => {
  const navigate = useNavigate();
  return (
    <Box
      borderRadius={4}
      boxShadow="md"
      p={2}
      w="100%"
      bgColor="light.primary.container"
      onClick={() => {
        navigate(locationId);
      }}
    >
      <Text>{locationName}</Text>
    </Box>
  );
};

export const Locations = () => {
  const { locations } = useLocationsOutletContext();
  return (
    <>
      <Header>Locations</Header>
      <Content>
        {locations.map(({ locationId, name }) => {
          return (
            <LocationsListItem
              key={locationId}
              locationId={locationId}
              locationName={name}
            />
          );
        })}
      </Content>
    </>
  );
};
