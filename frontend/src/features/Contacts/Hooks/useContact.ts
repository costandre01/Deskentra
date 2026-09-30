import { useQuery } from "@tanstack/react-query";

import { contactService } from "../Services/contact.service";
import type { Contact } from "../Types/Contact";
import { contactKeys } from "../contact.keys";

export function useContact(id: string) {
  return useQuery<Contact, Error>({
    queryKey: contactKeys.detail(id),
    queryFn: () => contactService.getContact(id),
    enabled: !!id,
  });
}