import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { FormInput } from "@/components/forms";

import type { SaveCompanyRequest } from "../Types/SaveCompanyRequest";
import { companyFormSchema } from "./CompanyFormSchema";

import type { ReactNode } from "react";

interface CompanyFormProps {
  defaultValues?: SaveCompanyRequest;
  loading?: boolean;
  onSubmit: (data: SaveCompanyRequest) => void | Promise<void>;
  onCancel?: () => void;
  submitButton?: ReactNode;
}

const emptyValues: SaveCompanyRequest = {
  name: "",
  vatNumber: "",
  email: "",
  phoneNumber: "",
  website: "",
  address: "",
  city: "",
  postalCode: "",
  country: "",
};

export default function CompanyForm({
  defaultValues = emptyValues,
  loading = false,
  onSubmit,
  onCancel,
  submitButton,
}: CompanyFormProps) {
  const form = useForm<SaveCompanyRequest>({
    resolver: zodResolver(companyFormSchema),
    defaultValues,
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
            name="name"
            label="Company Name"
            placeholder="Deskentra"
          />

          <FormInput
            control={form.control}
            name="vatNumber"
            label="VAT Number"
            placeholder="123456789"
          />

          <FormInput
            control={form.control}
            name="email"
            label="Email"
            type="email"
            placeholder="company@email.com"
          />

          <FormInput
            control={form.control}
            name="phoneNumber"
            label="Phone Number"
            placeholder="+351 912 345 678"
          />

          <FormInput
            control={form.control}
            name="website"
            label="Website"
            placeholder="https://company.com"
          />

          <FormInput
            control={form.control}
            name="country"
            label="Country"
            placeholder="Portugal"
          />

          <div className="col-span-2">
            <FormInput
              control={form.control}
              name="address"
              label="Address"
              placeholder="Street, number..."
            />
          </div>

          <FormInput
            control={form.control}
            name="city"
            label="City"
            placeholder="Leiria"
          />

          <FormInput
            control={form.control}
            name="postalCode"
            label="Postal Code"
            placeholder="2400-000"
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