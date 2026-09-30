import type {
  Control,
  FieldPath,
  FieldValues,
} from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Checkbox } from "@/components/ui/checkbox";

interface FormCheckboxProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  disabled?: boolean;
}

export default function FormCheckbox<T extends FieldValues>({
  control,
  name,
  label,
  disabled = false,
}: FormCheckboxProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center space-x-3 rounded-md border p-4">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>

          <div className="space-y-1 leading-none">
            <FormLabel>{label}</FormLabel>
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}