export interface SaveContactRequest {
  companyId: string;

  firstName: string;
  lastName: string;

  email: string;

  phoneNumber: string;
  mobileNumber: string;

  position: string;

  isPrimary: boolean;

  notes?: string | null;
}