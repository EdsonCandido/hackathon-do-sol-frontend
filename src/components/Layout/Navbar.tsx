import { AppLogo } from "@/components/ui/AppLogo";
import { ColorModeToggle } from "@/components/ui/ColorModeToggle";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const APP_NAME = import.meta.env.VITE_APP_NAME ?? "Descubra RN";

export const Navbar = () => {
  return (
    <Box
      as="header"
      borderBottomWidth="1px"
      borderColor="border.muted"
      bg="bg.panel"
      px={{ base: 4, md: 6 }}
      py={3}
      position="sticky"
      top={0}
      zIndex="sticky"
    >
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={3}>
          <AppLogo w={9} h={9} borderRadius="lg" />
          <Box>
            <Heading size="md" lineHeight="shorter">
              <Link to="/">{APP_NAME}</Link>
            </Heading>
            <Text
              fontSize="xs"
              color="fg.muted"
              display={{ base: "none", sm: "block" }}
            >
              Admin — rotas turísticas RN
            </Text>
          </Box>
        </Flex>
        <ColorModeToggle />
      </Flex>
    </Box>
  );
};
