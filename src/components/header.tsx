import React from "react";
import { Box, Heading } from "@chakra-ui/react";

export const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box py={{ base: "0", sm: "4" }} px={{ base: "4", sm: "10" }}>
      <Heading size={{ base: "lg", sm: "xl" }} textAlign={{ sm: "center" }}>
        {children}
      </Heading>
    </Box>
  );
};
