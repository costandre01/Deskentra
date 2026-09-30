import type { ReactNode } from "react";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  loading?: boolean;
  label: string;
  loadingLabel?: string;
  icon?: ReactNode;
  className?: string;
}

export default function SubmitButton({
  loading = false,
  label,
  loadingLabel,
  icon,
  className,
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={loading}
      className={className}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingLabel ?? "Saving..."}
        </>
      ) : (
        <>
          {icon && (
            <span className="mr-2 flex items-center">
              {icon}
            </span>
          )}
          {label}
        </>
      )}
    </Button>
  );
}