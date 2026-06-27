import { Box, Flex } from "@chakra-ui/react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Flex minH="100vh" bg="bg.subtle">
      <Sidebar />
      <Flex direction="column" flex="1" minW="0">
        <Navbar />
        <Box as="main" flex="1" p={{ base: 4, md: 6 }} overflow="auto">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};
