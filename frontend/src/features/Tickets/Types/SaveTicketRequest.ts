import type {
  TicketCategory,
  TicketPriority,
} from "./Ticket";

export interface SaveTicketRequest {
  title: string;
  description: string;
  priority: TicketPriority;
  category: TicketCategory;
  companyId: string;
  contactId: string;
  createdById: string;
}