export const TicketStatus = {
  New: 1,
  Assigned: 2,
  InProgress: 3,
  WaitingForCustomer: 4,
  Resolved: 5,
  Closed: 6,
} as const;

export type TicketStatus =
  (typeof TicketStatus)[keyof typeof TicketStatus];


export const TicketPriority = {
  Low: 1,
  Medium: 2,
  High: 3,
  Critical: 4,
} as const;

export type TicketPriority =
  (typeof TicketPriority)[keyof typeof TicketPriority];


export const TicketCategory = {
  Bug: 1,
  Support: 2,
  FeatureRequest: 3,
  Performance: 4,
  Configuration: 5,
  Question: 6,
  Infrastructure: 7,
} as const;

export type TicketCategory =
  (typeof TicketCategory)[keyof typeof TicketCategory];


export interface Ticket {
  id: string;

  title: string;
  description: string;

  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;

  companyId: string;
  companyName: string;

  contactId: string;
  contactName: string;

  createdById: string;
  createdByName: string;

  assignedToId?: string | null;
  assignedToName?: string | null;

  createdAt: string;
  updatedAt?: string | null;
  closedAt?: string | null;
}