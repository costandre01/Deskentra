import {
  Calendar,
  FileText,
  Hash,
  Tag,
  User,
  Building2,
} from "lucide-react";

import {
  DetailGrid,
  DetailSection,
  InfoField,
} from "@/components/detail";

import type { Ticket } from "../Types/Ticket";

interface TicketOverviewProps {
  ticket: Ticket;
}

const priorityLabels = {
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Critical",
} as const;

const categoryLabels = {
  1: "Bug",
  2: "Support",
  3: "Feature Request",
  4: "Performance",
  5: "Configuration",
  6: "Question",
  7: "Infrastructure",
} as const;

function formatDate(date?: string | null) {
  if (!date) {
    return "-";
  }

  return new Date(date).toLocaleString("pt-PT");
}

export default function TicketOverview({
  ticket,
}: TicketOverviewProps) {
  return (
    <DetailSection
      title="Ticket Overview"
    >
      <DetailGrid>
        <InfoField
          label="Ticket ID"
          icon={<Hash className="h-4 w-4" />}
        >
          {ticket.id}
        </InfoField>

        <InfoField
          label="Priority"
          icon={<Tag className="h-4 w-4" />}
        >
          {priorityLabels[ticket.priority]}
        </InfoField>

        <InfoField
          label="Category"
          icon={<FileText className="h-4 w-4" />}
        >
          {categoryLabels[ticket.category]}
        </InfoField>

        <InfoField
          label="Company"
          icon={<Building2 className="h-4 w-4" />}
        >
          {ticket.companyName || "-"}
        </InfoField>

        <InfoField
          label="Contact"
          icon={<User className="h-4 w-4" />}
        >
          {ticket.contactName || "-"}
        </InfoField>

        <InfoField
          label="Created By"
          icon={<User className="h-4 w-4" />}
        >
          {ticket.createdByName || "-"}
        </InfoField>

        <InfoField
          label="Assigned To"
          icon={<User className="h-4 w-4" />}
        >
          {ticket.assignedToName || "-"}
        </InfoField>

        <InfoField
          label="Created At"
          icon={<Calendar className="h-4 w-4" />}
        >
          {formatDate(ticket.createdAt)}
        </InfoField>

        <InfoField
          label="Updated At"
          icon={<Calendar className="h-4 w-4" />}
        >
          {formatDate(ticket.updatedAt)}
        </InfoField>

        <InfoField
          label="Closed At"
          icon={<Calendar className="h-4 w-4" />}
        >
          {formatDate(ticket.closedAt)}
        </InfoField>
      </DetailGrid>

      <div className="mt-6">
        <InfoField
          label="Description"
          icon={<FileText className="h-4 w-4" />}
        >
          <p className="whitespace-pre-wrap">
            {ticket.description}
          </p>
        </InfoField>
      </div>
    </DetailSection>
  );
}