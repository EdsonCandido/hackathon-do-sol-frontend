import type { ClienteResponse, ClienteStatus } from "@/types";
import {
  Badge,
  Box,
  Card,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

interface ClienteCardProps {
  cliente: ClienteResponse;
}

const statusConfig: Record<
  ClienteStatus,
  { label: string; colorPalette: "green" | "gray" | "yellow" }
> = {
  ativo: { label: "Ativo", colorPalette: "green" },
  inativo: { label: "Inativo", colorPalette: "gray" },
  pendente: { label: "Pendente", colorPalette: "yellow" },
};

export const ClienteCard = ({ cliente }: ClienteCardProps) => {
  const status = statusConfig[cliente.status];

  return (
    <Card.Root
      variant="outline"
      size="sm"
      _hover={{ shadow: "md", borderColor: "blue.muted" }}
      transition="all 0.2s"
    >
      <Card.Header pb={2}>
        <Flex justify="space-between" align="start" gap={2}>
          <Box minW={0}>
            <Heading size="sm" truncate>
              {cliente.nome}
            </Heading>
            <Text fontSize="xs" color="fg.muted" truncate>
              {cliente.empresa}
            </Text>
          </Box>
          <Badge colorPalette={status.colorPalette} variant="subtle">
            {status.label}
          </Badge>
        </Flex>
      </Card.Header>
      <Card.Body pt={0}>
        <VStack align="stretch" gap={2}>
          <Flex align="center" gap={2} fontSize="sm" color="fg.muted">
            <FiMail aria-hidden />
            <Text truncate>{cliente.email}</Text>
          </Flex>
          <Flex align="center" gap={2} fontSize="sm" color="fg.muted">
            <FiPhone aria-hidden />
            <Text>{cliente.telefone}</Text>
          </Flex>
          <Flex align="center" gap={2} fontSize="sm" color="fg.muted">
            <FiMapPin aria-hidden />
            <Text truncate>
              {cliente.cidade}, {cliente.estado}
            </Text>
          </Flex>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
