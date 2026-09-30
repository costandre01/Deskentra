import { apiClient } from "@/services/ApiClient";

import type { notification } from "../Types/notification";

export const notificationService = {
  async getNotifications(): Promise<notification[]> {
    return apiClient.get<notification[]>(
      "/notifications"
    );
  },

  async markAsRead(id: string): Promise<void> {
    return apiClient.patch<void>(
      `/notifications/${id}/read`
    );
  },
};