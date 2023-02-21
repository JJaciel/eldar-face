import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";

import { AuthProvider } from "./hooks/useAuthContext";
import { router } from "./router/router";
import { customTheme } from "./theme/chakra-custom-theme";

export const App = () => {
  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>
  );
};
