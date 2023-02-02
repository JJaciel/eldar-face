import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Container, Box, Fade } from "@chakra-ui/react";

import { useAuthContext } from "./authentication/useAuthContext";
import { Navigation } from "./platform/navigation/navigation";

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

  return (
    <Box minH="100vh" bg="bg-white" display={"flex"} flexDir={"column"}>
      {!!authUser && <Navigation />}
      <Container my={"auto"} mx={0} p={0} maxW={"unset"} minW={"16em"}>
        <Fade in={!isLoading}>
          <Outlet />
        </Fade>
      </Container>
    </Box>
  );
}
