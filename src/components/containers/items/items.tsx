import { Text, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { Header } from "../../common/display";
import { useLocationItemsOutlet } from "../locations/locationItems";

export const Items = () => {
  const navigate = useNavigate();
  const { items } = useLocationItemsOutlet();

  return (
    <>
      <Header>{`Items: ${items.length}`}</Header>
      <Stack>
        {items.map(({ itemId }) => {
          return (
            <Text
              onClick={() => {
                navigate(itemId);
              }}
            >
              {itemId}
            </Text>
          );
        })}
      </Stack>
    </>
  );
};
