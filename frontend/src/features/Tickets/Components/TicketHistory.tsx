import { useState } from "react";

import {
  History,
  User,
  CalendarDays,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import Loading from "@/components/states/Loading";
import ErrorState from "@/components/states/ErrorState";

import { useTicketHistory } from "../Hooks";

interface TicketHistoryProps {
  ticketId: string;
}

const RECENT_PAGE_SIZE = 3;
const HISTORY_PAGE_SIZE = 20;

export default function TicketHistory({
  ticketId,
}: TicketHistoryProps) {
  const [isDialogOpen, setDialogOpen] =
    useState(false);

  const [page, setPage] = useState(1);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  /*
   * Main section:
   * Only request the 3 most recent history entries.
   */
  const {
    data: recentHistory,
    isLoading: recentLoading,
    error: recentError,
  } = useTicketHistory(
    ticketId,
    1,
    RECENT_PAGE_SIZE
  );

  /*
   * Dialog:
   * Request paginated history with optional date filters.
   */
  const {
    data: fullHistory,
    isLoading: fullLoading,
    error: fullError,
  } = useTicketHistory(
    ticketId,
    page,
    HISTORY_PAGE_SIZE,
    fromDate || undefined,
    toDate || undefined
  );

  const handleOpenDialog = () => {
    setPage(1);
    setDialogOpen(true);
  };

  const handleFromDateChange = (
    value: string
  ) => {
    setFromDate(value);
    setPage(1);
  };

  const handleToDateChange = (
    value: string
  ) => {
    setToDate(value);
    setPage(1);
  };

  const clearFilters = () => {
    setFromDate("");
    setToDate("");
    setPage(1);
  };

  if (recentLoading) {
    return <Loading />;
  }

  if (recentError) {
    return (
      <ErrorState message="Failed to load ticket history." />
    );
  }

  const items = recentHistory?.items ?? [];

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              History
            </CardTitle>

            {recentHistory &&
              recentHistory.totalItems > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleOpenDialog}
                >
                  View all history
                </Button>
              )}
          </div>
        </CardHeader>

        <CardContent>
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No history available.
            </p>
          ) : (
            <div className="space-y-5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="relative pl-6"
                >
                  <div className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-primary" />

                  <div className="space-y-1">
                    <div className="font-medium">
                      {item.action}
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="h-3.5 w-3.5" />

                      <span>
                        {item.userName}
                      </span>

                      <span>•</span>

                      <span>
                        {new Date(
                          item.createdAt
                        ).toLocaleString("pt-PT")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={isDialogOpen}
        onOpenChange={setDialogOpen}
      >
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Ticket History
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="history-from"
                  className="text-sm font-medium"
                >
                  From
                </label>

                <div className="relative">
                  <CalendarDays className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />

                  <input
                    id="history-from"
                    type="date"
                    value={fromDate}
                    onChange={(event) =>
                      handleFromDateChange(
                        event.target.value
                      )
                    }
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 pl-9 text-sm shadow-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="history-to"
                  className="text-sm font-medium"
                >
                  To
                </label>

                <div className="relative">
                  <CalendarDays className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />

                  <input
                    id="history-to"
                    type="date"
                    value={toDate}
                    onChange={(event) =>
                      handleToDateChange(
                        event.target.value
                      )
                    }
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 pl-9 text-sm shadow-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>
              </div>
            </div>

            {(fromDate || toDate) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
              >
                Clear filters
              </Button>
            )}

            {fullLoading ? (
              <Loading />
            ) : fullError ? (
              <ErrorState message="Failed to load ticket history." />
            ) : (
              <>
                <div className="max-h-[55vh] overflow-y-auto pr-2">
                  {fullHistory?.items.length === 0 ? (
                    <p className="py-8 text-center text-sm text-muted-foreground">
                      No history found for the selected period.
                    </p>
                  ) : (
                    <div className="space-y-6">
                      {fullHistory?.items.map(
                        (item) => (
                          <div
                            key={item.id}
                            className="relative border-l pl-6"
                          >
                            <div className="absolute -left-1.25 top-1.5 h-2.5 w-2.5 rounded-full bg-primary" />

                            <div className="space-y-1">
                              <div className="font-medium">
                                {item.action}
                              </div>

                              <p className="text-sm text-muted-foreground">
                                {item.description}
                              </p>

                              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                <User className="h-3.5 w-3.5" />

                                <span>
                                  {item.userName}
                                </span>

                                <span>•</span>

                                <span>
                                  {new Date(
                                    item.createdAt
                                  ).toLocaleString(
                                    "pt-PT"
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>

                {fullHistory &&
                  fullHistory.totalPages > 1 && (
                    <div className="flex items-center justify-between border-t pt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={page <= 1}
                        onClick={() =>
                          setPage((current) =>
                            Math.max(
                              1,
                              current - 1
                            )
                          )
                        }
                      >
                        Previous
                      </Button>

                      <span className="text-sm text-muted-foreground">
                        Page {fullHistory.page} of{" "}
                        {fullHistory.totalPages}
                      </span>

                      <Button
                        variant="outline"
                        size="sm"
                        disabled={
                          page >=
                          fullHistory.totalPages
                        }
                        onClick={() =>
                          setPage((current) =>
                            Math.min(
                              fullHistory.totalPages,
                              current + 1
                            )
                          )
                        }
                      >
                        Next
                      </Button>
                    </div>
                  )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}