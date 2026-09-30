import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import CompanyForm from "./CompanyForm";

import {
  useCreateCompany,
  useUpdateCompany,
} from "../Hooks";

import { toast } from "sonner";

import { ApiException } from "@/services/ApiException";
import { SubmitButton } from "@/components/forms";

import type { Company } from "../Types/Company";

interface CompanyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  company?: Company;
  onSuccess?: () => void;
}

export default function CompanyDialog({
  open,
  onOpenChange,
  company,
  onSuccess,
}: CompanyDialogProps) {
  const isEdit = company !== undefined;

  const createCompany = useCreateCompany();
  const updateCompany = useUpdateCompany();

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-5xl">
        <DialogHeader className="pb-3">
          <DialogTitle>
            {isEdit
              ? "Edit Company"
              : "Create Company"}
          </DialogTitle>
        </DialogHeader>

        <CompanyForm
          defaultValues={company}
          loading={
            isEdit
              ? updateCompany.isPending
              : createCompany.isPending
          }
          onSubmit={async (data) => {
            try {
              if (isEdit && company) {
                await updateCompany.mutateAsync({
                  id: company.id,
                  data,
                });

                toast.success(
                  "Company updated successfully."
                );
              } else {
                await createCompany.mutateAsync(data);

                toast.success(
                  "Company created successfully."
                );
              }

              onSuccess?.();

              onOpenChange(false);
            } catch (error) {
              if (error instanceof ApiException) {
                toast.error(error.message);
              } else {
                toast.error("Unexpected error.");
              }
            }
          }}
          onCancel={() => onOpenChange(false)}
          submitButton={
            <SubmitButton
              loading={
                isEdit
                  ? updateCompany.isPending
                  : createCompany.isPending
              }
              label={
                isEdit
                  ? "Update Company"
                  : "Create Company"
              }
              loadingLabel={
                isEdit
                  ? "Updating..."
                  : "Creating..."
              }
            />
          }
        />
      </DialogContent>
    </Dialog>
  );
}