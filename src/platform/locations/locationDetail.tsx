import { Stack, Text } from "@chakra-ui/react";

interface ILocation {
  locationId: string;
  name: string;
  items: { itemId: string }[] | null;
}

export const LocationDetail = ({ location }: { location: ILocation }) => {
  console.log("location");
  console.log(location);
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
