import { extendTheme } from "@chakra-ui/react";

const colors = {
  app: {
    primary: {
      100: "#F7F7F7",
      200: "#E1E1E1",
      300: "#C9C9C9",
      400: "#9B9B9B",
      500: "#3D3D3D",
    },
    secondary: {
      100: "#E6F0FB",
      200: "#C0D9F1",
      300: "#80BDE8",
      400: "#3E98D3",
      500: "#081E33",
    },
  },
};

const fonts = {
  heading: "Roboto, sans-serif",
  body: "Roboto Mono, sans-serif",
};

export const customTheme = extendTheme({
  colors,
  fonts,
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
    cssVarPrefix: "pjt",
  },
});
