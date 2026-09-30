export interface TicketAttachment {
  id: string;
  ticketId: string;
  uploadedById: string;
  uploadedByName: string;
  fileName: string;
  contentType: string;
  fileSize: number;
  createdAt: string;
}