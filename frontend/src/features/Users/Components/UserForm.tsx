import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import {
  FormInput,
  FormSelect,
} from "@/components/forms";

import type { User } from "../Types/User";

import {
  userFormSchema,
  type UserFormInput,
  type UserFormValues,
} from "./UserFormSchema";

import type { ReactNode } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface UserFormProps {
  defaultValues?: Partial<User>;

  loading?: boolean;

  onSubmit: (
    data: UserFormValues
  ) => void | Promise<void>;

  onCancel?: () => void;

  submitButton?: ReactNode;
}

const emptyValues: UserFormInput = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: 3,
  isActive: true,
};

const roleOptions: SelectOption[] = [
  {
    value: "0",
    label: "Super Administrator",
  },
  {
    value: "1",
    label: "Administrator",
  },
  {
    value: "2",
    label: "Supervisor",
  },
  {
    value: "3",
    label: "Technician",
  },
  {
    value: "4",
    label: "Customer",
  },
];

export default function UserForm({
  defaultValues,
  loading = false,
  onSubmit,
  onCancel,
  submitButton,
}: UserFormProps) {
  const form = useForm<
    UserFormInput,
    unknown,
    UserFormValues
  >({
    resolver: zodResolver(userFormSchema),

    defaultValues: defaultValues
      ? {
          firstName:
            defaultValues.firstName ?? "",

          lastName:
            defaultValues.lastName ?? "",

          email:
            defaultValues.email ?? "",

          password: "",

          role:
            defaultValues.role ?? 3,

          isActive:
            defaultValues.isActive ?? true,
        }
      : emptyValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            control={form.control}
            name="firstName"
            label="First Name"
            placeholder="Enter first name"
            disabled={loading}
          />

          <FormInput
            control={form.control}
            name="lastName"
            label="Last Name"
            placeholder="Enter last name"
            disabled={loading}
          />

          <FormInput
            control={form.control}
            name="email"
            label="Email"
            type="email"
            placeholder="user@example.com"
            disabled={loading}
          />

          <FormInput
            control={form.control}
            name="password"
            label="Password"
            type="password"
            placeholder="Enter password"
            disabled={loading}
          />

          <FormSelect
            control={form.control}
            name="role"
            label="Role"
            placeholder="Select role"
            options={roleOptions}
            disabled={loading}
          />
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