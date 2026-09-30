import { z } from "zod";

export const userFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must contain at least 2 characters."),

  lastName: z
    .string()
    .min(2, "Last name must contain at least 2 characters."),

  email: z
    .string()
    .email("Invalid email address."),

  password: z
    .string()
    .optional(),

  role: z
    .coerce
    .number()
    .int()
    .min(0)
    .max(4),

  isActive: z.boolean(),
});

export type UserFormInput = z.input<
  typeof userFormSchema
>;

export type UserFormValues = z.output<
  typeof userFormSchema
>;