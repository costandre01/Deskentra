export interface Product {
  id: string;
  name: string;
  version: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string | null;
}