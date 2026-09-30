import { useMutation, useQueryClient } from "@tanstack/react-query";

import { contactInvitationService } from "../Services/contactInvitation.service";
import { contactKeys } from "../contact.keys";

export function useCreateContactInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contactId: string) =>
      contactInvitationService.createInvitation(contactId),

    onSuccess: (_, contactId) => {
      console.log("INVITATION SUCCESS");

      queryClient.invalidateQueries({
        queryKey: contactKeys.list(),
      });

      queryClient.invalidateQueries({
        queryKey: contactKeys.detail(contactId),
      });
    },

    onError: (error) => {
      console.error("INVITATION MUTATION ERROR:", error);
    },
  });
}