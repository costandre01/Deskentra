import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userKeys } from "../user.keys";
import { userService } from "../Services/user.service";

import type { CreateUserRequest } from "../Services/user.service";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserRequest) =>
      userService.createUser(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userKeys.lists(),
      });
    },
  });
}