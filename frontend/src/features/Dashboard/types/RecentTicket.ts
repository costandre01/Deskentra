import type { TicketPriority } from "@/types/enums/TicketPriority";
import type { TicketStatus } from "@/types/enums/TicketStatus";

export interface RecentTicket {
  id: string;
  title: string;
  companyName: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  assignedTo: string;
}