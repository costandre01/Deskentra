import { useEffect } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useDeleteTicket } from "../Hooks";

import type { Ticket } from "../Types/Ticket";

interface DeleteTicketDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticket?: Ticket;
}

export default function DeleteTicketDialog({
  open,
  onOpenChange,
  ticket,
}: DeleteTicketDialogProps) {
  const deleteTicket = useDeleteTicket();

  useEffect(() => {
    if (!open) {
      deleteTicket.reset();
    }
  }, [open, deleteTicket]);

  const handleDelete = async () => {
    if (!ticket) {
      return;
    }

    try {
      await deleteTicket.mutateAsync(ticket.id);
      onOpenChange(false);
    } catch {
      // Error is handled by the mutation state.
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete ticket?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <strong>{ticket?.title}</strong>?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={deleteTicket.isPending}
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteTicket.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteTicket.isPending
              ? "Deleting..."
              : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}