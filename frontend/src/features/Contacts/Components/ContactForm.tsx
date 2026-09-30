import type { ReactNode } from "react";

import {
  useForm,
  useWatch,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Form } from "@/components/ui/form";

import {
  FormCheckbox,
  FormInput,
} from "@/components/forms";

import {
  contactFormSchema,
  POSITION_OPTIONS,
  type ContactFormValues,
} from "./ContactFormSchema";

interface CompanyOption {
  id: string;
  name: string;
}

interface ContactFormProps {
  defaultValues?: ContactFormValues;

  companies: CompanyOption[];

  loading?: boolean;

  onSubmit: (
    data: ContactFormValues
  ) => void | Promise<void>;

  onCancel?: () => void;

  submitButton?: ReactNode;
}

const emptyValues: ContactFormValues = {
  companyId: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  mobileNumber: "",
  position: "",
  customPosition: "",
  notes: "",
  isPrimary: false,
};

export default function ContactForm({
  defaultValues = emptyValues,
  companies,
  loading = false,
  onSubmit,
  onCancel,
  submitButton,
}: ContactFormProps) {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  const selectedPosition = useWatch({
    control: form.control,
    name: "position",
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-2 gap-4">

          {/* Company */}
          <div className="col-span-2 space-y-2">
            <label className="text-sm font-medium">
              Company
            </label>

            <Select
              value={form.getValues("companyId")}
              onValueChange={(value) => {
                form.setValue(
                  "companyId",
                  value,
                  {
                    shouldValidate: true,
                  }
                );
              }}
              disabled={loading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a company" />
              </SelectTrigger>

              <SelectContent>
                {companies.map((company) => (
                  <SelectItem
                    key={company.id}
                    value={company.id}
                  >
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {form.formState.errors.companyId && (
              <p className="text-sm text-destructive">
                {
                  form.formState.errors.companyId
                    .message
                }
              </p>
            )}
          </div>

          {/* First Name */}
          <FormInput
            control={form.control}
            name="firstName"
            label="First Name"
            placeholder="John"
          />

          {/* Last Name */}
          <FormInput
            control={form.control}
            name="lastName"
            label="Last Name"
            placeholder="Doe"
          />

          {/* Email */}
          <FormInput
            control={form.control}
            name="email"
            label="Email"
            type="email"
            placeholder="john@company.com"
          />

          {/* Phone */}
          <FormInput
            control={form.control}
            name="phoneNumber"
            label="Phone Number"
            placeholder="+351 912 345 678"
          />

          {/* Mobile */}
          <FormInput
            control={form.control}
            name="mobileNumber"
            label="Mobile Number"
            placeholder="+351 912 345 678"
          />

          {/* Position */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Position
            </label>

            <Select
              value={selectedPosition}
              onValueChange={(value) => {
                form.setValue(
                  "position",
                  value,
                  {
                    shouldValidate: true,
                  }
                );

                if (value !== "Other") {
                  form.setValue(
                    "customPosition",
                    ""
                  );
                }
              }}
              disabled={loading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a position" />
              </SelectTrigger>

              <SelectContent>
                {POSITION_OPTIONS.map(
                  (position) => (
                    <SelectItem
                      key={position}
                      value={position}
                    >
                      {position}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Custom Position */}
          {selectedPosition === "Other" && (
            <FormInput
              control={form.control}
              name="customPosition"
              label="Other Position"
              placeholder="Enter position"
            />
          )}

          {/* Notes */}
          <div className="col-span-2">
            <FormInput
              control={form.control}
              name="notes"
              label="Notes"
              placeholder="Additional information about this contact..."
            />
          </div>

          {/* Primary */}
          <div className="col-span-2">
            <FormCheckbox
              control={form.control}
              name="isPrimary"
              label="Primary Contact"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>

          {submitButton}
        </div>
      </form>
    </Form>
  );
}