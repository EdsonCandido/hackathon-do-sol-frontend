import type { ClienteProfile, InteresseTurismo } from "@/types";

const profileKey = (userId: string) => `solpotiguar_cliente_profile_${userId}`;

const defaultProfile = (): ClienteProfile => ({ interesses: [] });

export const clienteProfileService = {
  get: (userId: string): ClienteProfile => {
    const raw = localStorage.getItem(profileKey(userId));
    if (!raw) return defaultProfile();

    try {
      return JSON.parse(raw) as ClienteProfile;
    } catch {
      return defaultProfile();
    }
  },

  saveInteresses: (
    userId: string,
    interesses: InteresseTurismo[],
  ): ClienteProfile => {
    const profile: ClienteProfile = { interesses };
    localStorage.setItem(profileKey(userId), JSON.stringify(profile));
    return profile;
  },
};
