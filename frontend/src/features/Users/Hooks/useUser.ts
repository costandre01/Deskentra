import { useQuery } from "@tanstack/react-query";

import { userKeys } from "../user.keys";
import { userService } from "../Services/user.service";

export function useUser(id?: string) {
  return useQuery({
    queryKey: userKeys.detail(id!),
    queryFn: () => userService.getUser(id!),
    enabled: !!id,
  });
}