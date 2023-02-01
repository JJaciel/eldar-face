import { useCallback } from "react";
import { useDisclosure, useMediaQuery } from "@chakra-ui/react";

import { useAuthContext } from "../authentication/useAuthContext";
import { NavigationBar } from "./navigationBar";
import { NavidationDrawer } from "./navigationDrawer";

export function Navigation() {
  const [isLargerThanMd] = useMediaQuery("(min-width: 48em)");
  const { authUser, signout } = useAuthContext();
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  const onSignout = useCallback(() => {
    onToggle();
    signout();
  }, [onToggle, signout]);

  const userDisplayName = authUser?.email || "";

  return (
    <>
      <NavigationBar
        displayName={userDisplayName}
        isOpen={isOpen}
        onOpen={onOpen}
        onSignout={onSignout}
        isLargerThanMd={isLargerThanMd}
      />
      <NavidationDrawer
        displayName={userDisplayName}
        isOpen={isOpen}
        onClose={onClose}
        onToggle={onToggle}
        onSignout={onSignout}
        isLargerThanMd={isLargerThanMd}
      />
    </>
  );
}
