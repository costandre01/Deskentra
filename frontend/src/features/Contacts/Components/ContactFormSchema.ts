import { z } from "zod";

export const POSITION_OPTIONS = [
  "Account Manager",
  "CEO",
  "CFO",
  "COO",
  "CTO",
  "Developer",
  "HR Manager",
  "IT Manager",
  "Project Manager",
  "Sales Manager",
  "Software Engineer",
  "Support Engineer",
  "System Administrator",
  "Other",
] as const;

export const contactFormSchema = z
  .object({
    companyId: z.string().min(1, "Please select a company."),

    firstName: z
      .string()
      .min(
        2,
        "First name must contain at least 2 characters."
      ),

    lastName: z
      .string()
      .min(
        2,
        "Last name must contain at least 2 characters."
      ),

    email: z.email("Invalid email address."),

    phoneNumber: z.string(),

    mobileNumber: z.string(),

    position: z.string(),

    customPosition: z.string(),

    notes: z.string(),

    isPrimary: z.boolean(),
  })
  .refine(
    (data) =>
      data.position !== "Other" ||
      data.customPosition.trim().length > 0,
    {
      message: "Please enter a position.",
      path: ["customPosition"],
    }
  );

export type ContactFormValues = z.infer<
  typeof contactFormSchema
>;