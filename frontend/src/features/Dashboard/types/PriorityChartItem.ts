import type { TicketPriority } from "@/types/enums/TicketPriority";

export interface PriorityChartItem {
  priority: TicketPriority;
  count: number;
}