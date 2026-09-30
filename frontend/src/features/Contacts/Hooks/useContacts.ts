import { useQuery } from "@tanstack/react-query";

import type { PagedResult } from "@/types/PagedResult";

import { contactKeys } from "../contact.keys";

import { contactService } from "../Services/contact.service";

import type { Contact } from "../Types/Contact";

export function useContacts(
  params?: URLSearchParams
) {
  return useQuery<PagedResult<Contact>, Error>({
    queryKey: contactKeys.list(
      params?.toString()
    ),

    queryFn: () =>
      contactService.getContacts(params),

    placeholderData: (
      previousData
    ) => previousData,
  });
}