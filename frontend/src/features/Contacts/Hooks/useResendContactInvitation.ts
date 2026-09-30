import { useMutation } from "@tanstack/react-query";

import { contactInvitationService } from "../Services/contactInvitation.service";

export function useResendContactInvitation() {
  return useMutation({
    mutationFn: (contactId: string) =>
      contactInvitationService.resendInvitation(contactId),
  });
}