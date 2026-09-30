import type { ReactNode } from "react";

interface InfoFieldProps {
  label: string;
  icon?: ReactNode;
  children?: ReactNode;
}

export default function InfoField({
  label,
  icon,
  children,
}: InfoFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>

      <div className="text-sm wrap-break-word">
        {children ?? "-"}
      </div>
    </div>
  );
}