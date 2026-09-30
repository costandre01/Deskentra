import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { contactService } from "../Services/contact.service";
import type { SaveContactRequest } from "../Types/SaveContactRequest";
import { contactKeys } from "../contact.keys";

export function useCreateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: SaveContactRequest) =>
      contactService.createContact(request),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: contactKeys.lists(),
      });
    },
  });
}