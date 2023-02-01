import { Outlet } from "react-router-dom";
import { Fade } from "@chakra-ui/react";

import { useAuthContext } from "./authentication/useAuthContext";
import { UserProvider } from "./useUserContext";

export function UserLayout() {
  const { authUser } = useAuthContext();

  return (
    <UserProvider userId={authUser?.userId || "ss"}>
      <Fade in={!!authUser}>
        <Outlet />
      </Fade>
    </UserProvider>
  );
}
