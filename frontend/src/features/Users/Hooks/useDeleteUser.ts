import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userKeys } from "../user.keys";
import { userService } from "../Services/user.service";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      userService.deleteUser(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: userKeys.lists(),
      });

      queryClient.removeQueries({
        queryKey: userKeys.detail(id),
      });
    },
  });
}