import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { customerInvitationService } from "../Services/customerInvitation.service";

import { contactKeys } from "../contact.keys";

export function useInviteCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contactId: string) =>
      customerInvitationService.invite(contactId),

    onSuccess: async (_, contactId) => {
      await queryClient.invalidateQueries({
        queryKey: contactKeys.detail(contactId),
      });

      await queryClient.invalidateQueries({
        queryKey: contactKeys.lists(),
      });
    },
  });
}