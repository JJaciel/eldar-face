import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Container, Box, Fade, Text } from "@chakra-ui/react";

import { useAuthContext } from "./authentication/useAuthContext";
import { Navigation } from "./navigation/navigation";

export function AppLayout() {
  const { user, isLoading } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  const isEmailVerified = user && user?.emailVerified;
  const authRoutes = ["/signup", "/signin", "/email-verification"];
  const isOnAuthRoute = authRoutes.includes(location.pathname);

  const tok = sessionStorage.getItem("token");

  useEffect(() => {
    if (isLoading) return;

    if (!user && !isOnAuthRoute) {
      navigate("/signin");
    }
  }, [isLoading, user, isOnAuthRoute, navigate]);

  return (
    <Box minH="100vh" bg="bg-white" display={"flex"} flexDir={"column"}>
      {!!user && <Navigation />}
      <Container my={"auto"} mx={0} p={0} maxW={"unset"} minW={"16em"}>
        <Fade in={!isLoading}>
          <Outlet />
        </Fade>
      </Container>
    </Box>
  );
}
