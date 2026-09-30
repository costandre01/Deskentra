import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { contactService } from "../Services/contact.service";
import type { SaveContactRequest } from "../Types/SaveContactRequest";
import { contactKeys } from "../contact.keys";

export function useUpdateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: SaveContactRequest;
    }) =>
      contactService.updateContact(id, data),

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: contactKeys.lists(),
      });

      await queryClient.invalidateQueries({
        queryKey: contactKeys.detail(
          variables.id
        ),
      });
    },
  });
}