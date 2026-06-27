export const INTERESSES_TURISMO = [
  { id: "praia", label: "Praia" },
  { id: "gastronomia", label: "Gastronomia" },
  { id: "ecoturismo", label: "Ecoturismo" },
  { id: "cultura", label: "Cultura" },
  { id: "aventura", label: "Aventura" },
  { id: "turismo-religioso", label: "Turismo religioso" },
  { id: "turismo-comunitario", label: "Turismo comunitário" },
] as const;

export type InteresseTurismo = (typeof INTERESSES_TURISMO)[number]["id"];

export interface ClienteProfile {
  interesses: InteresseTurismo[];
}
