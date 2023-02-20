import React from "react";
import { Container } from "@chakra-ui/react";

export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      maxW="lg"
      p={4}
      minH="calc(100vh - 64px)"
    >
      {children}
    </Container>
  );
};
