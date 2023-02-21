import {
  Box,
  Stack,
  HStack,
  Text,
  Tag,
  TagLabel,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { RiMoreLine } from "react-icons/ri";

import { CleaningItemMenu } from "./cleaningItemMenu";
import { Item } from "../../../types/item";

export const CleaningItems = ({ cleaningItems }: { cleaningItems: Item[] }) => {
  return (
    <Stack>
      {cleaningItems.map(({ title, area }, idx) => {
        return (
          <Box
            key={idx}
            p={1}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            borderRadius="lg"
            bgColor="light.primary.container"
            color="light.primary.onContainer"
            boxShadow="2px 2px 2px gray"
          >
            <HStack spacing={2}>
              <Text maxWidth="280px" pl={2}>
                {title}
              </Text>
              {!!area && (
                <Tag
                  size="sm"
                  borderRadius="full"
                  variant="solid"
                  bgColor="light.secondary.main"
                  color="light.secondary.onMain"
                >
                  <TagLabel>{area}</TagLabel>
                </Tag>
              )}
            </HStack>

            <CleaningItemMenu />
          </Box>
        );
      })}
    </Stack>
  );
};
