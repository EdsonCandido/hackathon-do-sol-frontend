import { InteressesSelector } from "@/components/InteressesSelector";
import { TouristLayout } from "@/components/Layout/TouristLayout";
import { MinhaRotaCard } from "@/components/MinhaRotaCard";
import { RotaFormDialog } from "@/components/RotaFormDialog";
import { useAuth } from "@/hooks/useAuth";
import { useClienteProfile } from "@/hooks/useClienteProfile";
import { useMinhasRotas } from "@/hooks/useMinhasRotas";
import type { CreateRotaPayload, RotaResponse } from "@/types";
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
import { useState } from "react";
import { FiLogOut, FiPlus, FiRefreshCw } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const ClienteDashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { interesses, toggleInteresse, isSaving } = useClienteProfile(user?.id);
  const { rotas, isLoading, error, refetch, criar, atualizar, excluir } =
    useMinhasRotas(user?.id);

  const [formOpen, setFormOpen] = useState(false);
  const [editingRota, setEditingRota] = useState<RotaResponse | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const ativas = rotas.filter((r) => r.status === "ativa").length;
  const rascunhos = rotas.filter((r) => r.status === "rascunho").length;

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const handleOpenCreate = () => {
    setEditingRota(null);
    setFormOpen(true);
  };

  const handleEdit = (rota: RotaResponse) => {
    setEditingRota(rota);
    setFormOpen(true);
  };

  const handleDelete = async (rota: RotaResponse) => {
    const confirmed = window.confirm(
      `Excluir a rota "${rota.titulo}"? Essa ação não pode ser desfeita.`,
    );
    if (!confirmed) return;

    setDeletingId(rota.id);
    try {
      await excluir(rota.id);
    } finally {
      setDeletingId(null);
    }
  };

  const handleSubmit = async (payload: CreateRotaPayload) => {
    if (editingRota) {
      await atualizar(editingRota.id, payload);
    } else {
      await criar(payload);
    }
  };

  return (
    <TouristLayout>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "stretch", md: "center" }}
        gap={4}
        mb={8}
      >
        <Box>
          <Heading size="lg" mb={1}>
            Olá, {user?.name?.split(" ")[0]}
          </Heading>
          <Text color="fg.muted">
            Gerencie suas rotas e defina seus interesses de viagem
          </Text>
        </Box>

        <Flex
          gap={2}
          align="center"
          justify={{ base: "space-between", md: "flex-end" }}
        >
          <Flex align="center" gap={2} minW={0}>
            <Avatar.Root size="sm">
              <Avatar.Fallback name={user?.name ?? "Cliente"} />
            </Avatar.Root>
            <Text fontSize="sm" truncate>
              {user?.email}
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
          label="Minhas rotas"
          value={rotas.length}
          loading={isLoading}
        />
        <StatCard label="Rotas ativas" value={ativas} loading={isLoading} />
        <StatCard label="Rascunhos" value={rascunhos} loading={isLoading} />
      </SimpleGrid>

      <Box
        p={{ base: 4, md: 6 }}
        mb={8}
        borderRadius="xl"
        borderWidth="1px"
        borderColor="border.muted"
        bg="bg.panel"
      >
        <Heading size="md" mb={4}>
          Meus interesses
        </Heading>
        <InteressesSelector
          selected={interesses}
          onToggle={toggleInteresse}
          isSaving={isSaving}
        />
        {interesses.length > 0 && (
          <Text fontSize="sm" color="fg.muted" mt={3}>
            {interesses.length} interesse{interesses.length > 1 ? "s" : ""}{" "}
            selecionado{interesses.length > 1 ? "s" : ""}
          </Text>
        )}
      </Box>

      <Flex
        direction={{ base: "column", sm: "row" }}
        justify="space-between"
        align={{ base: "stretch", sm: "center" }}
        gap={3}
        mb={4}
      >
        <Heading size="md">Minhas rotas</Heading>
        <Flex gap={2}>
          <Button
            variant="ghost"
            size="sm"
            onClick={refetch}
            loading={isLoading}
            aria-label="Atualizar lista de rotas"
          >
            <FiRefreshCw />
            Atualizar
          </Button>
          <Button colorPalette="green" size="sm" onClick={handleOpenCreate}>
            <FiPlus />
            Nova rota
          </Button>
        </Flex>
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
          {["sk-1", "sk-2", "sk-3"].map((key) => (
            <Skeleton key={key} h="220px" borderRadius="lg" />
          ))}
        </Grid>
      ) : rotas.length === 0 ? (
        <Box
          p={8}
          textAlign="center"
          borderRadius="lg"
          borderWidth="1px"
          borderColor="border.muted"
          borderStyle="dashed"
        >
          <Text color="fg.muted" mb={4}>
            Você ainda não cadastrou nenhuma rota.
          </Text>
          <Button colorPalette="green" onClick={handleOpenCreate}>
            <FiPlus />
            Criar primeira rota
          </Button>
        </Box>
      ) : (
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={4}
        >
          {rotas.map((rota) => (
            <MinhaRotaCard
              key={rota.id}
              rota={rota}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isDeleting={deletingId === rota.id}
            />
          ))}
        </Grid>
      )}

      <RotaFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        rota={editingRota}
        onSubmit={handleSubmit}
      />
    </TouristLayout>
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
