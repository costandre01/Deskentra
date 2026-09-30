import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { userService } from "../Services/user.service";
import { userKeys } from "../user.keys";

export function useToggleUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      userService.toggleStatus(id),

    onSuccess: async (_, id) => {
      await queryClient.refetchQueries({
        queryKey: userKeys.lists(),
        type: "active",
      });

      await queryClient.invalidateQueries({
        queryKey: userKeys.detail(id),
      });
    },
  });
}