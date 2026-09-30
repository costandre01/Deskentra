import { apiClient } from "@/services/ApiClient";

class CustomerInvitationService {
  async invite(contactId: string): Promise<string> {
    return apiClient.post<string>(
      `/contacts/${contactId}/invite`,
      undefined
    );
  }
}

export const customerInvitationService =
  new CustomerInvitationService();