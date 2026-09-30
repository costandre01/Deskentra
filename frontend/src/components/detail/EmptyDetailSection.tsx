import type { ReactNode } from "react";

import DetailSection from "./DetailSection";

interface EmptyDetailSectionProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export default function EmptyDetailSection({
  title,
  description,
  action,
}: EmptyDetailSectionProps) {
  return (
    <DetailSection
      title={title}
      action={action}
    >
      <div className="py-8 text-center text-sm text-muted-foreground">
        {description}
      </div>
    </DetailSection>
  );
}