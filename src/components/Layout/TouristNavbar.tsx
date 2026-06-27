import { ColorModeToggle } from "@/components/ui/ColorModeToggle";
import { useAuth } from "@/hooks/useAuth";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import { FiLogOut, FiUser } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";

const APP_NAME = import.meta.env.VITE_APP_NAME ?? "Descubra RN";

export const TouristNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const isCliente = isAuthenticated && user?.role === "cliente";
  const isAdmin = isAuthenticated && user?.role === "admin";

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const navLink = (to: string, label: string) => {
    const isActive = location.pathname === to;
    return (
      <Button
        asChild
        variant={isActive ? "subtle" : "ghost"}
        colorPalette="blue"
        size="sm"
      >
        <Link to={to}>{label}</Link>
      </Button>
    );
  };

  return (
    <Box
      as="header"
      borderBottomWidth="1px"
      borderColor="border.muted"
      bg="bg.panel"
      px={{ base: 4, md: 8 }}
      py={3}
      position="sticky"
      top={0}
      zIndex="sticky"
    >
      <Flex align="center" justify="space-between" maxW="1200px" mx="auto">
        <Flex align="center" gap={3}>
          <Flex
            align="center"
            justify="center"
            w={9}
            h={9}
            borderRadius="lg"
            bg="blue.900"
            color="white"
            fontWeight="bold"
            fontSize="sm"
          >
            RN
          </Flex>
          <Box>
            <Heading size="md" lineHeight="shorter">
              <Link to="/">{APP_NAME}</Link>
            </Heading>
            <Text
              fontSize="xs"
              color="fg.muted"
              display={{ base: "none", sm: "block" }}
            >
              Rio Grande do Norte
            </Text>
          </Box>
        </Flex>

        <HStack gap={1}>
          {navLink("/", "Início")}
          {navLink("/rotas", "Rotas")}
          {isCliente ? (
            <>
              {navLink("/minha-conta", "Minha conta")}
              <Flex
                align="center"
                gap={1}
                display={{ base: "none", md: "flex" }}
              >
                <Avatar.Root size="xs">
                  <Avatar.Fallback name={user?.name ?? "Cliente"} />
                </Avatar.Root>
                <Text fontSize="xs" color="fg.muted" maxW="120px" truncate>
                  {user?.name}
                </Text>
              </Flex>
              <Button
                variant="outline"
                size="sm"
                colorPalette="red"
                onClick={handleLogout}
                aria-label="Sair da conta"
              >
                <FiLogOut />
              </Button>
            </>
          ) : isAdmin ? (
            <>
              {navLink("/admin/dashboard", "Painel admin")}
              <Flex
                align="center"
                gap={1}
                display={{ base: "none", md: "flex" }}
              >
                <Avatar.Root size="xs">
                  <Avatar.Fallback name={user?.name ?? "Admin"} />
                </Avatar.Root>
                <Text fontSize="xs" color="fg.muted" maxW="120px" truncate>
                  {user?.name}
                </Text>
              </Flex>
              <Button
                variant="outline"
                size="sm"
                colorPalette="red"
                onClick={handleLogout}
                aria-label="Sair da conta"
              >
                <FiLogOut />
              </Button>
            </>
          ) : (
            <Button asChild variant="outline" size="sm" colorPalette="blue">
              <Link to="/login">
                <FiUser />
                Entrar
              </Link>
            </Button>
          )}
          <ColorModeToggle />
        </HStack>
      </Flex>
    </Box>
  );
};
