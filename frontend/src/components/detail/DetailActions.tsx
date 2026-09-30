import type { ReactNode } from "react";

interface DetailActionsProps {
  children: ReactNode;
}

export default function DetailActions({
  children,
}: DetailActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {children}
    </div>
  );
}