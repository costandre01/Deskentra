import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  ThemeContext,
  type Theme,
} from "./ThemeContext";

interface ThemeProviderProps {
  children: ReactNode;
}

function getSystemTheme():
  | "light"
  | "dark" {
  return window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches
    ? "dark"
    : "light";
}

export function ThemeProvider({
  children,
}: ThemeProviderProps) {
  const [theme, setThemeState] =
    useState<Theme>(() => {
      const savedTheme =
        localStorage.getItem(
          "Deskentra-theme"
        );

      if (
        savedTheme === "light" ||
        savedTheme === "dark" ||
        savedTheme === "system"
      ) {
        return savedTheme;
      }

      return "dark";
    });

  const [systemTheme, setSystemTheme] =
    useState<"light" | "dark">(
      getSystemTheme
    );

  const resolvedTheme =
    theme === "system"
      ? systemTheme
      : theme;

  useEffect(() => {
    const mediaQuery =
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      );

    const handleChange = () => {
      setSystemTheme(
        mediaQuery.matches
          ? "dark"
          : "light"
      );
    };

    mediaQuery.addEventListener(
      "change",
      handleChange
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleChange
      );
    };
  }, []);

  useEffect(() => {
    const root =
      document.documentElement;

    root.classList.remove(
      "light",
      "dark"
    );

    root.classList.add(
      resolvedTheme
    );

    localStorage.setItem(
      "Deskentra-theme",
      theme
    );
  }, [theme, resolvedTheme]);

  const setTheme = (
    newTheme: Theme
  ) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState(
      resolvedTheme === "dark"
        ? "light"
        : "dark"
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}