import { ClienteCard } from "@/components/ClienteCard";
import { ClientesMap } from "@/components/ClientesMap";
import { MainLayout } from "@/components/Layout/MainLayout";
import { useAuth } from "@/hooks/useAuth";
import { useClientes } from "@/hooks/useClientes";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  SimpleGrid,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { FiLogOut, FiRefreshCw } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const DashboardPage = () => {
  const { user, logout } = useAuth();
  const { clientes, isLoading, error, refetch } = useClientes();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const ativos = clientes.filter((c) => c.status === "ativo").length;

  return (
    <MainLayout>
      <Flex
        direction={{ base: "column", sm: "row" }}
        justify="space-between"
        align={{ base: "stretch", sm: "center" }}
        gap={4}
        mb={6}
      >
        <Box>
          <Heading size="lg" mb={1}>
            Olá, {user?.name?.split(" ")[0]} 👋
          </Heading>
          <Text color="fg.muted">
            Gerencie seus clientes e acompanhe localizações
          </Text>
        </Box>

        <Flex
          gap={2}
          display={{ base: "flex", md: "none" }}
          align="center"
          justify="space-between"
        >
          <Flex align="center" gap={2} minW={0}>
            <Avatar.Root size="sm">
              <Avatar.Fallback name={user?.name ?? "Usuário"} />
            </Avatar.Root>
            <Text fontSize="sm" truncate>
              {user?.name}
            </Text>
          </Flex>
          <Button
            variant="outline"
            colorPalette="red"
            size="sm"
            onClick={handleLogout}
          >
            <FiLogOut />
            Sair
          </Button>
        </Flex>
      </Flex>

      <SimpleGrid columns={{ base: 1, sm: 3 }} gap={4} mb={8}>
        <StatCard
          label="Total de clientes"
          value={clientes.length}
          loading={isLoading}
        />
        <StatCard label="Clientes ativos" value={ativos} loading={isLoading} />
        <StatCard
          label="Estados atendidos"
          value={new Set(clientes.map((c) => c.estado)).size}
          loading={isLoading}
        />
      </SimpleGrid>

      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="md">Mapa de clientes</Heading>
      </Flex>

      {isLoading ? (
        <Skeleton h={{ base: "320px", md: "420px" }} borderRadius="lg" mb={8} />
      ) : (
        <Box mb={8}>
          <ClientesMap clientes={clientes} />
        </Box>
      )}

      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="md">Clientes</Heading>
        <Button
          variant="ghost"
          size="sm"
          onClick={refetch}
          loading={isLoading}
          aria-label="Atualizar lista de clientes"
        >
          <FiRefreshCw />
          Atualizar
        </Button>
      </Flex>

      {error && (
        <Box
          p={4}
          mb={4}
          borderRadius="md"
          bg="red.subtle"
          color="red.fg"
          role="alert"
        >
          {error}
        </Box>
      )}

      {isLoading ? (
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={4}
        >
          {["sk-1", "sk-2", "sk-3", "sk-4", "sk-5", "sk-6"].map((key) => (
            <Skeleton key={key} h="160px" borderRadius="lg" />
          ))}
        </Grid>
      ) : (
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={4}
        >
          {clientes.map((cliente) => (
            <ClienteCard key={cliente.id} cliente={cliente} />
          ))}
        </Grid>
      )}
    </MainLayout>
  );
};

interface StatCardProps {
  label: string;
  value: number;
  loading: boolean;
}

const StatCard = ({ label, value, loading }: StatCardProps) => (
  <Box
    p={4}
    borderRadius="lg"
    borderWidth="1px"
    borderColor="border.muted"
    bg="bg.panel"
  >
    <Text fontSize="sm" color="fg.muted" mb={1}>
      {label}
    </Text>
    {loading ? (
      <Skeleton h="8" w="16" />
    ) : (
      <Text fontSize="2xl" fontWeight="bold">
        {value}
      </Text>
    )}
  </Box>
);
