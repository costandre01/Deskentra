import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { SubmitButton } from "@/components/forms";

import { toast } from "sonner";

import { ApiException } from "@/services/ApiException";

import ContactForm from "./ContactForm";

import { POSITION_OPTIONS } from "./ContactFormSchema";

import {
  useCreateContact,
  useUpdateContact,
} from "../Hooks";

import { useCompanies } from "@/features/Companies/Hooks";

import type { Contact } from "../Types/Contact";
import type { SaveContactRequest } from "../Types/SaveContactRequest";
import type { ContactFormValues } from "./ContactFormSchema";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  companyId: string;

  contact?: Contact;

  onSuccess?: () => void;
}

export default function ContactDialog({
  open,
  onOpenChange,
  companyId,
  contact,
  onSuccess,
}: ContactDialogProps) {
  const isEdit = contact !== undefined;

  const createContact = useCreateContact();
  const updateContact = useUpdateContact();

  const {
    data: companiesData,
  } = useCompanies();

  const companies =
    companiesData?.items ?? [];

  const isPredefinedPosition =
    contact &&
    POSITION_OPTIONS.includes(
      contact.position as (typeof POSITION_OPTIONS)[number]
    );

  const defaultValues:
    | ContactFormValues
    | undefined = contact
    ? {
        companyId: contact.companyId,

        firstName: contact.firstName,
        lastName: contact.lastName,

        email: contact.email,

        phoneNumber: contact.phoneNumber,
        mobileNumber:
          contact.mobileNumber,

        position:
          isPredefinedPosition
            ? contact.position
            : "Other",

        customPosition:
          isPredefinedPosition
            ? ""
            : contact.position,

        notes: contact.notes ?? "",

        isPrimary:
          contact.isPrimary,
      }
    : {
        companyId,

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

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="w-[95vw] sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit
              ? "Edit Contact"
              : "Create Contact"}
          </DialogTitle>
        </DialogHeader>

        <ContactForm
          companies={companies}
          defaultValues={defaultValues}
          loading={
            isEdit
              ? updateContact.isPending
              : createContact.isPending
          }
          onSubmit={async (
            data: ContactFormValues
          ) => {
            const request: SaveContactRequest = {
              companyId: data.companyId,

              firstName: data.firstName,
              lastName: data.lastName,

              email: data.email,

              phoneNumber:
                data.phoneNumber,

              mobileNumber:
                data.mobileNumber,

              position:
                data.position === "Other"
                  ? data.customPosition
                  : data.position,

              isPrimary:
                data.isPrimary,

              notes: data.notes,
            };

            try {
              if (isEdit && contact) {
                await updateContact.mutateAsync({
                  id: contact.id,
                  data: request,
                });

                toast.success(
                  "Contact updated successfully."
                );
              } else {
                await createContact.mutateAsync(
                  request
                );

                toast.success(
                  "Contact created successfully."
                );
              }

              onSuccess?.();
              onOpenChange(false);
            } catch (error) {
              if (
                error instanceof ApiException
              ) {
                toast.error(
                  error.message
                );
              } else {
                toast.error(
                  "Unexpected error."
                );
              }
            }
          }}
          onCancel={() =>
            onOpenChange(false)
          }
          submitButton={
            <SubmitButton
              loading={
                isEdit
                  ? updateContact.isPending
                  : createContact.isPending
              }
              label={
                isEdit
                  ? "Update Contact"
                  : "Create Contact"
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