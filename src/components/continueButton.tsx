import { Flex, Icon, IconButton, IconButtonProps } from "@chakra-ui/react";
import { RiArrowRightSLine } from "react-icons/ri";

type ContinueButtonProps = IconButtonProps;

export const ContinueButton = (props: ContinueButtonProps) => {
  return (
    <Flex mt={4} justifyContent="end">
      <IconButton size="lg" icon={<Icon as={RiArrowRightSLine} />} {...props} />
    </Flex>
  );
};
