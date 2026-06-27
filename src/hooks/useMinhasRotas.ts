import { clienteRotaService } from "@/services/clienteRotaService";
import type { CreateRotaPayload, RotaResponse } from "@/types";
import { useCallback, useEffect, useState } from "react";

interface UseMinhasRotasReturn {
  rotas: RotaResponse[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  criar: (payload: CreateRotaPayload) => Promise<void>;
  atualizar: (id: string, payload: CreateRotaPayload) => Promise<void>;
  excluir: (id: string) => Promise<void>;
}

export const useMinhasRotas = (
  userId: string | undefined,
): UseMinhasRotasReturn => {
  const [rotas, setRotas] = useState<RotaResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRotas = useCallback(async () => {
    if (!userId) {
      setRotas([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await clienteRotaService.listar(userId);
      setRotas(data);
    } catch {
      setError("Não foi possível carregar suas rotas.");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchRotas();
  }, [fetchRotas]);

  const criar = useCallback(
    async (payload: CreateRotaPayload) => {
      if (!userId) return;
      await clienteRotaService.criar(userId, payload);
      await fetchRotas();
    },
    [userId, fetchRotas],
  );

  const atualizar = useCallback(
    async (id: string, payload: CreateRotaPayload) => {
      if (!userId) return;
      await clienteRotaService.atualizar(userId, id, payload);
      await fetchRotas();
    },
    [userId, fetchRotas],
  );

  const excluir = useCallback(
    async (id: string) => {
      if (!userId) return;
      await clienteRotaService.excluir(userId, id);
      await fetchRotas();
    },
    [userId, fetchRotas],
  );

  return {
    rotas,
    isLoading,
    error,
    refetch: fetchRotas,
    criar,
    atualizar,
    excluir,
  };
};
