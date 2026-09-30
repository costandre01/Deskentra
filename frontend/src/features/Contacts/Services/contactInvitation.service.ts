import { apiClient } from "@/services/ApiClient";

export const contactInvitationService = {
  createInvitation(contactId: string) {
    return apiClient.post<string>(
      `/contacts/${contactId}/invite`,
      {}
    );
  },

  resendInvitation(contactId: string) {
    return apiClient.post<string>(
      `/contacts/${contactId}/invite/resend`,
      {}
    );
  },
};