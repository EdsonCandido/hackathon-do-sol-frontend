import { rotaService } from "@/services/rotaService";
import type { RotaResponse } from "@/types";
import { useCallback, useEffect, useState } from "react";

interface UseRotasOptions {
  apenasAtivas?: boolean;
}

interface UseRotasReturn {
  rotas: RotaResponse[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useRotas = (options: UseRotasOptions = {}): UseRotasReturn => {
  const { apenasAtivas = false } = options;
  const [rotas, setRotas] = useState<RotaResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRotas = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = apenasAtivas
        ? await rotaService.listarAtivas()
        : await rotaService.listar();
      setRotas(data);
    } catch {
      setError("Não foi possível carregar as rotas.");
    } finally {
      setIsLoading(false);
    }
  }, [apenasAtivas]);

  useEffect(() => {
    fetchRotas();
  }, [fetchRotas]);

  return { rotas, isLoading, error, refetch: fetchRotas };
};
