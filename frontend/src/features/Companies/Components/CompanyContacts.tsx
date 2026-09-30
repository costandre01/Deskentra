import {
  useMemo,
  useState,
} from "react";

import { Plus } from "lucide-react";

import {
  DetailSection,
  EmptyDetailSection,
} from "@/components/detail";

import ErrorState from "@/components/states/ErrorState";
import Loading from "@/components/states/Loading";

import { Button } from "@/components/ui/button";

import ContactDialog from "@/features/Contacts/Components/ContactDialog";
import DeleteContactDialog from "@/features/Contacts/Components/DeleteContactDialog";
import ContactTable from "@/features/Contacts/Components/ContactTable";

import { useContacts } from "@/features/Contacts/Hooks";

import type { Contact } from "@/features/Contacts/Types/Contact";

interface CompanyContactsProps {
  companyId: string;
}

export default function CompanyContacts({
  companyId,
}: CompanyContactsProps) {
  const [isDialogOpen, setDialogOpen] =
    useState(false);

  const [selectedContact, setSelectedContact] =
    useState<Contact | null>(null);

  const [contactToDelete, setContactToDelete] =
    useState<Contact | null>(null);

  const [search, setSearch] =
    useState("");

  const params = useMemo(() => {
    const params = new URLSearchParams();

    params.set(
      "CompanyId",
      companyId
    );

    if (search.trim()) {
      params.set(
        "Search",
        search
      );
    }

    return params;
  }, [companyId, search]);

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useContacts(params);

  const contacts =
    data?.items ?? [];

  function handleCreate() {
    setSelectedContact(null);
    setDialogOpen(true);
  }

  function handleEdit(
    contact: Contact
  ) {
    setSelectedContact(contact);
    setDialogOpen(true);
  }

  function handleSearchChange(
    value: string
  ) {
    setSearch(value);
  }

  function handleDialogSuccess() {
    setSelectedContact(null);
    setDialogOpen(false);
    refetch();
  }

  function handleDeleteSuccess() {
    setContactToDelete(null);
    refetch();
  }

  const action = (
    <Button onClick={handleCreate}>
      <Plus className="mr-2 h-4 w-4" />
      New Contact
    </Button>
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <ErrorState
        message="Failed to load contacts."
      />
    );
  }

  if (contacts.length === 0) {
    return (
      <>
        <EmptyDetailSection
          title="Contacts"
          description={
            search
              ? "No contacts found."
              : "No contacts available."
          }
          action={action}
        />

        <ContactDialog
          open={isDialogOpen}
          onOpenChange={
            setDialogOpen
          }
          companyId={companyId}
          contact={
            selectedContact ??
            undefined
          }
          onSuccess={
            handleDialogSuccess
          }
        />
      </>
    );
  }

  return (
    <>
      <DetailSection
        title="Contacts"
        action={action}
      >
        <ContactTable
          contacts={contacts}
          onEdit={handleEdit}
          onDelete={
            setContactToDelete
          }
          search={search}
          onSearchChange={
            handleSearchChange
          }
        />
      </DetailSection>

      <ContactDialog
        open={isDialogOpen}
        onOpenChange={
          setDialogOpen
        }
        companyId={companyId}
        contact={
          selectedContact ??
          undefined
        }
        onSuccess={
          handleDialogSuccess
        }
      />

      <DeleteContactDialog
        contact={
          contactToDelete ??
          undefined
        }
        open={!!contactToDelete}
        onOpenChange={(open) => {
          if (!open) {
            setContactToDelete(null);
          }
        }}
        onSuccess={
          handleDeleteSuccess
        }
      />
    </>
  );
}