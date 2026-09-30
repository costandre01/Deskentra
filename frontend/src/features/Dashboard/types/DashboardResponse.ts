import type { PriorityChartItem } from "./PriorityChartItem";
import type { RecentTicket } from "./RecentTicket";
import type { StatusChartItem } from "./StatusChartItem";
import type { TopAgent } from "./TopAgent";

export interface DashboardResponse {
  totalTickets: number;
  openTickets: number;
  assignedTickets: number;
  inProgressTickets: number;
  waitingCustomerTickets: number;
  closedTodayTickets: number;

  statusChart: StatusChartItem[];
  priorityChart: PriorityChartItem[];

  recentTickets: RecentTicket[];

  topAgents: TopAgent[];
}