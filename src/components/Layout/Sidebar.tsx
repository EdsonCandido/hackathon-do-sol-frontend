import { useAuth } from "@/hooks/useAuth";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiLogOut, FiMap } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const APP_NAME = import.meta.env.VITE_APP_NAME ?? "Descubra RN";

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <Box
      as="nav"
      aria-label="Menu administrativo"
      w={{ base: "full", md: "260px" }}
      minH={{ base: "auto", md: "100vh" }}
      borderRightWidth={{ md: "1px" }}
      borderBottomWidth={{ base: "1px", md: "0" }}
      borderColor="border.muted"
      bg="bg.panel"
      p={4}
      display={{ base: "none", md: "flex" }}
      flexDirection="column"
      position={{ md: "sticky" }}
      top={0}
    >
      <Flex align="center" gap={3} mb={8}>
        <Flex
          align="center"
          justify="center"
          w={10}
          h={10}
          borderRadius="lg"
          bg="blue.900"
          color="white"
          fontWeight="bold"
          fontSize="lg"
        >
          RN
        </Flex>
        <Heading size="md">{APP_NAME}</Heading>
      </Flex>

      <VStack align="stretch" gap={1} flex="1">
        <Button
          variant="subtle"
          colorPalette="blue"
          justifyContent="flex-start"
          aria-current="page"
        >
          <FiMap />
          Rotas turísticas
        </Button>
        <Button asChild variant="ghost" justifyContent="flex-start">
          <Link to="/">Ver site público</Link>
        </Button>
      </VStack>

      <Box pt={4} mt={4} borderTopWidth="1px" borderColor="border.muted">
        <Flex align="center" gap={3} mb={3}>
          <Avatar.Root size="sm">
            <Avatar.Fallback name={user?.name ?? "Admin"} />
          </Avatar.Root>
          <Box minW={0}>
            <Text fontWeight="medium" fontSize="sm" truncate>
              {user?.name}
            </Text>
            <Text fontSize="xs" color="fg.muted" truncate>
              {user?.email}
            </Text>
          </Box>
        </Flex>
        <Button
          variant="outline"
          colorPalette="red"
          w="full"
          onClick={handleLogout}
        >
          <FiLogOut />
          Sair
        </Button>
      </Box>
    </Box>
  );
};
