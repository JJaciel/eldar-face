import React from "react";
import { Container } from "@chakra-ui/react";

export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "4", sm: "8" }}
    >
      {children}
    </Container>
  );
};
