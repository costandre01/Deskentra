import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  active: boolean;
}

export default function StatusBadge({
  active,
}: StatusBadgeProps) {
  return (
    <Badge
      variant={active ? "default" : "secondary"}
    >
      {active ? "Active" : "Inactive"}
    </Badge>
  );
}