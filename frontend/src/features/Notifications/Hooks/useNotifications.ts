import { useQuery } from "@tanstack/react-query";

import { notificationKeys } from "../notifications.keys";
import { notificationService } from "../Services/notification.service";

import { useAuth } from "@/features/Authentication/Context/useAuth";

export function useNotifications() {
  const { user } = useAuth();

  return useQuery({
    queryKey: notificationKeys.list(user?.id ?? ""),
    queryFn: notificationService.getNotifications,
    enabled: Boolean(user?.id),
    refetchOnWindowFocus: true,
    refetchInterval: 10000,
  });
}