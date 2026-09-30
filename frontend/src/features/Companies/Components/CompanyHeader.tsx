import { Button } from "@/components/ui/button";
import { DetailActions, DetailHeader } from "@/components/detail";
import StatusBadge from "@/components/badges/StatusBadge";

import type { Company } from "../Types/Company";

interface CompanyHeaderProps {
  company: Company;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function CompanyHeader({
  company,
  onEdit,
  onDelete,
}: CompanyHeaderProps) {
  return (
    <DetailHeader
      breadcrumbs={[
        {
          label: "Companies",
          href: "/companies",
        },
        {
          label: company.name,
        },
      ]}
      title={company.name}
      badge={
        <StatusBadge active={company.isActive} />
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