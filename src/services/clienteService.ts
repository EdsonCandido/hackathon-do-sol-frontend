import type { ClienteResponse } from "@/types";

const MOCK_CLIENTES: ClienteResponse[] = [
  {
    id: "1",
    nome: "TechNova Soluções",
    email: "contato@technova.com.br",
    telefone: "(11) 3456-7890",
    empresa: "TechNova Soluções LTDA",
    cidade: "São Paulo",
    estado: "SP",
    status: "ativo",
    latitude: -23.5505,
    longitude: -46.6333,
  },
  {
    id: "2",
    nome: "Verde Agro",
    email: "comercial@verdeagro.com.br",
    telefone: "(19) 3344-5566",
    empresa: "Verde Agro S/A",
    cidade: "Campinas",
    estado: "SP",
    status: "ativo",
    latitude: -22.9099,
    longitude: -47.0626,
  },
  {
    id: "3",
    nome: "Litoral Comércio",
    email: "vendas@litoral.com.br",
    telefone: "(13) 3222-1100",
    empresa: "Litoral Comércio ME",
    cidade: "Santos",
    estado: "SP",
    status: "pendente",
    latitude: -23.9608,
    longitude: -46.3336,
  },
  {
    id: "4",
    nome: "Minas Digital",
    email: "hello@minasdigital.com.br",
    telefone: "(31) 9988-7766",
    empresa: "Minas Digital EIRELI",
    cidade: "Belo Horizonte",
    estado: "MG",
    status: "ativo",
    latitude: -19.9167,
    longitude: -43.9345,
  },
  {
    id: "5",
    nome: "Rio Logística",
    email: "ops@riolog.com.br",
    telefone: "(21) 2555-4433",
    empresa: "Rio Logística SA",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    status: "inativo",
    latitude: -22.9068,
    longitude: -43.1729,
  },
  {
    id: "6",
    nome: "Curitiba Tech",
    email: "info@curitibatech.com.br",
    telefone: "(41) 3010-2020",
    empresa: "Curitiba Tech LTDA",
    cidade: "Curitiba",
    estado: "PR",
    status: "ativo",
    latitude: -25.4284,
    longitude: -49.2733,
  },
];

export const clienteService = {
  listar: async (): Promise<ClienteResponse[]> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return MOCK_CLIENTES;
  },

  buscarPorId: async (id: string): Promise<ClienteResponse | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return MOCK_CLIENTES.find((c) => c.id === id);
  },
};
