import { Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

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
      {locations.map(({ locationId, name }) => {
        return (
          <LocationsListItem
            key={locationId}
            locationId={locationId}
            locationName={name}
          />
        );
      })}
    </>
  );
};
