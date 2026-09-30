import { apiClient } from "@/services/ApiClient";

import type { LoginRequest } from "../Types/LoginRequest";
import type { LoginResponse } from "../Types/LoginResponse";

export interface CustomerInvitation {
  contactId: string;

  firstName: string;
  lastName: string;

  email: string;

  companyName: string;

  expiresAt: string;
}

class AuthService {
  login(request: LoginRequest) {
    return apiClient.post<LoginResponse>(
      "/Auth/login",
      request
    );
  }

  getCustomerInvitation(token: string) {
    return apiClient.get<CustomerInvitation>(
      `/customer-invitations?token=${encodeURIComponent(token)}`
    );
  }
}

export const authService = new AuthService();