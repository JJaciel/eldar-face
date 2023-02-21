import React from "react";
import { Stack } from "@chakra-ui/react";

export const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack p={{ base: "8px 16px", sm: "4" }} pl={{ sm: "0" }}>
      {children}
    </Stack>
  );
};
