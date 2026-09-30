import {
  Monitor,
  Moon,
  Sun,
} from "lucide-react";

import { Card } from "@/components/ui/card";

import { useTheme } from "@/components/theme/useTheme";
import type { Theme } from "@/components/theme/ThemeContext";

const themes: {
  value: Theme;
  label: string;
  description: string;
  icon: typeof Sun;
}[] = [
  {
    value: "light",
    label: "Light",
    description:
      "Use the light theme.",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    description:
      "Use the dark theme.",
    icon: Moon,
  },
  {
    value: "system",
    label: "System",
    description:
      "Follow your system preference.",
    icon: Monitor,
  },
];

export default function AppearanceSettings() {
  const {
    theme,
    setTheme,
  } = useTheme();

  return (
    <Card className="p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">
          Appearance
        </h2>

        <p className="text-sm text-muted-foreground">
          Customize how Deskentra looks on your device.
        </p>
      </div>

      <div className="mt-6 space-y-3">
        <div>
          <h3 className="text-sm font-medium">
            Theme
          </h3>

          <p className="text-sm text-muted-foreground">
            Select the theme you want to use.
          </p>
        </div>

        <div className="grid gap-3">
          {themes.map((item) => {
            const Icon = item.icon;

            const selected =
              theme === item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() =>
                  setTheme(item.value)
                }
                className={`flex items-center gap-4 rounded-lg border p-4 text-left transition-colors ${
                  selected
                    ? "border-primary bg-primary/5"
                    : "hover:bg-muted"
                }`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-md ${
                    selected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {item.label}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>

                {selected && (
                  <div className="h-2 w-2 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}