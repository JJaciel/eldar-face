import {
  Fade,
  Icon,
  HStack,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Flex,
} from "@chakra-ui/react";
import { RiMenu2Fill } from "react-icons/ri";

import { MenuIconButton } from "./menuIconButton";
import { useNavigate } from "react-router-dom";

interface NavigationBarProps {
  displayName?: string;
  isOpen: boolean;
  onOpen: () => void;
  onSignout: () => void;
  isLargerThanMd: boolean;
}

export function NavigationBar({
  displayName,
  isOpen,
  onOpen,
  onSignout,
  isLargerThanMd,
}: NavigationBarProps) {
  const navigate = useNavigate();
  return (
    <Box
      as="nav"
      display="flex"
      boxShadow="0 6px 16px -6px grey;"
      alignContent="center"
      justifyContent="space-between"
      w="100%"
      h={16}
      p={2}
      bgColor="light.background.main"
      zIndex="sticky"
      position="fixed"
      top={0}
    >
      <Fade
        in={!isOpen}
        transition={{ enter: { delay: 0.3 }, exit: { delay: 0.3 } }}
      >
        <Flex h="100%" alignItems="center">
          <MenuIconButton
            onClick={onOpen}
            aria-label="open menu"
            icon={<Icon as={RiMenu2Fill} />}
            bgColor="light.primary.main"
            color="light.primary.onMain"
            _hover={{
              bgColor: "light.primary.onHover",
              fontSize: "2xl",
              transitionDelay: 0.1,
            }}
          />
        </Flex>
      </Fade>

      <HStack display="flex" alignItems="center">
        {isLargerThanMd && (
          <Menu>
            <Avatar
              as={MenuButton}
              name={displayName}
              transition="all 0.2s"
              bgColor="light.primary.main"
              color="light.primary.onMain"
              boxShadow="lg"
              _hover={{
                bgColor: "light.primary.onHover",
                boxShadow: "xl",
              }}
            />
            <MenuList>
              <MenuItem onClick={() => navigate("/account")}>Account</MenuItem>
              <MenuItem onClick={onSignout}>Close session</MenuItem>
            </MenuList>
          </Menu>
        )}
      </HStack>
    </Box>
  );
}
