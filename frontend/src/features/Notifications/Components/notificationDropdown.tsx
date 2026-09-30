import {
  Bell,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  useMarkNotificationAsRead,
  useNotifications,
} from "../Hooks";

export default function NotificationDropdown() {
  const {
    data: notifications = [],
    isLoading,
  } = useNotifications();

  const markAsRead = useMarkNotificationAsRead();

  const unreadNotifications =
    notifications.filter(
      (notification) => !notification.isRead
    );

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead.mutateAsync(id);
    } catch {
      // Error is handled by the API client.
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Bell className="h-5 w-5" />

          {unreadNotifications.length > 0 && (
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-medium text-destructive-foreground">
              {unreadNotifications.length > 99
                ? "99+"
                : unreadNotifications.length}
            </span>
          )}

          <span className="sr-only">
            Notifications
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-80"
      >
        <DropdownMenuLabel>
          Notifications
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {isLoading && (
          <div className="px-2 py-4 text-center text-sm text-muted-foreground">
            Loading notifications...
          </div>
        )}

        {!isLoading &&
          notifications.length === 0 && (
            <div className="px-2 py-4 text-center text-sm text-muted-foreground">
              No notifications.
            </div>
          )}

        {!isLoading &&
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className="flex cursor-pointer items-start gap-3 p-3"
              onClick={() =>
                !notification.isRead &&
                handleMarkAsRead(notification.id)
              }
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  {!notification.isRead && (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                  )}

                  <p className="truncate font-medium">
                    {notification.title}
                  </p>
                </div>

                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                  {notification.message}
                </p>
              </div>

              {!notification.isRead && (
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              )}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}