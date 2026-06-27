import { RotaCard } from "@/components/RotaCard";
import type { RotaResponse } from "@/types";
import { Flex, IconButton } from "@chakra-ui/react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface MinhaRotaCardProps {
  rota: RotaResponse;
  onEdit: (rota: RotaResponse) => void;
  onDelete: (rota: RotaResponse) => void;
  isDeleting?: boolean;
}

export const MinhaRotaCard = ({
  rota,
  onEdit,
  onDelete,
  isDeleting = false,
}: MinhaRotaCardProps) => {
  return (
    <Flex direction="column" gap={2} h="full">
      <RotaCard rota={rota} />
      <Flex gap={2} justify="flex-end">
        <IconButton
          aria-label={`Editar rota ${rota.titulo}`}
          variant="outline"
          size="sm"
          onClick={() => onEdit(rota)}
          disabled={isDeleting}
        >
          <FiEdit2 />
        </IconButton>
        <IconButton
          aria-label={`Excluir rota ${rota.titulo}`}
          variant="outline"
          colorPalette="red"
          size="sm"
          onClick={() => onDelete(rota)}
          loading={isDeleting}
        >
          <FiTrash2 />
        </IconButton>
      </Flex>
    </Flex>
  );
};
