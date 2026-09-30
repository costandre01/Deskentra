import { useState } from "react";
import { useParams } from "react-router-dom";

import {
  DetailPage,
  DetailState,
} from "@/components/detail";

import ContactHeader from "../Components/ContactHeader";
import ContactOverview from "../Components/ContactOverview";
import ContactDialog from "../Components/ContactDialog";
import DeleteContactDialog from "../Components/DeleteContactDialog";

import { useContact } from "../Hooks";

export default function ContactDetailsPage() {
  const { id } = useParams();

  const [
    isContactDialogOpen,
    setContactDialogOpen,
  ] = useState(false);

  const [
    isDeleteDialogOpen,
    setDeleteDialogOpen,
  ] = useState(false);

  const {
    data: contact,
    isLoading,
    error,
  } = useContact(id!);

  return (
    <DetailState
      isLoading={isLoading}
      error={error}
      data={contact}
      errorMessage="Failed to load contact."
      notFoundMessage="Contact not found."
    >
      {(contact) => (
        <DetailPage>
          <ContactHeader
            contact={contact}
            onEdit={() =>
              setContactDialogOpen(true)
            }
            onDelete={() =>
              setDeleteDialogOpen(true)
            }
          />

          <ContactOverview
            contact={contact}
          />

          <ContactDialog
            open={isContactDialogOpen}
            onOpenChange={
              setContactDialogOpen
            }
            contact={contact}
            companyId={contact.companyId}
            onSuccess={() => {
              setContactDialogOpen(false);
            }}
          />

          <DeleteContactDialog
            open={isDeleteDialogOpen}
            onOpenChange={
              setDeleteDialogOpen
            }
            contact={contact}
            onSuccess={() => {
              setDeleteDialogOpen(false);
            }}
          />
        </DetailPage>
      )}
    </DetailState>
  );
}