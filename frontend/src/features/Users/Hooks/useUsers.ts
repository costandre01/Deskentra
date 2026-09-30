import { useQuery } from "@tanstack/react-query";

import { userKeys } from "../user.keys";
import { userService } from "../Services/user.service";

export function useUsers(
  page: number,
  pageSize: number,
  search: string = ""
) {
  return useQuery({
    queryKey: userKeys.list(
      page,
      pageSize,
      search
    ),

    queryFn: () =>
      userService.getUsers(
        page,
        pageSize,
        search
      ),

    placeholderData: (previousData) =>
      previousData,
  });
}