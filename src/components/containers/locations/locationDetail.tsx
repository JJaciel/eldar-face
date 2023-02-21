import { Stack, Text } from "@chakra-ui/react";

import { useLocationContext } from "./locationContainer";

export const LocationDetail = () => {
  // location should come from ctx
  const { location } = useLocationContext();

  if (!location) return null;
  return (
    <Stack spacing={8}>
      {/* name */}
      <Text>{location.name}</Text>
      <Text>{location.locationId}</Text>
      <Text>{`items count: ${location.items?.length || 0}`}</Text>
    </Stack>
  );
};
