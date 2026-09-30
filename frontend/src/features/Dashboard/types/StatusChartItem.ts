import type { TicketStatus } from "@/types/enums/TicketStatus";

export interface StatusChartItem {
  status: TicketStatus;
  count: number;
}