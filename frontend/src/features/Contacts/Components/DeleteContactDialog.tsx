import { Loader2, Trash2 } from "lucide-react";

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

import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { toast } from "sonner";

import { useDeleteContact } from "../Hooks";
import type { Contact } from "../Types/Contact";

interface DeleteContactDialogProps {
  contact?: Contact;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function DeleteContactDialog({
  contact,
  open,
  onOpenChange,
  onSuccess,
}: DeleteContactDialogProps) {
  const deleteContact = useDeleteContact();

  async function handleDelete() {
    if (!contact) return;

    try {
      await deleteContact.mutateAsync(contact.id);

      toast.success("Contact deleted successfully.");

      onSuccess?.();

      onOpenChange(false);
    } catch {
      // ApiClient already handles errors
    }
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Contact
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <strong>
              {contact?.firstName} {contact?.lastName}
            </strong>
            ?
            <br />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={deleteContact.isPending}
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteContact.isPending}
            className={cn(
              buttonVariants({
                variant: "destructive",
              })
            )}
          >
            {deleteContact.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}