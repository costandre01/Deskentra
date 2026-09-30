import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { PriorityChartItem } from "../types/PriorityChartItem";

interface PriorityChartProps {
  data: PriorityChartItem[];
}

const COLORS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#3b82f6",
];

export default function PriorityChart({
  data,
}: PriorityChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tickets by Priority</CardTitle>

        <CardDescription>
          Distribution of tickets by priority.
        </CardDescription>
      </CardHeader>

      <CardContent className="h-72">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No priority statistics available.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="priority"
                outerRadius={100}
                label
              >
                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}