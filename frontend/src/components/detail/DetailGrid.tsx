import type { ReactNode } from "react";

interface DetailGridProps {
  children: ReactNode;
}

export default function DetailGrid({
  children,
}: DetailGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}