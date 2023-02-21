import React from "react";
import { Box, Heading } from "@chakra-ui/react";

export const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box p={{ base: "8px 16px", sm: "4" }} pl={{ sm: "0" }}>
      <Heading size={{ base: "lg", sm: "xl" }}>{children}</Heading>
    </Box>
  );
};
