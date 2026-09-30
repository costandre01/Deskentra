import { useRef, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Paperclip,
  Trash2,
  X,
} from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DetailSection } from "@/components/detail";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  useComments,
  useCreateComment,
  useDeleteComment,
} from "@/features/Comments/Hooks";

import {
  useSendToCustomer,
  useUploadAttachment,
} from "@/features/Tickets/Hooks";

import { useAuth } from "@/features/Authentication/Context/useAuth";

import { UserRole } from "@/features/Users/Types/User";

interface TicketCommentsProps {
  ticketId: string;
}

const RECENT_PAGE_SIZE = 3;
const COMMENTS_PAGE_SIZE = 10;

function formatDate(date: string) {
  return new Date(date).toLocaleString("pt-PT");
}

export default function TicketComments({
  ticketId,
}: TicketCommentsProps) {
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const [isDialogOpen, setIsDialogOpen] =
    useState(false);

  const [page, setPage] = useState(1);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const { user } = useAuth();

  const {
    data: recentComments,
    isLoading: isLoadingRecent,
    error: recentError,
  } = useComments(
    ticketId,
    1,
    RECENT_PAGE_SIZE
  );

  const {
    data: fullComments,
    isLoading: isLoadingFull,
    error: fullError,
  } = useComments(
    ticketId,
    page,
    COMMENTS_PAGE_SIZE,
    fromDate || undefined,
    toDate || undefined
  );

  const createComment = useCreateComment();
  const uploadAttachment = useUploadAttachment();
  const sendToCustomer = useSendToCustomer();
  const deleteComment = useDeleteComment();

  const isSending =
    createComment.isPending ||
    uploadAttachment.isPending ||
    sendToCustomer.isPending;

  const isCustomer =
    user?.role === UserRole.Customer;

  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = Array.from(
      event.target.files ?? []
    );

    if (selectedFiles.length === 0) {
      return;
    }

    setFiles((current) => [
      ...current,
      ...selectedFiles,
    ]);

    // Permite selecionar o mesmo ficheiro novamente.
    event.target.value = "";
  };

  const handleRemoveFile = (
    index: number
  ) => {
    setFiles((current) =>
      current.filter((_, i) => i !== index)
    );
  };

  const handleSend = async () => {
    if (!user) {
      toast.error(
        "You must be logged in to send a message."
      );
      return;
    }

    const trimmedContent =
      content.trim();

    if (
      !trimmedContent &&
      files.length === 0
    ) {
      toast.error(
        "Add a comment or attach a file."
      );
      return;
    }

    try {
      /*
       * 1. Create comment, if there is one.
       */
      if (trimmedContent) {
        await createComment.mutateAsync({
          ticketId,
          userId: user.id,
          content: trimmedContent,
        });
      }

      /*
       * 2. Upload all selected attachments.
       */
      for (const file of files) {
        await uploadAttachment.mutateAsync({
          ticketId,
          file,
        });
      }

      /*
       * 3. Staff explicitly sends the
       *    communication to the customer.
       *
       *    Customer replies do not call this.
       *    Creating the customer comment already
       *    moves the ticket to In Progress.
       */
      if (!isCustomer) {
        await sendToCustomer.mutateAsync(
          ticketId
        );
      }

      setContent("");
      setFiles([]);

      toast.success(
        isCustomer
          ? "Reply sent successfully."
          : "Communication sent to customer."
      );
    } catch (error) {
      console.error(
        "SEND COMMUNICATION ERROR:",
        error
      );

      toast.error(
        isCustomer
          ? "Failed to send reply."
          : "Failed to send communication."
      );
    }
  };

  const handleDelete = async (
    commentId: string
  ) => {
    try {
      await deleteComment.mutateAsync({
        id: commentId,
        ticketId,
      });

      toast.success(
        "Comment deleted successfully."
      );
    } catch {
      toast.error(
        "Failed to delete comment."
      );
    }
  };

  const hasComments =
    (recentComments?.totalItems ?? 0) > 0;

  return (
    <>
      <DetailSection title="Comments">
        {isLoadingRecent && (
          <p className="text-sm text-muted-foreground">
            Loading comments...
          </p>
        )}

        {recentError && (
          <p className="text-sm text-destructive">
            Failed to load comments.
          </p>
        )}

        {!isLoadingRecent &&
          !recentError &&
          !hasComments && (
            <p className="text-sm text-muted-foreground">
              No comments yet.
            </p>
          )}

        {!isLoadingRecent &&
          !recentError &&
          recentComments?.items &&
          recentComments.items.length > 0 && (
            <div className="space-y-4">
              {recentComments.items.map(
                (comment) => (
                  <div
                    key={comment.id}
                    className="rounded-lg border p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium">
                          {comment.authorName}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {formatDate(
                            comment.createdAt
                          )}
                        </p>
                      </div>

                      {comment.userId ===
                        user?.id && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleDelete(
                              comment.id
                            )
                          }
                          disabled={
                            deleteComment.isPending
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <p className="mt-3 whitespace-pre-wrap text-sm">
                      {comment.content}
                    </p>
                  </div>
                )
              )}
            </div>
          )}

        {hasComments && (
          <div className="mt-4 flex justify-end">
            <Button
              variant="outline"
              onClick={() =>
                setIsDialogOpen(true)
              }
            >
              View all comments
            </Button>
          </div>
        )}

        {/* Composer */}
        <div className="mt-6 space-y-3 border-t pt-4">
          <textarea
            value={content}
            onChange={(event) =>
              setContent(event.target.value)
            }
            placeholder={
              isCustomer
                ? "Write a reply..."
                : "Write a comment..."
            }
            disabled={isSending}
            rows={4}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />

          {/* Selected files */}
          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between gap-3 rounded-md border bg-muted/30 px-3 py-2"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <Paperclip className="h-4 w-4 shrink-0 text-muted-foreground" />

                    <span className="truncate text-sm">
                      {file.name}
                    </span>

                    <span className="shrink-0 text-xs text-muted-foreground">
                      {(
                        file.size /
                        (1024 * 1024)
                      ).toFixed(1)}{" "}
                      MB
                    </span>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      handleRemoveFile(index)
                    }
                    disabled={isSending}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileSelect}
            disabled={isSending}
          />

          <div className="flex items-center justify-between gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                fileInputRef.current?.click()
              }
              disabled={isSending}
            >
              <Paperclip className="mr-2 h-4 w-4" />
              Attach files
            </Button>

            <Button
              onClick={handleSend}
              disabled={
                isSending ||
                (!content.trim() &&
                  files.length === 0) ||
                !user
              }
            >
              {isSending
                ? "Sending..."
                : isCustomer
                  ? "Send Reply"
                  : "Send to Customer"}
            </Button>
          </div>
        </div>
      </DetailSection>

      {/* All comments dialog */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      >
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Ticket Comments
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5">
            {/* Filters */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <label
                  htmlFor="comments-from"
                  className="text-sm font-medium"
                >
                  From
                </label>

                <input
                  id="comments-from"
                  type="date"
                  value={fromDate}
                  onChange={(event) => {
                    setFromDate(
                      event.target.value
                    );
                    setPage(1);
                  }}
                  className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                />
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="comments-to"
                  className="text-sm font-medium"
                >
                  To
                </label>

                <input
                  id="comments-to"
                  type="date"
                  value={toDate}
                  onChange={(event) => {
                    setToDate(
                      event.target.value
                    );
                    setPage(1);
                  }}
                  className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                />
              </div>
            </div>

            {(fromDate || toDate) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setFromDate("");
                  setToDate("");
                  setPage(1);
                }}
              >
                Clear filters
              </Button>
            )}

            {/* Comments */}
            <div className="max-h-[55vh] overflow-y-auto pr-2">
              {isLoadingFull && (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  Loading comments...
                </p>
              )}

              {fullError && (
                <p className="py-8 text-center text-sm text-destructive">
                  Failed to load comments.
                </p>
              )}

              {!isLoadingFull &&
                !fullError &&
                fullComments?.items.length ===
                  0 && (
                  <p className="py-8 text-center text-sm text-muted-foreground">
                    No comments found for the selected period.
                  </p>
                )}

              {!isLoadingFull &&
                !fullError &&
                fullComments?.items &&
                fullComments.items.length > 0 && (
                  <div className="space-y-4">
                    {fullComments.items.map(
                      (comment) => (
                        <div
                          key={comment.id}
                          className="rounded-lg border p-4"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="font-medium">
                                {comment.authorName}
                              </p>

                              <p className="text-xs text-muted-foreground">
                                {formatDate(
                                  comment.createdAt
                                )}
                              </p>
                            </div>

                            {comment.userId ===
                              user?.id && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  handleDelete(
                                    comment.id
                                  )
                                }
                                disabled={
                                  deleteComment.isPending
                                }
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>

                          <p className="mt-3 whitespace-pre-wrap text-sm">
                            {comment.content}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                )}
            </div>

            {/* Pagination */}
            {!isLoadingFull &&
              !fullError &&
              fullComments &&
              fullComments.totalPages > 1 && (
                <div className="flex items-center justify-between border-t pt-4">
                  <p className="text-sm text-muted-foreground">
                    Page {fullComments.page} of{" "}
                    {fullComments.totalPages}
                  </p>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page <= 1}
                      onClick={() =>
                        setPage(
                          (current) =>
                            current - 1
                        )
                      }
                    >
                      <ChevronLeft className="mr-1 h-4 w-4" />
                      Previous
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      disabled={
                        page >=
                        fullComments.totalPages
                      }
                      onClick={() =>
                        setPage(
                          (current) =>
                            current + 1
                        )
                      }
                    >
                      Next
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}