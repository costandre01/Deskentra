import { createContext } from "react";

import type { AuthUser } from "../Types/AuthUser";

export interface AuthContextType {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;

  login(
    email: string,
    password: string
  ): Promise<void>;

  logout(): void;

  updateUser(user: AuthUser): void;
}

export const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );