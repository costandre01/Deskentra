import {
  Palette,
  User,
  Bell,
  Shield,
} from "lucide-react";

interface SettingsSidebarProps {
  activeSection: string;
  onSectionChange: (
    section: string
  ) => void;
}

const sections = [
  {
    id: "appearance",
    label: "Appearance",
    icon: Palette,
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
  },
];

export default function SettingsSidebar({
  activeSection,
  onSectionChange,
}: SettingsSidebarProps) {
  return (
    <nav className="space-y-1">
      {sections.map((section) => {
        const Icon = section.icon;

        const isActive =
          activeSection === section.id;

        return (
          <button
            key={section.id}
            type="button"
            onClick={() =>
              onSectionChange(section.id)
            }
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Icon className="h-4 w-4" />

            {section.label}
          </button>
        );
      })}
    </nav>
  );
}