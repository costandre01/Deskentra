import StatCard from "@/components/cards/StatCard"

import type { DashboardResponse } from "../types/DashboardResponse"

interface DashboardCardsProps {
    dashboard: DashboardResponse
}

export default function DashboardCards({
    dashboard,
}: DashboardCardsProps) {
    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <StatCard
                title="Total Tickets"
                value={dashboard.totalTickets}
            />

            <StatCard
                title="Open Tickets"
                value={dashboard.openTickets}
            />

            <StatCard
                title="Assigned"
                value={dashboard.assignedTickets}
            />

            <StatCard
                title="In Progress"
                value={dashboard.inProgressTickets}
            />

            <StatCard
                title="Waiting Customer"
                value={dashboard.waitingCustomerTickets}
            />

            <StatCard
                title="Closed Today"
                value={dashboard.closedTodayTickets}
            />
        </div>
    )
}