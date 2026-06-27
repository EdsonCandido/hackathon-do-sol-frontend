import { brandColors } from "@/theme";
import type { RotaResponse } from "@/types";
import { Box, Heading, Text } from "@chakra-ui/react";
import L from "leaflet";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface RotasMapProps {
  rotas: RotaResponse[];
  rotaAtiva?: RotaResponse;
}

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

const RN_CENTER: [number, number] = [-5.5, -35.8];

export const RotasMap = ({ rotas, rotaAtiva }: RotasMapProps) => {
  const rotasExibir = rotaAtiva ? [rotaAtiva] : rotas;
  const todosPontos = rotasExibir.flatMap((r) => r.pontos);

  if (todosPontos.length === 0) {
    return (
      <Box
        h="400px"
        borderRadius="lg"
        borderWidth="1px"
        borderColor="border.muted"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="bg.muted"
      >
        <Text color="fg.muted">Nenhuma rota para exibir no mapa.</Text>
      </Box>
    );
  }

  const center: [number, number] = rotaAtiva
    ? [
        rotaAtiva.pontos.reduce((s, p) => s + p.latitude, 0) /
          rotaAtiva.pontos.length,
        rotaAtiva.pontos.reduce((s, p) => s + p.longitude, 0) /
          rotaAtiva.pontos.length,
      ]
    : RN_CENTER;

  return (
    <Box
      h={{ base: "320px", md: "420px" }}
      borderRadius="lg"
      overflow="hidden"
      borderWidth="1px"
      borderColor="border.muted"
      aria-label="Mapa de rotas turísticas do Rio Grande do Norte"
    >
      <MapContainer
        center={center}
        zoom={rotaAtiva ? 9 : 7}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {rotasExibir.map((rota) => {
          const positions = rota.pontos
            .sort((a, b) => a.ordem - b.ordem)
            .map((p) => [p.latitude, p.longitude] as [number, number]);

          return (
            <Polyline
              key={`line-${rota.id}`}
              positions={positions}
              color={brandColors.primary}
              weight={3}
              opacity={0.7}
            />
          );
        })}
        {rotasExibir.flatMap((rota) =>
          rota.pontos.map((ponto) => (
            <Marker
              key={ponto.id}
              position={[ponto.latitude, ponto.longitude]}
            >
              <Popup>
                <Heading size="sm" mb={1}>
                  {ponto.nome}
                </Heading>
                <Text fontSize="sm" mb={1}>
                  {ponto.cidade}, RN
                </Text>
                <Text fontSize="xs" color="gray.600">
                  {rota.titulo} — parada {ponto.ordem}
                </Text>
              </Popup>
            </Marker>
          )),
        )}
      </MapContainer>
    </Box>
  );
};
