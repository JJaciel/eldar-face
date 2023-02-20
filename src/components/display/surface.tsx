import React from "react";
import { Box } from "@chakra-ui/react";

export const Surface = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      p={4}
      bgColor="light.background.surface"
      color="light.background.onSurface"
      boxShadow={{ base: "none", sm: "md" }}
      borderRadius={{ base: "none", sm: "xl" }}
      // minH={{ base: "calc(100vh - 200px)", sm: "calc(100vh - 200px)" }}
      display="flex"
      flexDirection="column"
    >
      {children}
    </Box>
  );
};
