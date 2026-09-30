import { useQuery } from "@tanstack/react-query";

import { companyService } from "../Services/company.service";
import type { Company } from "../Types/Company";
import type { PagedResult } from "@/types/PagedResult";
import { companyKeys } from "../company.keys";

export function useCompanies(
  params?: URLSearchParams
) {
  return useQuery<PagedResult<Company>, Error>({
    queryKey: companyKeys.list(
      params?.toString()
    ),

    queryFn: () =>
      companyService.getCompanies(params),

    placeholderData: (
      previousData
    ) => previousData,
  });
}