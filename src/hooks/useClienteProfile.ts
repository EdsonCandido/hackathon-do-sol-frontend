import { clienteProfileService } from "@/services/clienteProfileService";
import type { InteresseTurismo } from "@/types";
import { useCallback, useEffect, useState } from "react";

interface UseClienteProfileReturn {
  interesses: InteresseTurismo[];
  isSaving: boolean;
  toggleInteresse: (interesse: InteresseTurismo) => void;
  saveInteresses: (interesses: InteresseTurismo[]) => Promise<void>;
}

export const useClienteProfile = (
  userId: string | undefined,
): UseClienteProfileReturn => {
  const [interesses, setInteresses] = useState<InteresseTurismo[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!userId) {
      setInteresses([]);
      return;
    }
    const profile = clienteProfileService.get(userId);
    setInteresses(profile.interesses);
  }, [userId]);

  const saveInteresses = useCallback(
    async (next: InteresseTurismo[]) => {
      if (!userId) return;
      setIsSaving(true);
      try {
        clienteProfileService.saveInteresses(userId, next);
        setInteresses(next);
      } finally {
        setIsSaving(false);
      }
    },
    [userId],
  );

  const toggleInteresse = useCallback(
    (interesse: InteresseTurismo) => {
      const next = interesses.includes(interesse)
        ? interesses.filter((i) => i !== interesse)
        : [...interesses, interesse];
      saveInteresses(next);
    },
    [interesses, saveInteresses],
  );

  return { interesses, isSaving, toggleInteresse, saveInteresses };
};
