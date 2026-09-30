import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { ticketService } from "../Services/ticket.service";
import { ticketKeys } from "../ticket.keys";

interface UploadAttachmentVariables {
  ticketId: string;
  file: File;
}

export function useUploadAttachment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      ticketId,
      file,
    }: UploadAttachmentVariables) =>
      ticketService.uploadAttachment(
        ticketId,
        file
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