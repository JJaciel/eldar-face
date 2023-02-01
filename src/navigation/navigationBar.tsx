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
      bg={{ base: "transparent", md: "white" }}
      alignContent="center"
      justifyContent="space-between"
      w="100%"
      h={{ base: 14, sm: 20 }}
      p={{ base: 2, sm: 4, md: 6 }}
      pos={"absolute"}
      mt={0}
    >
      <Fade
        in={!isOpen}
        transition={{ enter: { delay: 0.3 }, exit: { delay: 0.3 } }}
      >
        <MenuIconButton
          onClick={onOpen}
          aria-label="open menu"
          icon={<Icon as={RiMenu2Fill} />}
          _hover={{
            bg: "gray.100",
            fontSize: "2xl",
            transitionDelay: 0.1,
          }}
        />
      </Fade>

      <HStack display="flex" alignItems="center">
        {isLargerThanMd && (
          <Menu>
            <Avatar
              as={MenuButton}
              name={displayName}
              transition="all 0.2s"
              color="app.primary.500"
              bg={"app.primary.200"}
              boxShadow="lg"
              _hover={{
                bg: "app.primary.300",
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
