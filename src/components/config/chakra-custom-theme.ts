import { extendTheme, ComponentStyleConfig } from "@chakra-ui/react";

const colors = {
  app: {
    primary: {
      100: "#7AADCC",
      200: "#73A2BF",
      300: "#638CA6",
      400: "#4D6C80",
      500: "#263640",
    },
    secondary: {
      100: "#ACB8BF",
      200: "#A1ACB3",
      300: "#8A9399",
      400: "#676E73",
      500: "#2E3133",
    },
  },
  light: {
    primary: {
      main: "#6750A4",
      onMain: "#FFFFFF",
      onHover: "#8A52BA",
      container: "#EADDFF",
      onContainer: "#21005D",
    },
    secondary: {
      main: "#625B71",
      onMain: "#FFFFFF",
      onHover: "#7A6787",
      container: "#E8DEF8",
      onContainer: "#1D192B",
    },
    background: {
      main: "#FFFBFE",
      onMain: "#1C1B1F",
      surface: "#FFFBFE",
      onSurface: "#1C1B1F",
    },
  },
  dark: {
    primary: {
      main: "#D0BCFF",
      onMain: "#381E72",
      onHover: "#C9A0E8",
      container: "#4F378B",
      onContainer: "#EADDFF",
    },
    secondary: {
      main: "#CCC2DC",
      onMain: "#332D41",
      onHover: "#E4C9F2",
      container: "#4A4458",
      onContainer: "#E8DEF8",
    },
    background: {
      main: "#1C1B1F",
      onMain: "#E6E1E5",
      surface: "#1C1B1F",
      onSurface: "#E6E1E5",
    },
  },
};

const fonts = {
  heading: "Roboto, sans-serif",
  body: "Roboto Mono, sans-serif",
};

const components: { Checkbox: ComponentStyleConfig } = {
  Checkbox: {
    // can be Radio
    baseStyle: {
      label: {
        pointerEvents: "none",
      },
    },
  },
};

export const customTheme = extendTheme({
  colors,
  fonts,
  components,
  config: {
    initialColorMode: "light",
    useSystemColorMode: true,
    cssVarPrefix: "pjt",
  },
});

const otherCoolColors = {
  neonBlue: "#00FFFF", // primary
  onNeonBlue: "#004040", // text dark-gray
  skyBlue: "#89ABE3FF", // primary accent

  hotPink: "#FF69B4", // secondary
  onHotPink: "#401A2D", // text dark-purple
  bubblegumPink: "#EA738DFF", // secondary accent
};
