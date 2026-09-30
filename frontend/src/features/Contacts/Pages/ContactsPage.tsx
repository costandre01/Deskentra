import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import PageContainer from "@/components/layout/PageContainer";
import Section from "@/components/layout/Section";

import ErrorState from "@/components/states/ErrorState";
import Loading from "@/components/states/Loading";

import ContactTable from "../Components/ContactTable";
import ContactDialog from "../Components/ContactDialog";
import DeleteContactDialog from "../Components/DeleteContactDialog";

import {
  useContacts,
  useSetPrimaryContact,
} from "../Hooks";

import { useCompanies } from "@/features/Companies/Hooks";

import type { Contact } from "../Types/Contact";

import InviteCustomerDialog from "../Components/InviteCustomerDialog";

export default function ContactsPage() {
  const [page, setPage] = useState(1);

  const pageSize = 20;

  const [selectedCompanyId, setSelectedCompanyId] =
    useState("");

  const [search, setSearch] = useState("");

  const [editingContact, setEditingContact] =
    useState<Contact | undefined>();

  const [isContactDialogOpen, setContactDialogOpen] =
    useState(false);

  const [deletingContact, setDeletingContact] =
    useState<Contact | undefined>();

  const [isDeleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  const [invitingContact, setInvitingContact] =
    useState<Contact | undefined>();

  const [isInviteDialogOpen, setInviteDialogOpen] =
    useState(false);

  const contactParams = new URLSearchParams();

  contactParams.set("page", page.toString());
  contactParams.set("pageSize", pageSize.toString());

  if (selectedCompanyId) {
    contactParams.set(
      "companyId",
      selectedCompanyId
    );
  }

  if (search.trim()) {
    contactParams.set(
      "search",
      search.trim()
    );
  }

  const {
    data: contactsData,
    error: contactsError,
  } = useContacts(contactParams);

  const {
    data: companiesData,
    isLoading: companiesLoading,
    error: companiesError,
  } = useCompanies();

  const setPrimaryContact =
    useSetPrimaryContact();

  const contacts =
    contactsData?.items ?? [];

  const companies =
    companiesData?.items ?? [];

  const totalPages =
    contactsData?.totalPages ??
    Math.max(
      1,
      Math.ceil(
        (contactsData?.totalItems ?? 0) /
          pageSize
      )
    );

  const handleCompanyChange = (
    companyId: string
  ) => {
    setSelectedCompanyId(
      companyId === "all"
        ? ""
        : companyId
    );

    setPage(1);
  };

  const handleSearchChange = (
    value: string
  ) => {
    setSearch(value);
    setPage(1);
  };

  const handleSetPrimary = async (
    contact: Contact
  ) => {
    if (contact.isPrimary) {
      return;
    }

    try {
      await setPrimaryContact.mutateAsync(
        contact
      );

      toast.success(
        `${contact.firstName} ${contact.lastName} is now the primary contact.`
      );
    } catch {
      toast.error(
        "Failed to set primary contact."
      );
    }
  };

  if (companiesLoading) {
    return <Loading />;
  }

  if (contactsError) {
    return (
      <ErrorState
        message={contactsError.message}
      />
    );
  }

  if (companiesError) {
    return (
      <ErrorState
        message={companiesError.message}
      />
    );
  }

  return (
    <PageContainer>
      <Section
        title="Contacts"
        description="Manage customer contacts and their company relationships."
        action={
          <Button
            onClick={() => {
              setEditingContact(undefined);
              setSelectedCompanyId("");
              setContactDialogOpen(true);
            }}
          >
            New Contact
          </Button>
        }
      >
        <div className="flex items-center gap-2">
          <Select
            value={
              selectedCompanyId || "all"
            }
            onValueChange={
              handleCompanyChange
            }
          >
            <SelectTrigger className="w-62.5">
              <SelectValue placeholder="Filter by company" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                All companies
              </SelectItem>

              {companies.map((company) => (
                <SelectItem
                  key={company.id}
                  value={company.id}
                >
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedCompanyId && (
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCompanyId("");
                setPage(1);
              }}
            >
              Clear filter
            </Button>
          )}
        </div>

        <ContactTable
          contacts={contacts}
          onEdit={(contact) => {
            setEditingContact(contact);

            setSelectedCompanyId(
              contact.companyId
            );

            setContactDialogOpen(true);
          }}
          onDelete={(contact) => {
            setDeletingContact(contact);
            setDeleteDialogOpen(true);
          }}
          onSetPrimary={
            handleSetPrimary
          }
          onInvite={(contact) => {
            setInvitingContact(contact);
            setInviteDialogOpen(true);
          }}
          page={
            contactsData?.page ?? page
          }
          totalPages={totalPages}
          totalItems={
            contactsData?.totalItems ?? 0
          }
          pageSize={pageSize}
          onPageChange={setPage}
          search={search}
          onSearchChange={
            handleSearchChange
          }
        />

        <ContactDialog
          open={isContactDialogOpen}
          onOpenChange={
            setContactDialogOpen
          }
          companyId={selectedCompanyId}
          contact={editingContact}
          onSuccess={() => {
            setPage(1);
          }}
        />

        <DeleteContactDialog
          open={isDeleteDialogOpen}
          onOpenChange={
            setDeleteDialogOpen
          }
          contact={deletingContact}
          onSuccess={() => {
            setDeletingContact(undefined);
          }}
        />

        <InviteCustomerDialog
          open={isInviteDialogOpen}
          onOpenChange={(open) => {
            setInviteDialogOpen(open);

            if (!open) {
              setInvitingContact(undefined);
            }
          }}
          contact={invitingContact}
          onSuccess={() => {
            setInvitingContact(undefined);
          }}
        />
      </Section>
    </PageContainer>
  );
}