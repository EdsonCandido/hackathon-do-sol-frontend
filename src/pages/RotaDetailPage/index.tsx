import { RotasMap } from "@/components/RotasMap";
import { TouristLayout } from "@/components/Layout/TouristLayout";
import { rotaService } from "@/services/rotaService";
import type { RotaDificuldade, RotaResponse } from "@/types";
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiClock, FiMapPin, FiTrendingUp } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

const dificuldadeLabel: Record<RotaDificuldade, string> = {
  facil: "Fácil",
  moderada: "Moderada",
  dificil: "Difícil",
};

export const RotaDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [rota, setRota] = useState<RotaResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    rotaService
      .buscarPorId(id)
      .then((data) => {
        if (!data || data.status !== "ativa") {
          setNotFound(true);
        } else {
          setRota(data);
        }
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return (
      <TouristLayout>
        <Skeleton h="8" w="48" mb={4} />
        <Skeleton h="6" w="full" mb={2} />
        <Skeleton h="4" w="3/4" mb={8} />
        <Skeleton h="420px" borderRadius="lg" />
      </TouristLayout>
    );
  }

  if (notFound || !rota) {
    return (
      <TouristLayout>
        <Heading size="lg" mb={2}>
          Rota não encontrada
        </Heading>
        <Text color="fg.muted" mb={4}>
          Esta rota não existe ou não está disponível.
        </Text>
        <Button asChild variant="outline">
          <Link to="/rotas">
            <FiArrowLeft />
            Voltar às rotas
          </Link>
        </Button>
      </TouristLayout>
    );
  }

  const pontosOrdenados = [...rota.pontos].sort((a, b) => a.ordem - b.ordem);

  return (
    <TouristLayout>
      <Button asChild variant="ghost" size="sm" mb={4}>
        <Link to="/rotas">
          <FiArrowLeft />
          Todas as rotas
        </Link>
      </Button>

      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "start", md: "center" }}
        gap={4}
        mb={6}
      >
        <Box>
          <Heading size="lg" mb={2}>
            {rota.titulo}
          </Heading>
          <Text color="fg.muted" maxW="2xl">
            {rota.descricao}
          </Text>
        </Box>
        <Badge colorPalette="green" variant="subtle" fontSize="sm" px={3} py={1}>
          Rota ativa
        </Badge>
      </Flex>

      <Flex gap={6} mb={8} flexWrap="wrap">
        <MetaItem icon={<FiClock />} label={`${rota.duracaoDias} dias`} />
        <MetaItem
          icon={<FiTrendingUp />}
          label={dificuldadeLabel[rota.dificuldade]}
        />
        <MetaItem
          icon={<FiMapPin />}
          label={`${pontosOrdenados.length} paradas`}
        />
      </Flex>

      <Box mb={8}>
        <RotasMap rotas={[]} rotaAtiva={rota} />
      </Box>

      <Heading size="md" mb={4}>
        Paradas do roteiro
      </Heading>

      <VStack align="stretch" gap={3}>
        {pontosOrdenados.map((ponto) => (
          <Box
            key={ponto.id}
            p={4}
            borderRadius="lg"
            borderWidth="1px"
            borderColor="border.muted"
            bg="bg.panel"
          >
            <Flex align="start" gap={3}>
              <Flex
                align="center"
                justify="center"
                w={8}
                h={8}
                borderRadius="full"
                bg="blue.subtle"
                color="blue.fg"
                fontWeight="bold"
                fontSize="sm"
                flexShrink={0}
              >
                {ponto.ordem}
              </Flex>
              <Box>
                <Heading size="sm" mb={1}>
                  {ponto.nome}
                </Heading>
                <Text fontSize="sm" color="fg.muted" mb={1}>
                  {ponto.cidade}, RN
                </Text>
                <Text fontSize="sm">{ponto.descricao}</Text>
              </Box>
            </Flex>
          </Box>
        ))}
      </VStack>
    </TouristLayout>
  );
};

interface MetaItemProps {
  icon: React.ReactNode;
  label: string;
}

const MetaItem = ({ icon, label }: MetaItemProps) => (
  <Flex align="center" gap={2} fontSize="sm" color="fg.muted">
    {icon}
    <Text>{label}</Text>
  </Flex>
);
