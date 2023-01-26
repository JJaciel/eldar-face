import { Outlet } from "react-router-dom";
import { Container, Box } from "@chakra-ui/react";

export function AppLayout() {
  return (
    <Box minH="100vh" bg="background.light" display={"flex"} flexDir={"column"}>
      <Container my={"auto"} mx={0} p={0} maxW={"unset"} minW={"16em"}>
        Layout
        <Outlet />
      </Container>
    </Box>
  );
}
