import { INTERESSES_TURISMO, type InteresseTurismo } from "@/types";
import { Button, SimpleGrid, Text } from "@chakra-ui/react";

interface InteressesSelectorProps {
  selected: InteresseTurismo[];
  onToggle: (interesse: InteresseTurismo) => void;
  isSaving?: boolean;
}

export const InteressesSelector = ({
  selected,
  onToggle,
  isSaving = false,
}: InteressesSelectorProps) => {
  return (
    <>
      <Text fontSize="sm" color="fg.muted" mb={3}>
        Selecione os temas que mais te interessam para personalizar sugestões de
        rotas.
      </Text>
      <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} gap={2}>
        {INTERESSES_TURISMO.map(({ id, label }) => {
          const isSelected = selected.includes(id);
          return (
            <Button
              key={id}
              variant={isSelected ? "solid" : "outline"}
              colorPalette={isSelected ? "green" : "gray"}
              size="sm"
              h="auto"
              py={2}
              whiteSpace="normal"
              cursor={isSaving ? "wait" : "pointer"}
              opacity={isSaving ? 0.7 : 1}
              onClick={() => onToggle(id)}
              aria-pressed={isSelected}
            >
              {label}
            </Button>
          );
        })}
      </SimpleGrid>
    </>
  );
};
