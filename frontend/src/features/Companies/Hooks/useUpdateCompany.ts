import { useMutation, useQueryClient } from "@tanstack/react-query";

import { companyService } from "../Services/company.service";
import type { SaveCompanyRequest } from "../Types/SaveCompanyRequest";
import { companyKeys } from "../company.keys";

export function useUpdateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: SaveCompanyRequest;
    }) => companyService.updateCompany(id, data),

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: companyKeys.lists(),
      });

      await queryClient.invalidateQueries({
        queryKey: companyKeys.detail(variables.id),
      });
    },
  });
}