import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { SubmitButton } from "@/components/forms";

import { toast } from "sonner";
import { ApiException } from "@/services/ApiException";

import { useAuth } from "@/features/Authentication/Context/useAuth";

import TicketForm from "./TicketForm";

import {
  useCreateTicket,
  useUpdateTicket,
} from "../Hooks";

import type { Ticket } from "../Types/Ticket";
import type { TicketFormValues } from "./TicketFormSchema";
import type { SaveTicketRequest } from "../Types/SaveTicketRequest";

import type { Contact } from "@/features/Contacts/Types/Contact";

interface SelectOption {
  value: string;
  label: string;
}

interface TicketDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  ticket?: Ticket;

  companies: SelectOption[];
  contacts: Contact[];

  onSuccess?: () => void;
}

export default function TicketDialog({
  open,
  onOpenChange,
  ticket,
  companies,
  contacts,
  onSuccess,
}: TicketDialogProps) {
  const { user } = useAuth();

  const isEdit = ticket !== undefined;

  const createTicket = useCreateTicket();
  const updateTicket = useUpdateTicket();

  const loading = isEdit
    ? updateTicket.isPending
    : createTicket.isPending;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Ticket" : "Create Ticket"}
          </DialogTitle>
        </DialogHeader>

        <TicketForm
          defaultValues={ticket}
          companies={companies}
          contacts={contacts}
          loading={loading}
          onSubmit={async (data: TicketFormValues) => {
            if (!user) {
              toast.error(
                "You must be authenticated to create a ticket."
              );
              return;
            }

            const request: SaveTicketRequest = {
              title: data.title,
              description: data.description,
              priority: data.priority,
              category: data.category,
              companyId: data.companyId,
              contactId: data.contactId,
              createdById: user.id,
            };

            try {
              if (isEdit && ticket) {
                await updateTicket.mutateAsync({
                  id: ticket.id,
                  data: request,
                });

                toast.success(
                  "Ticket updated successfully."
                );
              } else {
                await createTicket.mutateAsync(request);

                toast.success(
                  "Ticket created successfully."
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
              loading={loading}
              label={
                isEdit
                  ? "Update Ticket"
                  : "Create Ticket"
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