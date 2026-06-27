import { RotaCard } from "@/components/RotaCard";
import { TouristLayout } from "@/components/Layout/TouristLayout";
import { useRotas } from "@/hooks/useRotas";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  SimpleGrid,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiArrowRight, FiMap, FiSun } from "react-icons/fi";
import { Link } from "react-router-dom";

const MotionBox = motion.create(Box);

export const HomePage = () => {
  const { rotas, isLoading } = useRotas({ apenasAtivas: true });
  const destaques = rotas.filter((r) => r.destaque);

  return (
    <TouristLayout>
      <MotionBox
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        mb={10}
      >
        <Box
          p={{ base: 6, md: 10 }}
          borderRadius="2xl"
          bg="blue.900"
          color="white"
          position="relative"
          overflow="hidden"
        >
          <Box position="relative" zIndex={1} maxW="lg">
            <Flex align="center" gap={2} mb={3} opacity={0.9}>
              <FiSun />
              <Text fontSize="sm" fontWeight="medium">
                Turismo no Rio Grande do Norte
              </Text>
            </Flex>
            <Heading size={{ base: "xl", md: "2xl" }} mb={3}>
              Descubra as melhores rotas pelo RN
            </Heading>
            <Text mb={6} opacity={0.9} lineHeight="tall">
              Dunas, Parrachos e Pipa — mas também Tangará e seu pastel,
              Carnaubais histórica, Martins na serra, Lajedo de Soledade e o
              Seridó potiguar. Planeje sua viagem com roteiros prontos.
            </Text>
            <Button asChild colorPalette="blue" size="lg">
              <Link to="/rotas">
                Explorar rotas
                <FiArrowRight />
              </Link>
            </Button>
          </Box>
        </Box>
      </MotionBox>

      <SimpleGrid columns={{ base: 1, sm: 3 }} gap={4} mb={10}>
        <HighlightCard
          icon={<FiMap />}
          title="6 rotas"
          description="Litoral norte, sul, sertão e Costa Branca"
        />
        <HighlightCard
          icon={<FiSun />}
          title="365 dias de sol"
          description="Natal, a Cidade do Sol, como ponto de partida"
        />
        <HighlightCard
          icon={<FiMap />}
          title="Mapa interativo"
          description="Veja paradas e trajetos no mapa"
        />
      </SimpleGrid>

      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="lg">Rotas em destaque</Heading>
        <Button asChild variant="ghost" size="sm">
          <Link to="/rotas">
            Ver todas
            <FiArrowRight />
          </Link>
        </Button>
      </Flex>

      {isLoading ? (
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
          gap={4}
        >
          {["sk-1", "sk-2", "sk-3"].map((key) => (
            <Skeleton key={key} h="180px" borderRadius="lg" />
          ))}
        </Grid>
      ) : (
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
          gap={4}
        >
          {destaques.map((rota) => (
            <RotaCard key={rota.id} rota={rota} linkTo={`/rotas/${rota.id}`} />
          ))}
        </Grid>
      )}
    </TouristLayout>
  );
};

interface HighlightCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const HighlightCard = ({ icon, title, description }: HighlightCardProps) => (
  <Box
    p={4}
    borderRadius="lg"
    borderWidth="1px"
    borderColor="border.muted"
    bg="bg.panel"
  >
    <Flex align="center" gap={2} mb={2} color="blue.solid">
      {icon}
      <Text fontWeight="bold">{title}</Text>
    </Flex>
    <Text fontSize="sm" color="fg.muted">
      {description}
    </Text>
  </Box>
);
