import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import {
  FormInput,
  FormSelect,
} from "@/components/forms";

import type { Ticket } from "../Types/Ticket";
import {
  TicketCategory,
  TicketPriority,
} from "../Types/Ticket";

import type { Contact } from "@/features/Contacts/Types/Contact";

import {
  ticketFormSchema,
  type TicketFormInput,
  type TicketFormValues,
} from "./TicketFormSchema";

import type { ReactNode } from "react";

import { Textarea } from "@/components/ui/textarea";

interface SelectOption {
  value: string;
  label: string;
}

interface TicketFormProps {
  defaultValues?: Partial<Ticket>;

  companies: SelectOption[];
  contacts: Contact[];

  loading?: boolean;

  onSubmit: (
    data: TicketFormValues
  ) => void | Promise<void>;

  onCancel?: () => void;

  submitButton?: ReactNode;
}

const emptyValues: TicketFormInput = {
  title: "",
  description: "",
  priority: TicketPriority.Medium,
  category: TicketCategory.Bug,
  companyId: "",
  contactId: "",
};

const priorityOptions: SelectOption[] = [
  {
    value: String(TicketPriority.Low),
    label: "Low",
  },
  {
    value: String(TicketPriority.Medium),
    label: "Medium",
  },
  {
    value: String(TicketPriority.High),
    label: "High",
  },
  {
    value: String(TicketPriority.Critical),
    label: "Critical",
  },
];

const categoryOptions: SelectOption[] = [
  {
    value: String(TicketCategory.Bug),
    label: "Bug",
  },
  {
    value: String(TicketCategory.Support),
    label: "Support",
  },
  {
    value: String(TicketCategory.FeatureRequest),
    label: "Feature Request",
  },
  {
    value: String(TicketCategory.Performance),
    label: "Performance",
  },
  {
    value: String(TicketCategory.Configuration),
    label: "Configuration",
  },
  {
    value: String(TicketCategory.Question),
    label: "Question",
  },
  {
    value: String(TicketCategory.Infrastructure),
    label: "Infrastructure",
  },
];

export default function TicketForm({
  defaultValues,
  companies,
  contacts,
  loading = false,
  onSubmit,
  onCancel,
  submitButton,
}: TicketFormProps) {
  const form = useForm<
    TicketFormInput,
    unknown,
    TicketFormValues
  >({
    resolver: zodResolver(ticketFormSchema),

    defaultValues: defaultValues
      ? {
          title: defaultValues.title ?? "",
          description:
            defaultValues.description ?? "",
          priority:
            defaultValues.priority ??
            TicketPriority.Medium,
          category:
            defaultValues.category ??
            TicketCategory.Bug,
          companyId:
            defaultValues.companyId ?? "",
          contactId:
            defaultValues.contactId ?? "",
        }
      : emptyValues,
  });

  const selectedCompanyId = useWatch({
    control: form.control,
    name: "companyId",
  });

  const filteredContacts = contacts
    .filter(
      (contact) =>
        contact.companyId === selectedCompanyId
    )
    .map((contact) => ({
      value: contact.id,
      label: `${contact.firstName} ${contact.lastName}`,
    }));

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <FormInput
              control={form.control}
              name="title"
              label="Title"
              placeholder="Describe the issue..."
              disabled={loading}
            />
          </div>

          <FormSelect
            control={form.control}
            name="companyId"
            label="Company"
            placeholder="Select company"
            options={companies}
            disabled={loading}
          />

          <FormSelect
            control={form.control}
            name="contactId"
            label="Contact"
            placeholder={
              selectedCompanyId
                ? "Select contact"
                : "Select company first"
            }
            options={filteredContacts}
            disabled={
              loading || !selectedCompanyId
            }
          />

          <FormSelect
            control={form.control}
            name="priority"
            label="Priority"
            placeholder="Select priority"
            options={priorityOptions}
            disabled={loading}
          />

          <FormSelect
            control={form.control}
            name="category"
            label="Category"
            placeholder="Select category"
            options={categoryOptions}
            disabled={loading}
          />

          <div className="col-span-2 grid gap-2">
            <label
              htmlFor="description"
              className="text-sm font-medium"
            >
              Description
            </label>

            <Textarea
              id="description"
              placeholder="Describe the problem in detail..."
              className="min-h-45 resize-y"
              disabled={loading}
              {...form.register("description")}
            />

            {form.formState.errors.description && (
              <p className="text-sm text-destructive">
                {form.formState.errors.description.message}
              </p>
            )}
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
        </div>
      </form>
    </Form>
  );
}