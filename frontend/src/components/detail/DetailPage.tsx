import type { ReactNode } from "react";
import PageContainer from "@/components/layout/PageContainer";

interface DetailPageProps {
  children: ReactNode;
}

export default function DetailPage({
  children,
}: DetailPageProps) {
  return (
    <PageContainer className="space-y-6">
      {children}
    </PageContainer>
  );
}