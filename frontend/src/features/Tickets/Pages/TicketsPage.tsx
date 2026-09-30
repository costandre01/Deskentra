import { useState } from "react";

import { Button } from "@/components/ui/button";

import PageContainer from "@/components/layout/PageContainer";
import Section from "@/components/layout/Section";

import ErrorState from "@/components/states/ErrorState";
import Loading from "@/components/states/Loading";

import TicketDialog from "../Components/TicketDialog";
import TicketTable from "../Components/TicketTable";
import DeleteTicketDialog from "../Components/DeleteTicketDialog";

import { useTickets } from "../Hooks";

import { useCompanies } from "@/features/Companies/Hooks";
import { useContacts } from "@/features/Contacts/Hooks";

import type { Ticket } from "../Types/Ticket";

export default function TicketsPage() {
  const [page, setPage] = useState(1);

  const pageSize = 20;

  const [search, setSearch] = useState("");

  const [editingTicket, setEditingTicket] =
    useState<Ticket | undefined>();

  const [isTicketDialogOpen, setTicketDialogOpen] =
    useState(false);

  const [deletingTicket, setDeletingTicket] =
    useState<Ticket | undefined>();

  const [isDeleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  const ticketParams = new URLSearchParams();

  ticketParams.set(
    "page",
    page.toString()
  );

  ticketParams.set(
    "pageSize",
    pageSize.toString()
  );

  if (search.trim()) {
    ticketParams.set(
      "search",
      search.trim()
    );
  }

  const {
    data: ticketsData,
    error: ticketsError,
  } = useTickets(ticketParams);

  const {
    data: companiesData,
    isLoading: companiesLoading,
    error: companiesError,
  } = useCompanies();

  const {
    data: contactsData,
    isLoading: contactsLoading,
    error: contactsError,
  } = useContacts();

  const tickets =
    ticketsData?.items ?? [];

  const companies =
    companiesData?.items ?? [];

  const contacts =
    contactsData?.items ?? [];

  const totalPages =
    ticketsData?.totalPages ??
    Math.max(
      1,
      Math.ceil(
        (ticketsData?.totalItems ?? 0) /
          pageSize
      )
    );

  const handleSearchChange = (
    value: string
  ) => {
    setSearch(value);
    setPage(1);
  };

  if (
    companiesLoading ||
    contactsLoading
  ) {
    return <Loading />;
  }

  if (ticketsError) {
    return (
      <ErrorState
        message="Failed to load tickets."
      />
    );
  }

  if (companiesError) {
    return (
      <ErrorState
        message="Failed to load companies."
      />
    );
  }

  if (contactsError) {
    return (
      <ErrorState
        message="Failed to load contacts."
      />
    );
  }

  const companyOptions =
    companies.map((company) => ({
      value: company.id,
      label: company.name,
    }));

  return (
    <PageContainer>
      <Section
        title="Tickets"
        description="Manage and track customer support tickets."
        action={
          <Button
            onClick={() => {
              setEditingTicket(undefined);
              setTicketDialogOpen(true);
            }}
          >
            New Ticket
          </Button>
        }
      >
        <TicketTable
          tickets={tickets}
          onEdit={(ticket) => {
            setEditingTicket(ticket);
            setTicketDialogOpen(true);
          }}
          onDelete={(ticket) => {
            setDeletingTicket(ticket);
            setDeleteDialogOpen(true);
          }}
          page={
            ticketsData?.page ?? page
          }
          totalPages={totalPages}
          totalItems={
            ticketsData?.totalItems ?? 0
          }
          pageSize={pageSize}
          onPageChange={setPage}
          search={search}
          onSearchChange={
            handleSearchChange
          }
        />

        <TicketDialog
          open={isTicketDialogOpen}
          onOpenChange={
            setTicketDialogOpen
          }
          ticket={editingTicket}
          companies={companyOptions}
          contacts={contacts}
        />

        <DeleteTicketDialog
          open={isDeleteDialogOpen}
          onOpenChange={
            setDeleteDialogOpen
          }
          ticket={deletingTicket}
        />
      </Section>
    </PageContainer>
  );
}