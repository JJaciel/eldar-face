import { ChakraProvider } from "@chakra-ui/react";

import { Router } from "./router/router";

export const App = () => {
  return (
    <ChakraProvider>
      <Router />
    </ChakraProvider>
  );
};
