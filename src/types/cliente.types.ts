export type ClienteStatus = "ativo" | "inativo" | "pendente";

export interface ClienteResponse {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  cidade: string;
  estado: string;
  status: ClienteStatus;
  latitude: number;
  longitude: number;
  avatarUrl?: string;
}
