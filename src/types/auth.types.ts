export type UserRole = "admin" | "cliente";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthUser extends User {
  token: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: AuthUser;
}

export interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<AuthUser>;
  logout: () => void;
}
