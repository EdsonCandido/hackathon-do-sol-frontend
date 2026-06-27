import type { ClienteResponse } from "@/types";
import { Box, Heading, Text } from "@chakra-ui/react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface ClientesMapProps {
  clientes: ClienteResponse[];
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

export const ClientesMap = ({ clientes }: ClientesMapProps) => {
  if (clientes.length === 0) {
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
        <Text color="fg.muted">Nenhum cliente para exibir no mapa.</Text>
      </Box>
    );
  }

  const centerLat =
    clientes.reduce((sum, c) => sum + c.latitude, 0) / clientes.length;
  const centerLng =
    clientes.reduce((sum, c) => sum + c.longitude, 0) / clientes.length;

  return (
    <Box
      h={{ base: "320px", md: "420px" }}
      borderRadius="lg"
      overflow="hidden"
      borderWidth="1px"
      borderColor="border.muted"
      aria-label="Mapa de localização dos clientes"
    >
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {clientes.map((cliente) => (
          <Marker
            key={cliente.id}
            position={[cliente.latitude, cliente.longitude]}
          >
            <Popup>
              <Heading size="sm" mb={1}>
                {cliente.nome}
              </Heading>
              <Text fontSize="sm">
                {cliente.cidade}, {cliente.estado}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {cliente.email}
              </Text>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};
