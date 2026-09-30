import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { contactService } from "../Services/contact.service";
import { contactKeys } from "../contact.keys";

export function useDeleteContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      contactService.deleteContact(id),

    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: contactKeys.lists(),
        type: "active",
      });
    },
  });
}