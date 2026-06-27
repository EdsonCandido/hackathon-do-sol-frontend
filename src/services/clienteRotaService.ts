import type { CreateRotaPayload, RotaResponse } from "@/types";

const rotasKey = (userId: string) => `solpotiguar_cliente_rotas_${userId}`;

const SEED_ROTAS: Omit<RotaResponse, "clienteId">[] = [
  {
    id: "c-seed-1",
    titulo: "Fim de semana em Pipa",
    resumo: "Praias, falésias e pôr do sol no litoral sul.",
    descricao:
      "Roteiro personalizado de 2 dias em Tibau do Sul e Pipa, com foco em praias e gastronomia local.",
    duracaoDias: 2,
    dificuldade: "facil",
    status: "ativa",
    destaque: false,
    pontos: [
      {
        id: "c-seed-1-1",
        nome: "Praia de Pipa",
        descricao: "Falésias e restaurantes à beira-mar.",
        cidade: "Tibau do Sul",
        latitude: -6.2283,
        longitude: -35.0433,
        ordem: 1,
      },
    ],
  },
];

const readRotas = (userId: string): RotaResponse[] => {
  const raw = localStorage.getItem(rotasKey(userId));
  if (!raw) return [];

  try {
    return JSON.parse(raw) as RotaResponse[];
  } catch {
    return [];
  }
};

const writeRotas = (userId: string, rotas: RotaResponse[]): void => {
  localStorage.setItem(rotasKey(userId), JSON.stringify(rotas));
};

const ensureSeed = (userId: string): RotaResponse[] => {
  const existing = readRotas(userId);
  if (existing.length > 0) return existing;

  const seeded = SEED_ROTAS.map((rota) => ({ ...rota, clienteId: userId }));
  writeRotas(userId, seeded);
  return seeded;
};

const createPonto = (cidade: string, rotaId: string) => ({
  id: `${rotaId}-1`,
  nome: cidade,
  descricao: `Parada principal em ${cidade}.`,
  cidade,
  latitude: -5.7945,
  longitude: -35.211,
  ordem: 1,
});

export const clienteRotaService = {
  listar: async (userId: string): Promise<RotaResponse[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return ensureSeed(userId);
  },

  criar: async (
    userId: string,
    payload: CreateRotaPayload,
  ): Promise<RotaResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const rotas = ensureSeed(userId);
    const id = `c-${Date.now()}`;
    const nova: RotaResponse = {
      id,
      titulo: payload.titulo,
      resumo: payload.resumo,
      descricao: payload.descricao,
      duracaoDias: payload.duracaoDias,
      dificuldade: payload.dificuldade,
      status: payload.status,
      destaque: false,
      clienteId: userId,
      pontos: [createPonto(payload.cidade, id)],
    };

    writeRotas(userId, [...rotas, nova]);
    return nova;
  },

  atualizar: async (
    userId: string,
    rotaId: string,
    payload: CreateRotaPayload,
  ): Promise<RotaResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const rotas = ensureSeed(userId);
    const index = rotas.findIndex((r) => r.id === rotaId);
    if (index === -1) throw new Error("Rota não encontrada.");

    const atualizada: RotaResponse = {
      ...rotas[index],
      titulo: payload.titulo,
      resumo: payload.resumo,
      descricao: payload.descricao,
      duracaoDias: payload.duracaoDias,
      dificuldade: payload.dificuldade,
      status: payload.status,
      pontos: [createPonto(payload.cidade, rotaId)],
    };

    const next = [...rotas];
    next[index] = atualizada;
    writeRotas(userId, next);
    return atualizada;
  },

  excluir: async (userId: string, rotaId: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const rotas = ensureSeed(userId).filter((r) => r.id !== rotaId);
    writeRotas(userId, rotas);
  },
};
