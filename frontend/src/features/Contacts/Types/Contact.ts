export interface Contact {
  id: string;

  companyId: string;
  companyName: string;

  firstName: string;
  lastName: string;

  email: string;

  phoneNumber: string;
  mobileNumber: string;

  position: string;

  isPrimary: boolean;
  isActive: boolean;
  hasUserAccount: boolean;

  notes?: string | null;

  createdAt: string;
  updatedAt?: string | null;
}