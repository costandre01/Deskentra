import {
  CheckCircle2,
  Clock,
  Play,
  RotateCcw,
  UserCheck,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DetailSection } from "@/components/detail";

import {
  useAssignTicket,
  useCloseTicket,
  useReopenTicket,
  useResolveTicket,
  useSendToCustomer,
  useStartTicket,
} from "../Hooks";

import { useUsers } from "@/features/Users/Hooks";

import type { Ticket } from "../Types/Ticket";

import {
  UserRole,
} from "@/features/Users/Types/User";

import { useAuth } from "@/features/Authentication/Context/useAuth";

interface TicketStatusActionsProps {
  ticket: Ticket;
}

export default function TicketStatusActions({
  ticket,
}: TicketStatusActionsProps) {
  const assignTicket = useAssignTicket();
  const startTicket = useStartTicket();
  const sendToCustomer = useSendToCustomer();
  const resolveTicket = useResolveTicket();
  const closeTicket = useCloseTicket();
  const reopenTicket = useReopenTicket();

  const { user } = useAuth();

  const isCustomer =
    user?.role === UserRole.Customer;

  const [userId, setUserId] = useState("");

  const {
    data: usersData,
    isLoading: isLoadingUsers,
  } = useUsers(1, 100);

  const technicians =
    usersData?.items.filter(
      (user) =>
        user.role === UserRole.Technician &&
        user.isActive
    ) ?? [];

  const isPending =
    assignTicket.isPending ||
    startTicket.isPending ||
    sendToCustomer.isPending ||
    resolveTicket.isPending ||
    closeTicket.isPending ||
    reopenTicket.isPending;

  const handleAssign = async () => {
    if (!userId) {
      toast.error("Please select a technician.");
      return;
    }

    try {
      await assignTicket.mutateAsync({
        id: ticket.id,
        userId,
      });

      toast.success("Ticket assigned successfully.");
      setUserId("");
    } catch {
      toast.error("Failed to assign ticket.");
    }
  };

  const handleStartWork = async () => {
    try {
      await startTicket.mutateAsync(ticket.id);
      toast.success("Ticket moved to In Progress.");
    } catch {
      toast.error("Failed to start work.");
    }
  };

  const handleSendToCustomer = async () => {
    try {
      await sendToCustomer.mutateAsync(ticket.id);

      window.location.reload();
    } catch {
      toast.error(
        "Failed to send ticket to customer."
      );
    }
  };

  const handleResolve = async () => {
    try {
      await resolveTicket.mutateAsync(ticket.id);
      toast.success("Ticket resolved successfully.");
    } catch {
      toast.error("Failed to resolve ticket.");
    }
  };

  const handleClose = async () => {
    try {
      await closeTicket.mutateAsync(ticket.id);
      toast.success("Ticket closed successfully.");
    } catch {
      toast.error("Failed to close ticket.");
    }
  };

  const handleReopen = async () => {
    try {
      await reopenTicket.mutateAsync(ticket.id);
      toast.success("Ticket reopened successfully.");
    } catch {
      toast.error("Failed to reopen ticket.");
    }
  };

  return (
    <DetailSection title="Ticket Actions">
      <div className="flex flex-wrap gap-2">

        {/* ASSIGN */}
        {ticket.status === 1 && (
          <>
            <select
              value={userId}
              onChange={(event) =>
                setUserId(event.target.value)
              }
              disabled={
                isPending ||
                isLoadingUsers ||
                isCustomer
              }
              className="flex h-9 min-w-65 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="">
                {isLoadingUsers
                  ? "Loading technicians..."
                  : "Select technician"}
              </option>

              {technicians.map((user) => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>

            <Button
              onClick={handleAssign}
              disabled={
                isPending ||
                isLoadingUsers ||
                !userId ||
                isCustomer
              }
            >
              <UserCheck className="mr-2 h-4 w-4" />
              Assign
            </Button>
          </>
        )}

        {/* START WORK */}
        {ticket.status === 2 && (
          <Button
            onClick={handleStartWork}
            disabled={
              isPending ||
              isCustomer
            }
          >
            <Play className="mr-2 h-4 w-4" />
            Start Work
          </Button>
        )}

        {/* SEND TO CUSTOMER / RESOLVE */}
        {ticket.status === 3 && (
          <>
            <Button
              variant="outline"
              onClick={handleSendToCustomer}
              disabled={
                isPending ||
                isCustomer
              }
            >
              <Clock className="mr-2 h-4 w-4" />
              Send to Customer
            </Button>

            <Button
              onClick={handleResolve}
              disabled={
                isPending ||
                isCustomer
              }
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Resolve
            </Button>
          </>
        )}

        {/* RESOLVE */}
        {ticket.status === 4 && (
          <Button
            onClick={handleResolve}
            disabled={
              isPending ||
              isCustomer
            }
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Resolve
          </Button>
        )}

        {/* CLOSE */}
        {ticket.status === 5 && (
          <Button
            onClick={handleClose}
            disabled={
              isPending ||
              isCustomer
            }
          >
            <XCircle className="mr-2 h-4 w-4" />
            Close
          </Button>
        )}

        {/* REOPEN */}
        {ticket.status === 6 && (
          <Button
            onClick={handleReopen}
            disabled={
              isPending ||
              isCustomer
            }
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reopen
          </Button>
        )}

      </div>
    </DetailSection>
  );
}