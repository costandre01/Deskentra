import { apiClient } from "@/services/ApiClient";

import type { PagedResult } from "@/types/PagedResult";

import type { Ticket } from "../Types/Ticket";
import type { SaveTicketRequest } from "../Types/SaveTicketRequest";

import type { TicketHistory } from "../Types/TicketHistory";

import type { TicketAttachment } from "../Types/TicketAttachment";

class TicketService {
  public async getTickets(
    params?: URLSearchParams
  ): Promise<PagedResult<Ticket>> {
    return apiClient.get<PagedResult<Ticket>>(
      `/Tickets${params ? `?${params.toString()}` : ""}`
    );
  }

  public async getTicket(id: string): Promise<Ticket> {
    return apiClient.get<Ticket>(`/Tickets/${id}`);
  }

  public async getHistory(
    id: string,
    page = 1,
    pageSize = 20,
    fromDate?: string,
    toDate?: string
  ): Promise<PagedResult<TicketHistory>> {
    const params = new URLSearchParams();

    params.set("page", page.toString());
    params.set("pageSize", pageSize.toString());

    if (fromDate) {
      params.set("fromDate", fromDate);
    }

    if (toDate) {
      params.set("toDate", toDate);
    }

    return apiClient.get<PagedResult<TicketHistory>>(
      `/Tickets/${id}/history?${params.toString()}`
    );
  }

  public async getAttachments(
    id: string
  ): Promise<TicketAttachment[]> {
    return apiClient.get<TicketAttachment[]>(
      `/Tickets/${id}/attachments`
    );
  }

  public async uploadAttachment(
    id: string,
    file: File
  ): Promise<TicketAttachment> {
    const formData = new FormData();

    formData.append("file", file);

    return apiClient.post<TicketAttachment>(
      `/Tickets/${id}/attachments`,
      formData
    );
  }

  public async downloadAttachment(
    ticketId: string,
    attachmentId: string
  ): Promise<Blob> {
    return apiClient.download(
      `/Tickets/${ticketId}/attachments/${attachmentId}`
    );
  }

  public async deleteAttachment(
    ticketId: string,
    attachmentId: string
  ): Promise<void> {
    return apiClient.delete(
      `/Tickets/${ticketId}/attachments/${attachmentId}`
    );
  }

  public async createTicket(
    request: SaveTicketRequest
  ): Promise<Ticket> {
    return apiClient.post<Ticket>("/Tickets", request);
  }

  public async updateTicket(
    id: string,
    request: SaveTicketRequest
  ): Promise<void> {
    return apiClient.put<void>(
      `/Tickets/${id}`,
      {
        ticketId: id,
        ...request,
      }
    );
  }

  public async deleteTicket(id: string): Promise<void> {
    return apiClient.delete(`/Tickets/${id}`);
  }

  public async assignTicket(
    id: string,
    userId: string
  ): Promise<void> {
    return apiClient.post<void>(
      `/Tickets/${id}/assign`,
      { userId }
    );
  }

    public async startWork(id: string): Promise<void> {
    return apiClient.post<void>(
      `/Tickets/${id}/start-work`,
      {}
    );
  }

  public async waitForCustomer(id: string): Promise<void> {
    return apiClient.post<void>(
      `/Tickets/${id}/wait-for-customer`,
      {}
    );
  }

  public async resolveTicket(id: string): Promise<void> {
    return apiClient.post<void>(
      `/Tickets/${id}/resolve`,
      {}
    );
  }

  public async closeTicket(id: string): Promise<void> {
    return apiClient.post<void>(
      `/Tickets/${id}/close`,
      {}
    );
  }

  public async reopenTicket(id: string): Promise<void> {
    return apiClient.post<void>(
      `/Tickets/${id}/reopen`,
      {}
    );
  }

  public async sendToCustomer(
    id: string
  ): Promise<void> {
    return apiClient.post<void>(
      `/Tickets/${id}/send-to-customer`,
      {}
    );
  }
}

export const ticketService = new TicketService();