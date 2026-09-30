import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { ticketService } from "../Services/ticket.service";
import { ticketKeys } from "../ticket.keys";

interface DeleteAttachmentVariables {
  ticketId: string;
  attachmentId: string;
}

export function useDeleteAttachment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      ticketId,
      attachmentId,
    }: DeleteAttachmentVariables) =>
      ticketService.deleteAttachment(
        ticketId,
        attachmentId
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey:
          ticketKeys.attachmentsByTicket(
            variables.ticketId
          ),
      });
    },
  });
}