import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DetailSectionProps {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}

export default function DetailSection({
  title,
  children,
  action,
}: DetailSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>

        {action}
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  );
}