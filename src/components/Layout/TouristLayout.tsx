import { Box } from "@chakra-ui/react";
import { TouristNavbar } from "./TouristNavbar";

interface TouristLayoutProps {
  children: React.ReactNode;
}

export const TouristLayout = ({ children }: TouristLayoutProps) => {
  return (
    <Box minH="100vh" bg="bg.subtle">
      <TouristNavbar />
      <Box as="main" maxW="1200px" mx="auto" p={{ base: 4, md: 8 }}>
        {children}
      </Box>
    </Box>
  );
};
