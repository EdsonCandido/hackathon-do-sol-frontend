import { clienteService } from "@/services/clienteService";
import type { ClienteResponse } from "@/types";
import { useCallback, useEffect, useState } from "react";

interface UseClientesReturn {
  clientes: ClienteResponse[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useClientes = (): UseClientesReturn => {
  const [clientes, setClientes] = useState<ClienteResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClientes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await clienteService.listar();
      setClientes(data);
    } catch {
      setError("Não foi possível carregar os clientes.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClientes();
  }, [fetchClientes]);

  return { clientes, isLoading, error, refetch: fetchClientes };
};
