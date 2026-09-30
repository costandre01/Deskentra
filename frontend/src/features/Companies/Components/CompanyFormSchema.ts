import { z } from "zod";

export const companyFormSchema = z.object({
  name: z
    .string()
    .min(2, "Company name must contain at least 2 characters."),

  vatNumber: z
    .string()
    .min(1, "VAT Number is required."),

  email: z
    .email("Invalid email address."),

  phoneNumber: z.string(),

  website: z.string(),

  address: z.string(),

  city: z.string(),

  postalCode: z.string(),

  country: z
    .string()
    .min(1, "Country is required."),
});

export type CompanyFormValues = z.infer<
  typeof companyFormSchema
>;