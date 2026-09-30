import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import type { StatusChartItem } from "../types/StatusChartItem"

interface StatusChartProps {
    data: StatusChartItem[]
}

const COLORS = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
]

export default function StatusChart({
    data,
}: StatusChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Tickets by Status</CardTitle>

                <CardDescription>
                    Distribution of tickets by current status.
                </CardDescription>
            </CardHeader>

            <CardContent className="h-72">
                {data.length === 0 ? (
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                        No ticket statistics available.
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="count"
                                nameKey="status"
                                outerRadius={100}
                                label
                            >
                                {data.map((_, index) => (
                                    <Cell
                                        key={index}
                                        fill={
                                            COLORS[index % COLORS.length]
                                        }
                                    />
                                ))}
                            </Pie>

                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    )
}