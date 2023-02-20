import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Container, Box, Fade } from "@chakra-ui/react";

import { useAuthContext } from "./components/authentication/useAuthContext";
import { Navigation } from "./components/navigation/navigation";

export function AppLayout() {
  const { authUser, isLoading } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  const isEmailVerified = !!authUser?.emailVerified;
  const authRoutes = ["/signup", "/signin", "/email-verification"];
  const isOnAuthRoute = authRoutes.includes(location.pathname);

  useEffect(() => {
    if (isLoading) return;

    if (!authUser && !isOnAuthRoute) {
      navigate("/signin");
    }
  }, [isLoading, authUser, isOnAuthRoute, navigate]);

  const shouldDisplayNavbar = !!authUser;

  return (
    <Box
      minH="100vh"
      bgColor="light.background.main"
      color="light.background.onMain"
    >
      {shouldDisplayNavbar && <Navigation />}
      <Container
        m={0}
        p={0}
        maxW={"unset"}
        minW={"18em"}
        pt={shouldDisplayNavbar ? "64px" : "unset"}
      >
        <Fade in={!isLoading}>
          <Outlet />
        </Fade>
      </Container>
    </Box>
  );
}
