import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}

export default function Section({
  title,
  description,
  children,
  action,
  className,
}: SectionProps) {
  return (
    <section className={cn("space-y-4", className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            {title}
          </h2>

          {description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        {action && <div>{action}</div>}
      </div>

      {children}
    </section>
  );
}