import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { notificationKeys } from "../notifications.keys";
import { notificationService } from "../Services/notification.service";

import { useAuth } from "@/features/Authentication/Context/useAuth";

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (id: string) =>
      notificationService.markAsRead(id),

    onSuccess: () => {
      if (!user?.id) {
        return;
      }

      queryClient.invalidateQueries({
        queryKey: notificationKeys.list(user.id),
      });
    },
  });
}