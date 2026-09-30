import { apiClient } from "@/services/ApiClient";

import type { PagedResult } from "@/types/PagedResult";

import type { Contact } from "../Types/Contact";
import type { SaveContactRequest } from "../Types/SaveContactRequest";

class ContactService {
  public async getContacts(
    params?: URLSearchParams
  ): Promise<PagedResult<Contact>> {
    return apiClient.get<PagedResult<Contact>>(
      `/Contacts${params ? `?${params.toString()}` : ""}`
    );
  }

  public async getContact(id: string): Promise<Contact> {
    return apiClient.get<Contact>(`/Contacts/${id}`);
  }

  public async createContact(
    request: SaveContactRequest
  ): Promise<Contact> {
    return apiClient.post<Contact>("/Contacts", request);
  }

  public async updateContact(
    id: string,
    request: SaveContactRequest
  ): Promise<Contact> {
    return apiClient.put<Contact>(
      `/Contacts/${id}`,
      request
    );
  }

  public async deleteContact(id: string): Promise<void> {
    return apiClient.delete(`/Contacts/${id}`);
  }
}

export const contactService = new ContactService();