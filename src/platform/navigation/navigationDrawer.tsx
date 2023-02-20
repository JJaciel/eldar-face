import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Fade,
  Icon,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Stack,
  HStack,
  Heading,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { RiMenu3Fill, RiListCheck2 } from "react-icons/ri";

import { MenuIconButton } from "./menuIconButton";

interface NavigationDrawerProps {
  displayName?: string;
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  onSignout: () => void;
  isLargerThanMd: boolean;
}

export function NavidationDrawer({
  displayName,
  isOpen,
  onClose,
  onToggle,
  onSignout,
  isLargerThanMd,
}: NavigationDrawerProps) {
  const navigate = useNavigate();

  return (
    <Drawer
      autoFocus={false}
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      returnFocusOnClose={false}
    >
      <DrawerOverlay />
      <DrawerContent
        minW={{ base: "90vw", sm: "50vw", md: "300px" }}
        maxW={{ base: "90vw", sm: "50vw", md: "min" }}
        borderRightRadius={{ base: "3xl", md: "none" }}
        bgColor={"light.background.surface"}
      >
        <DrawerHeader
          h={{ base: 14, sm: 20 }}
          p={{ base: 2, sm: 4, md: 6 }}
          display="flex"
          alignContent="center"
          justifyContent="space-between"
        >
          <Fade
            in={isOpen}
            transition={{ enter: { delay: 0.3 }, exit: { delay: 0.3 } }}
          >
            <MenuIconButton
              onClick={onClose}
              aria-label="close menu"
              icon={<Icon as={RiMenu3Fill} />}
              bgColor={"light.primary.main"}
              color={"light.primary.onMain"}
              _hover={{
                bgColor: "light.primary.onHover",
                fontSize: "2xl",
                transitionDelay: 0.1,
              }}
            />
          </Fade>
        </DrawerHeader>
        <DrawerBody p={0}>
          <Stack display="block">
            {!isLargerThanMd && (
              <HStack
                p={6}
                spacing={4}
                h="5.5rem"
                bgColor="light.secondary.container"
                color="light.secondary.onContainer"
              >
                <Avatar
                  name={displayName}
                  transition="all 0.2s"
                  bgColor="light.secondary.main"
                  color="light.secondary.onMain"
                  boxShadow="lg"
                />
                <Stack alignItems="start" spacing={0}>
                  <Heading fontSize="lg">{displayName}</Heading>
                  <Button
                    variant="link"
                    fontSize="sm"
                    onClick={() => {
                      setTimeout(() => {
                        onToggle();
                        navigate("/account");
                      }, 200);
                    }}
                  >
                    Account
                  </Button>
                </Stack>
              </HStack>
            )}
            <Stack p={4}>
              <Box>
                <Button
                  variant="ghost"
                  width="full"
                  fontSize="lg"
                  bgColor="light.primary.main"
                  color="light.primary.onMain"
                  _focus={{ boxShadow: "none" }}
                  _hover={{
                    bg: "light.primary.onHover",
                    transitionDelay: 0.1,
                  }}
                  leftIcon={<Icon mr="4" as={RiListCheck2} />}
                  onClick={() => {
                    setTimeout(() => {
                      onToggle();
                      navigate("/");
                    }, 200);
                  }}
                >
                  <Text width="full" textAlign="left">
                    dashboard
                  </Text>
                </Button>
              </Box>
            </Stack>
          </Stack>
        </DrawerBody>
        <DrawerFooter justifyContent="center">
          <Button
            variant="ghost"
            width="full"
            fontSize="md"
            bgColor="light.secondary.main"
            color="light.secondary.onMain"
            _focus={{ boxShadow: "none" }}
            _hover={{
              bg: "light.secondary.onHover",
              transitionDelay: 0.1,
            }}
            onClick={onSignout}
          >
            <Text width="full" textAlign="center">
              Close session
            </Text>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
