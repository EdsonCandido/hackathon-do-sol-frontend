import type { AuthUser, LoginRequest, LoginResponse } from "@/types";

const MOCK_USERS: Array<AuthUser & { password: string }> = [
  {
    id: "1",
    name: "Edson Admin",
    email: "admin@descubrarn.com",
    password: "123456",
    token: "mock-jwt-token-admin",
    role: "admin",
  },
  {
    id: "2",
    name: "Lucas Cliente",
    email: "cliente@descubrarn.com",
    password: "123456",
    token: "mock-jwt-token-cliente",
    role: "cliente",
  },
];

const AUTH_STORAGE_KEY = "solpotiguar_auth_user";

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const found = MOCK_USERS.find(
      (u) =>
        u.email.toLowerCase() === credentials.email.toLowerCase() &&
        u.password === credentials.password,
    );

    if (!found) {
      throw new Error("E-mail ou senha inválidos.");
    }

    const { password: _password, ...user } = found;
    return { user };
  },

  saveUser: (user: AuthUser): void => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  },

  getStoredUser: (): AuthUser | null => {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;

    try {
      const user = JSON.parse(raw) as AuthUser;
      if (!user.role) {
        user.role = user.email.includes("admin") ? "admin" : "cliente";
      }
      return user;
    } catch {
      return null;
    }
  },

  clearUser: (): void => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },
};
