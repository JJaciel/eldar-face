import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";

import { AuthProvider } from "./authentication/useAuthContext";
import { router } from "./router/router";
import { customTheme } from "./config/chakra-custom-theme";

export const App = () => {
  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>
  );
};
