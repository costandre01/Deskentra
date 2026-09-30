import { Button } from "@/components/ui/button";
import {
  DetailActions,
  DetailHeader,
} from "@/components/detail";

import StatusBadge from "@/components/badges/StatusBadge";

import type { Contact } from "../Types/Contact";

interface ContactHeaderProps {
  contact: Contact;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ContactHeader({
  contact,
  onEdit,
  onDelete,
}: ContactHeaderProps) {
  return (
    <DetailHeader
      breadcrumbs={[
        {
          label: "Contacts",
          href: "/contacts",
        },
        {
          label: `${contact.firstName} ${contact.lastName}`,
        },
      ]}
      title={`${contact.firstName} ${contact.lastName}`}
      badge={
        <StatusBadge active={contact.isActive} />
      }
      actions={
        <DetailActions>
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
          >
            Edit
          </Button>

          <Button
            variant="destructiveOutline"
            size="sm"
            onClick={onDelete}
          >
            Delete
          </Button>
        </DetailActions>
      }
    />
  );
}