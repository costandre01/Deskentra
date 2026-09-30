import { useState, type ReactNode } from "react";

import { authService } from "../Services/auth.service";
import type { AuthUser } from "../Types/AuthUser";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem("access_token")
  );

  const [user, setUser] =
    useState<AuthUser | null>(() => {
      const storedUser =
        localStorage.getItem("user");

      return storedUser
        ? JSON.parse(storedUser)
        : null;
    });

  const isAuthenticated = !!token;

  async function login(
    email: string,
    password: string
  ) {
    const response =
      await authService.login({
        email,
        password,
      });

    localStorage.setItem(
      "access_token",
      response.token
    );

    localStorage.setItem(
      "expires_at",
      response.expiresAt
    );

    localStorage.setItem(
      "user",
      JSON.stringify(response.user)
    );

    setToken(response.token);
    setUser(response.user);
  }

  function logout() {
    localStorage.removeItem(
      "access_token"
    );

    localStorage.removeItem(
      "expires_at"
    );

    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  }

  function updateUser(updatedUser: AuthUser) {
    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}