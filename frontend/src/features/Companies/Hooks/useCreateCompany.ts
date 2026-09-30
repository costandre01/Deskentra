import { useMutation, useQueryClient } from "@tanstack/react-query";

import { companyService } from "../Services/company.service";
import type { SaveCompanyRequest } from "../Types/SaveCompanyRequest";
import { companyKeys } from "../company.keys";

export function useCreateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: SaveCompanyRequest) =>
      companyService.createCompany(request),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: companyKeys.lists(),
      });
    },
  });
}