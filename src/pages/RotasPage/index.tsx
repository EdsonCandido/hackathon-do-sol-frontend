import { RotaCard } from "@/components/RotaCard";
import { RotasMap } from "@/components/RotasMap";
import { TouristLayout } from "@/components/Layout/TouristLayout";
import { useRotas } from "@/hooks/useRotas";
import {
  Box,
  Grid,
  Heading,
  Skeleton,
  Text,
} from "@chakra-ui/react";

export const RotasPage = () => {
  const { rotas, isLoading, error } = useRotas({ apenasAtivas: true });

  return (
    <TouristLayout>
      <Box mb={6}>
        <Heading size="lg" mb={1}>
          Rotas turísticas
        </Heading>
        <Text color="fg.muted">
          Roteiros pelo Rio Grande do Norte — litoral, Seridó, sertão, cidades
          históricas, gastronomia e ecoturismo no interior.
        </Text>
      </Box>

      {isLoading ? (
        <Skeleton h={{ base: "320px", md: "420px" }} borderRadius="lg" mb={8} />
      ) : (
        <Box mb={8}>
          <RotasMap rotas={rotas} />
        </Box>
      )}

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
            <Skeleton key={key} h="180px" borderRadius="lg" />
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
          {rotas.map((rota) => (
            <RotaCard key={rota.id} rota={rota} linkTo={`/rotas/${rota.id}`} />
          ))}
        </Grid>
      )}
    </TouristLayout>
  );
};
