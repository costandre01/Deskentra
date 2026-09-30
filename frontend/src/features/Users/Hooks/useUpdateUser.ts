import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userKeys } from "../user.keys";
import { userService } from "../Services/user.service";

import type { UpdateUserRequest } from "../Services/user.service";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateUserRequest;
    }) => userService.updateUser(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: userKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: userKeys.detail(variables.id),
      });
    },
  });
}