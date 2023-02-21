import { Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { Header } from "../../common/display";
import { useLocationListsOutlet } from "../locations/locationLists";

export const Lists = () => {
  const navigate = useNavigate();
  const { lists } = useLocationListsOutlet();

  return (
    <>
      <Header>{`Lists: ${lists.length}`}</Header>
      <Stack>
        {lists.map(({ listId }) => {
          return (
            <Text
              onClick={() => {
                navigate(listId);
              }}
            >
              {listId}
            </Text>
          );
        })}
      </Stack>
    </>
  );
};
