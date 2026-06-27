import { ColorModeToggle } from "@/components/ui/ColorModeToggle";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

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
        <Heading size="md" display={{ base: "block", md: "none" }}>
          {APP_NAME}
        </Heading>
        <Text
          fontSize="sm"
          color="fg.muted"
          display={{ base: "none", md: "block" }}
        >
          Admin — rotas turísticas RN
        </Text>
        <ColorModeToggle />
      </Flex>
    </Box>
  );
};
