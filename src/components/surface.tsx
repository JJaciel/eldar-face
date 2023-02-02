import React from "react";
import { Box } from "@chakra-ui/react";

export const Surface = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      py={{ base: "0", sm: "10" }}
      px={{ base: "4", sm: "10" }}
      bg={"transparent"}
      boxShadow={{ base: "none", sm: "md" }}
      borderRadius={{ base: "none", sm: "xl" }}
    >
      {children}
    </Box>
  );
};
