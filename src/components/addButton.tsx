import { Flex, Icon, IconButton } from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";

export const AddButton = () => {
  return (
    <Flex
      w="100%"
      h="100px"
      position="fixed"
      left={0}
      bottom={0}
      justifyContent="center"
      alignItems="center"
    >
      <IconButton
        aria-label="add"
        borderRadius="full"
        size="lg"
        icon={<Icon as={RiAddLine} />}
        bgColor="light.primary.main"
        color="light.primary.onMain"
        _hover={{
          bgColor: "light.primary.onHover",
        }}
      />
    </Flex>
  );
};
