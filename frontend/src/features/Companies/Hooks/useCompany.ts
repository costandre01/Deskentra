import { useQuery } from "@tanstack/react-query";

import { companyService } from "../Services/company.service";
import type { Company } from "../Types/Company";
import { companyKeys } from "../company.keys";

export function useCompany(id: string) {
  return useQuery<Company, Error>({
    queryKey: companyKeys.detail(id),
    queryFn: () => companyService.getCompany(id),
    enabled: !!id,
  });
}