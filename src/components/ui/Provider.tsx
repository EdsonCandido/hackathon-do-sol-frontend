import { AuthProvider } from "@/context";
import { system } from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";

interface ProviderProps {
  children: React.ReactNode;
}

export const Provider = ({ children }: ProviderProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ChakraProvider value={system}>
        <AuthProvider>{children}</AuthProvider>
      </ChakraProvider>
    </ThemeProvider>
  );
};
