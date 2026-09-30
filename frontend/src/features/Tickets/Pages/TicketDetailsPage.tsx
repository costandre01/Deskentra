import { useState } from "react";
import { useParams } from "react-router-dom";

import {
  DetailPage,
  DetailState,
} from "@/components/detail";

import TicketDialog from "../Components/TicketDialog";
import TicketHeader from "../Components/TicketHeader";
import TicketOverview from "../Components/TicketOverview";
import TicketStatusActions from "../Components/TicketStatusActions";
import DeleteTicketDialog from "../Components/DeleteTicketDialog";
import TicketComments from "../Components/TicketComments";

import { useTicket } from "../Hooks";

import { useCompanies } from "@/features/Companies/Hooks";
import { useContacts } from "@/features/Contacts/Hooks";

import TicketHistory from "../Components/TicketHistory";

import TicketAttachments from "../Components/TicketAttachments";

export default function TicketDetailsPage() {
  const { id } = useParams();

  const [isTicketDialogOpen, setTicketDialogOpen] =
    useState(false);

  const [isDeleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  const {
    data: ticket,
    isLoading: ticketLoading,
    error: ticketError,
  } = useTicket(id!);

  const {
    data: companiesData,
    isLoading: companiesLoading,
  } = useCompanies();

  const contactParams = new URLSearchParams();
  contactParams.set("page", "1");
  contactParams.set("pageSize", "100");

  const {
    data: contactsData,
    isLoading: contactsLoading,
  } = useContacts(contactParams);

  const companies =
    companiesData?.items.map((company) => ({
      value: company.id,
      label: company.name,
    })) ?? [];

  const contacts =
    contactsData?.items ?? [];

  return (
    <DetailPage>
      <DetailState
        isLoading={
          ticketLoading ||
          companiesLoading ||
          contactsLoading
        }
        error={ticketError}
        data={ticket}
      >
        {(ticket) => (
          <>
            <TicketHeader
              ticket={ticket}
              onEdit={() =>
                setTicketDialogOpen(true)
              }
              onDelete={() =>
                setDeleteDialogOpen(true)
              }
            />

            <TicketStatusActions
              ticket={ticket}
            />

            <TicketOverview
              ticket={ticket}
            />

            <TicketComments
              ticketId={ticket.id}
            />

            <TicketAttachments
              ticketId={ticket.id}
            />

            <TicketHistory
              ticketId={ticket.id}
            />

            <TicketDialog
              open={isTicketDialogOpen}
              onOpenChange={
                setTicketDialogOpen
              }
              ticket={ticket}
              companies={companies}
              contacts={contacts}
            />

            <DeleteTicketDialog
              open={isDeleteDialogOpen}
              onOpenChange={
                setDeleteDialogOpen
              }
              ticket={ticket}
            />
          </>
        )}
      </DetailState>
    </DetailPage>
  );
}