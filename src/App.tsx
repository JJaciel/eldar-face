import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./authentication/useAuthContext";

import { Router } from "./router/router";
import { customTheme } from "./config/chakra-custom-theme";

export const App = () => {
  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ChakraProvider>
  );
};
