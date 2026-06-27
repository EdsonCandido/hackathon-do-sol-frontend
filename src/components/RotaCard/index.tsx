import type { RotaDificuldade, RotaResponse, RotaStatus } from "@/types";
import {
  Badge,
  Box,
  Card,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiClock, FiMapPin, FiTrendingUp } from "react-icons/fi";
import { Link } from "react-router-dom";

interface RotaCardProps {
  rota: RotaResponse;
  linkTo?: string;
}

const statusConfig: Record<
  RotaStatus,
  { label: string; colorPalette: "green" | "gray" | "yellow" }
> = {
  ativa: { label: "Ativa", colorPalette: "green" },
  rascunho: { label: "Rascunho", colorPalette: "yellow" },
  encerrada: { label: "Encerrada", colorPalette: "gray" },
};

const dificuldadeLabel: Record<RotaDificuldade, string> = {
  facil: "Fácil",
  moderada: "Moderada",
  dificil: "Difícil",
};

export const RotaCard = ({ rota, linkTo }: RotaCardProps) => {
  const status = statusConfig[rota.status];
  const cidades = [...new Set(rota.pontos.map((p) => p.cidade))];

  const content = (
    <Card.Root
      variant="outline"
      size="sm"
      _hover={{ shadow: "md", borderColor: "blue.muted" }}
      transition="all 0.2s"
      h="full"
    >
      <Card.Header pb={2}>
        <Flex justify="space-between" align="start" gap={2}>
          <Box minW={0}>
            <Heading size="sm">{rota.titulo}</Heading>
            <Text fontSize="xs" color="fg.muted" mt={1} lineClamp={2}>
              {rota.resumo}
            </Text>
          </Box>
          <Badge colorPalette={status.colorPalette} variant="subtle" flexShrink={0}>
            {status.label}
          </Badge>
        </Flex>
      </Card.Header>
      <Card.Body pt={0}>
        <VStack align="stretch" gap={2}>
          <Flex align="center" gap={2} fontSize="sm" color="fg.muted">
            <FiClock aria-hidden />
            <Text>
              {rota.duracaoDias} {rota.duracaoDias === 1 ? "dia" : "dias"}
            </Text>
          </Flex>
          <Flex align="center" gap={2} fontSize="sm" color="fg.muted">
            <FiTrendingUp aria-hidden />
            <Text>{dificuldadeLabel[rota.dificuldade]}</Text>
          </Flex>
          <Flex align="center" gap={2} fontSize="sm" color="fg.muted">
            <FiMapPin aria-hidden />
            <Text truncate>{cidades.join(" · ")}</Text>
          </Flex>
          <Text fontSize="xs" color="fg.muted">
            {rota.pontos.length} paradas
          </Text>
        </VStack>
      </Card.Body>
    </Card.Root>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} style={{ display: "block", height: "100%" }}>
        {content}
      </Link>
    );
  }

  return content;
};
