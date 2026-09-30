import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface DetailHeaderProps {
  breadcrumbs?: BreadcrumbItem[];

  title: string;

  subtitle?: ReactNode;

  badge?: ReactNode;

  actions?: ReactNode;
}

export default function DetailHeader({
  breadcrumbs,
  title,
  subtitle,
  badge,
  actions,
}: DetailHeaderProps) {
  return (
    <div className="space-y-6">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center text-sm text-muted-foreground">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <div
                key={`${item.label}-${index}`}
                className="flex items-center"
              >
                {isLast ? (
                  <span className="font-medium text-foreground">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.href!}
                    className="transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                )}

                {!isLast && (
                  <ChevronRight className="mx-2 h-4 w-4" />
                )}
              </div>
            );
          })}
        </nav>
      )}

      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">
            {title}
          </h1>

          {(badge || subtitle) && (
            <div className="flex flex-wrap items-center gap-3">
              {badge}

              {subtitle && (
                <span className="text-muted-foreground">
                  {subtitle}
                </span>
              )}
            </div>
          )}
        </div>

        {actions && (
          <div className="flex flex-wrap items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}