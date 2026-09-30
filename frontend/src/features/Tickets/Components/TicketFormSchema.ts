import { z } from "zod";

import {
  TicketCategory,
  TicketPriority,
} from "../Types/Ticket";

const prioritySchema = z.preprocess(
  (value) => Number(value),
  z.union([
    z.literal(TicketPriority.Low),
    z.literal(TicketPriority.Medium),
    z.literal(TicketPriority.High),
    z.literal(TicketPriority.Critical),
  ])
);

const categorySchema = z.preprocess(
  (value) => Number(value),
  z.union([
    z.literal(TicketCategory.Bug),
    z.literal(TicketCategory.Support),
    z.literal(TicketCategory.FeatureRequest),
    z.literal(TicketCategory.Performance),
    z.literal(TicketCategory.Configuration),
    z.literal(TicketCategory.Question),
    z.literal(TicketCategory.Infrastructure),
  ])
);

export const ticketFormSchema = z.object({
  title: z
    .string()
    .min(2, "Ticket title must contain at least 2 characters.")
    .max(200, "Ticket title cannot exceed 200 characters."),

  description: z
    .string()
    .min(1, "Description is required.")
    .max(4000, "Description cannot exceed 4000 characters."),

  priority: prioritySchema,

  category: categorySchema,

  companyId: z
    .string()
    .min(1, "Company is required."),

  contactId: z
    .string()
    .min(1, "Contact is required."),
});

export type TicketFormInput = z.input<
  typeof ticketFormSchema
>;

export type TicketFormValues = z.infer<
  typeof ticketFormSchema
>;