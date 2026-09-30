import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { companyService } from "../Services/company.service";
import { companyKeys } from "../company.keys";

export function useDeleteCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      companyService.deleteCompany(id),

    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: companyKeys.lists(),
        type: "active",
      });
    },
  });
}