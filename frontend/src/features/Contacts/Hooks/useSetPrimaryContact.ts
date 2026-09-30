import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { contactService } from "../Services/contact.service";
import { contactKeys } from "../contact.keys";

import type { Contact } from "../Types/Contact";

export function useSetPrimaryContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contact: Contact) => {
      return contactService.updateContact(
        contact.id,
        {
          companyId: contact.companyId,

          firstName: contact.firstName,
          lastName: contact.lastName,

          email: contact.email,

          phoneNumber: contact.phoneNumber,
          mobileNumber: contact.mobileNumber,

          position: contact.position,

          isPrimary: true,

          notes: contact.notes,
        }
      );
    },

    onSuccess: async (_, contact) => {
      await queryClient.invalidateQueries({
        queryKey: contactKeys.list(),
      });

      await queryClient.invalidateQueries({
        queryKey: contactKeys.detail(
          contact.id
        ),
      });
    },
  });
}