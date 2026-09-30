import {
  Moon,
  Sun,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { useTheme } from "./useTheme";

export default function ThemeToggle() {
  const {
    resolvedTheme,
    toggleTheme,
  } = useTheme();

  const isDark =
    resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}