import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

export const brandColors = {
  dark: "#083040",
  primary: "#0DA697",
  orange: "#F28C0F",
  red: "#D9501E",
  light: "#F2F2F2",
} as const;

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        blue: {
          50: { value: "#edfaf8" },
          100: { value: "#d4f5f1" },
          200: { value: "#a8ebe3" },
          300: { value: "#6dd9cc" },
          400: { value: "#3ec9b8" },
          500: { value: "#12b8a7" },
          600: { value: brandColors.primary },
          700: { value: "#0b8578" },
          800: { value: "#0a4d62" },
          900: { value: brandColors.dark },
          950: { value: "#021016" },
        },
        green: {
          50: { value: "#edfaf8" },
          100: { value: "#d4f5f1" },
          200: { value: "#a8ebe3" },
          300: { value: "#6dd9cc" },
          400: { value: "#3ec9b8" },
          500: { value: brandColors.primary },
          600: { value: "#0b8578" },
          700: { value: "#086459" },
          800: { value: "#06433b" },
          900: { value: "#04271e" },
          950: { value: "#021510" },
        },
        orange: {
          50: { value: "#fef5e7" },
          100: { value: "#fdebd0" },
          200: { value: "#fbd7a1" },
          300: { value: "#f9c372" },
          400: { value: "#f5a543" },
          500: { value: brandColors.orange },
          600: { value: "#d97d0d" },
          700: { value: "#a65f0a" },
          800: { value: "#734107" },
          900: { value: "#402304" },
          950: { value: "#261402" },
        },
        yellow: {
          50: { value: "#fef5e7" },
          100: { value: "#fdebd0" },
          200: { value: "#fbd7a1" },
          300: { value: "#f9c372" },
          400: { value: "#f5a543" },
          500: { value: brandColors.orange },
          600: { value: "#d97d0d" },
          700: { value: "#a65f0a" },
          800: { value: "#734107" },
          900: { value: "#402304" },
          950: { value: "#261402" },
        },
        red: {
          50: { value: "#fdf0eb" },
          100: { value: "#fbe1d7" },
          200: { value: "#f7c3af" },
          300: { value: "#f39577" },
          400: { value: "#ed6844" },
          500: { value: brandColors.red },
          600: { value: "#b84018" },
          700: { value: "#8a3012" },
          800: { value: "#5c200c" },
          900: { value: "#2e1006" },
          950: { value: "#1a0904" },
        },
        gray: {
          50: { value: brandColors.light },
          100: { value: "#e8e8e8" },
          200: { value: "#d4d4d4" },
          300: { value: "#bdbdbd" },
          400: { value: "#9e9e9e" },
          500: { value: "#757575" },
          600: { value: "#5c5c5c" },
          700: { value: "#424242" },
          800: { value: "#2e2e2e" },
          900: { value: "#1a1a1a" },
          950: { value: "#0d0d0d" },
        },
      },
    },
    semanticTokens: {
      colors: {
        blue: {
          solid: {
            value: { _light: "{colors.blue.600}", _dark: "{colors.blue.500}" },
          },
        },
        green: {
          solid: {
            value: { _light: "{colors.green.500}", _dark: "{colors.green.500}" },
          },
        },
        orange: {
          solid: {
            value: { _light: "{colors.orange.500}", _dark: "{colors.orange.500}" },
          },
        },
        red: {
          solid: {
            value: { _light: "{colors.red.500}", _dark: "{colors.red.500}" },
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
