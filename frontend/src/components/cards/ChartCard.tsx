import type { ReactNode } from "react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type ChartCardProps = {
  title: string
  description?: string
  children: ReactNode
}

export default function ChartCard({
  title,
  description,
  children,
}: ChartCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>

        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </CardHeader>

      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}