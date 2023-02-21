import { Text } from "@chakra-ui/react";

import { useLocationContext } from "./locationContainer";
import { Content } from "../../common/display";

export const LocationDetail = () => {
  // location should come from ctx
  const { location } = useLocationContext();

  if (!location) return null;
  return (
    <Content>
      {/* name */}
      <Text>{location.name}</Text>
      <Text>{location.locationId}</Text>
      <Text>{`items count: ${location.items?.length || 0}`}</Text>
    </Content>
  );
};
