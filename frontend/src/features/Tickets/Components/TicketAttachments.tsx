import {
  Download,
  Paperclip,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DetailSection } from "@/components/detail";

import {
  useTicketAttachments,
  useDeleteAttachment,
} from "../Hooks";

import { useMutation } from "@tanstack/react-query";

import { ticketService } from "../Services/ticket.service";

interface TicketAttachmentsProps {
  ticketId: string;
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(date: string) {
  return new Date(date).toLocaleString("pt-PT");
}

export default function TicketAttachments({
  ticketId,
}: TicketAttachmentsProps) {
  const {
    data: attachments,
    isLoading,
    error,
  } = useTicketAttachments(ticketId);

  const deleteAttachment =
    useDeleteAttachment();

  const downloadAttachment = useMutation({
    mutationFn: ({
      ticketId,
      attachmentId,
    }: {
      ticketId: string;
      attachmentId: string;
    }) =>
      ticketService.downloadAttachment(
        ticketId,
        attachmentId
      ),
  });

  const handleDelete = async (
    attachmentId: string
  ) => {
    try {
      await deleteAttachment.mutateAsync({
        ticketId,
        attachmentId,
      });

      toast.success(
        "Attachment deleted successfully."
      );
    } catch {
      toast.error(
        "Failed to delete attachment."
      );
    }
  };

  const handleDownload = async (
    attachmentId: string,
    fileName: string
  ) => {
    try {
      const blob =
        await downloadAttachment.mutateAsync({
          ticketId,
          attachmentId,
        });

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;
      link.download = fileName;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch {
      toast.error(
        "Failed to download attachment."
      );
    }
  };

  return (
    <DetailSection title="Attachments">
      <div className="space-y-4">

        {isLoading && (
          <p className="text-sm text-muted-foreground">
            Loading attachments...
          </p>
        )}

        {error && (
          <p className="text-sm text-destructive">
            Failed to load attachments.
          </p>
        )}

        {!isLoading &&
          !error &&
          attachments?.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No attachments yet.
            </p>
          )}

        {!isLoading &&
          !error &&
          attachments &&
          attachments.length > 0 && (
            <div className="space-y-3">
              {attachments.map(
                (attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center justify-between gap-4 rounded-lg border p-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <Paperclip className="h-4 w-4 shrink-0 text-muted-foreground" />

                      <div className="min-w-0">
                        <p className="truncate font-medium">
                          {attachment.fileName}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(
                            attachment.fileSize
                          )}{" "}
                          •{" "}
                          {attachment.uploadedByName}{" "}
                          •{" "}
                          {formatDate(
                            attachment.createdAt
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleDownload(
                            attachment.id,
                            attachment.fileName
                          )
                        }
                        disabled={
                          downloadAttachment.isPending
                        }
                        title="Download attachment"
                      >
                        <Download className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleDelete(
                            attachment.id
                          )
                        }
                        disabled={
                          deleteAttachment.isPending
                        }
                        title="Delete attachment"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
      </div>
    </DetailSection>
  );
}