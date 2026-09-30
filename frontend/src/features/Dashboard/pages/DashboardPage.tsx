import { useEffect, useState } from "react"

import PageContainer from "@/components/layout/PageContainer"
import Section from "@/components/layout/Section"

import Loading from "@/components/states/Loading"
import ErrorState from "@/components/states/ErrorState"
import EmptyState from "@/components/states/EmptyState"

import DashboardCards from "../Components/DashboardCards"

import { getDashboard } from "../services/dashboard.service"
import type { DashboardResponse } from "../types/DashboardResponse"
import { RecentTicketsTable } from "../Components/RecentTicketsTable"
import StatusChart from "../Components/StatusChart"
import PriorityChart from "../Components/PriorityChart"

export default function DashboardPage() {
    const [dashboard, setDashboard] = useState<DashboardResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadDashboard() {
            try {
                const data = await getDashboard()

                setDashboard(data)
            } catch (err) {
                console.error(err)

                if (err instanceof Error) {
                    setError(err.message)
                } else {
                    setError("Unknown error")
                }
            } finally {
                setLoading(false)
            }
        }

        loadDashboard()
    }, [])

    if (loading) {
        return <Loading message="Loading dashboard..." />
    }

    if (error) {
        return <ErrorState message={error} />
    }

    if (!dashboard) {
        return <EmptyState message="No dashboard data available." />
    }

    return (
        <PageContainer className="space-y-10">
          <Section
              title="Statistics"
              description="Overview of your support platform."
          >
              <DashboardCards dashboard={dashboard} />
          </Section>

          <Section
              title="Analytics"
              description="Ticket distribution."
          >
              <div className="grid gap-6 lg:grid-cols-2">
                  <StatusChart
                      data={dashboard.statusChart}
                  />

                  <PriorityChart
                      data={dashboard.priorityChart}
                  />
              </div>
          </Section>

          <Section
              title="Recent Tickets"
              description="Latest support activity."
          >
              <RecentTicketsTable
                  tickets={dashboard.recentTickets}
              />
          </Section>

      </PageContainer>
    )
}