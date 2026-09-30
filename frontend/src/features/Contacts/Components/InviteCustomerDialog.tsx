import { useState } from "react";
import { Loader2, Mail } from "lucide-react";

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

import { toast } from "sonner";

import { ApiException } from "@/services/ApiException";

import {
  useCreateContactInvitation,
  useResendContactInvitation,
} from "../Hooks";

import type { Contact } from "../Types/Contact";

interface InviteCustomerDialogProps {
  contact?: Contact;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function InviteCustomerDialog({
  contact,
  open,
  onOpenChange,
  onSuccess,
}: InviteCustomerDialogProps) {
  const createInvitation =
    useCreateContactInvitation();

  const resendInvitation =
    useResendContactInvitation();

  const [showResendConfirm, setShowResendConfirm] =
    useState(false);

  async function handleInvite() {
    if (!contact) return;

    try {
      await createInvitation.mutateAsync(
        contact.id
      );

      toast.success(
        "Customer invitation created successfully."
      );

      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error(
        "INVITATION ERROR:",
        error
      );

      if (error instanceof ApiException) {
        if (
          error.status === 409 &&
          error.message.includes(
            "already has an active invitation"
          )
        ) {
          setShowResendConfirm(true);
          return;
        }

        toast.error(error.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(
          "Failed to create customer invitation."
        );
      }
    }
  }

  async function handleResend() {
    if (!contact) return;

    console.log(
      "RESEND CLICKED:",
      contact.id
    );

    try {
      const result =
        await resendInvitation.mutateAsync(
          contact.id
        );

      console.log(
        "RESEND SUCCESS:",
        result
      );

      toast.success(
        "Customer invitation resent successfully."
      );

      setShowResendConfirm(false);
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error(
        "RESEND ERROR:",
        error
      );

      if (error instanceof ApiException) {
        toast.error(error.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(
          "Failed to resend customer invitation."
        );
      }
    }
  }

  const isPending =
    createInvitation.isPending ||
    resendInvitation.isPending;

  return (
    <AlertDialog
      open={open}
      onOpenChange={(value) => {
        if (!value && !isPending) {
          setShowResendConfirm(false);
        }

        onOpenChange(value);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {showResendConfirm
              ? "Invitation Already Sent"
              : "Invite Customer"}
          </AlertDialogTitle>

          <AlertDialogDescription>
            {showResendConfirm ? (
              <>
                An active invitation already exists
                for{" "}
                <strong>
                  {contact?.firstName}{" "}
                  {contact?.lastName}
                </strong>
                .
                <br />
                <br />
                Do you want to invalidate the
                previous invitation and send a new
                one?
                <br />
                <br />
                The previous invitation will no
                longer be valid.
              </>
            ) : (
              <>
                Are you sure you want to invite{" "}
                <strong>
                  {contact?.firstName}{" "}
                  {contact?.lastName}
                </strong>{" "}
                to access the Deskentra customer
                portal?
                <br />
                <br />
                The invitation will be created for{" "}
                <strong>
                  {contact?.email}
                </strong>
                .
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isPending}
            onClick={() => {
              setShowResendConfirm(false);
            }}
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={isPending}
            onClick={(event) => {
              event.preventDefault();

              if (showResendConfirm) {
                void handleResend();
              } else {
                void handleInvite();
              }
            }}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                {showResendConfirm
                  ? "Resending..."
                  : "Creating..."}
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />

                {showResendConfirm
                  ? "Resend & Invalidate"
                  : "Invite Customer"}
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}