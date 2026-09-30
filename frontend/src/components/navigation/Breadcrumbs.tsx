import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({
  items,
}: BreadcrumbsProps) {
  return (
    <nav className="flex items-center text-sm text-muted-foreground">
      {items.map((item, index) => {
        const last = index === items.length - 1;

        return (
          <div
            key={item.label}
            className="flex items-center"
          >
            {last ? (
              <span className="font-medium text-foreground">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.href!}
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            )}

            {!last && (
              <ChevronRight className="mx-2 h-4 w-4" />
            )}
          </div>
        );
      })}
    </nav>
  );
}