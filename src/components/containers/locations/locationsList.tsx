import { Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { Surface } from "../../common/display";

interface ILocation {
  locationId: string;
  name: string;
  items: { itemId: string; name: string }[] | null;
}

const LocationListItem = ({
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

export const LocationsList = ({ locations }: { locations: ILocation[] }) => {
  return (
    <Surface>
      {locations.map(({ locationId, name }) => {
        return (
          <LocationListItem
            key={locationId}
            locationId={locationId}
            locationName={name}
          />
        );
      })}
    </Surface>
  );
};
