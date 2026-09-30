export interface notification {
  id: string;
  title: string;
  message: string;
  type: number;
  isRead: boolean;
  readAt: string | null;
  createdAt: string;
}