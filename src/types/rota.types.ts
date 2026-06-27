export type RotaStatus = "ativa" | "rascunho" | "encerrada";
export type RotaDificuldade = "facil" | "moderada" | "dificil";

export interface PontoRota {
  id: string;
  nome: string;
  descricao: string;
  cidade: string;
  latitude: number;
  longitude: number;
  ordem: number;
}

export interface RotaResponse {
  id: string;
  titulo: string;
  descricao: string;
  resumo: string;
  duracaoDias: number;
  dificuldade: RotaDificuldade;
  status: RotaStatus;
  pontos: PontoRota[];
  destaque: boolean;
  clienteId?: string;
}

export interface CreateRotaPayload {
  titulo: string;
  resumo: string;
  descricao: string;
  duracaoDias: number;
  dificuldade: RotaDificuldade;
  status: RotaStatus;
  cidade: string;
}
