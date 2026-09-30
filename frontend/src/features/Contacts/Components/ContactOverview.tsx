import {
  Building2,
  Mail,
  Phone,
  Smartphone,
  User,
} from "lucide-react";

import {
  DetailGrid,
  DetailSection,
  InfoField,
} from "@/components/detail";

import type { Contact } from "../Types/Contact";

interface ContactOverviewProps {
  contact: Contact;
}

export default function ContactOverview({
  contact,
}: ContactOverviewProps) {
  return (
    <DetailSection title="Contact Information">
      <DetailGrid>
        <InfoField
          label="Company"
          icon={<Building2 className="h-4 w-4" />}
        >
          {contact.companyName}
        </InfoField>

        <InfoField
          label="Email"
          icon={<Mail className="h-4 w-4" />}
        >
          {contact.email ? (
            <a
              href={`mailto:${contact.email}`}
              className="text-primary hover:underline"
            >
              {contact.email}
            </a>
          ) : (
            "-"
          )}
        </InfoField>

        <InfoField
          label="Phone"
          icon={<Phone className="h-4 w-4" />}
        >
          {contact.phoneNumber ? (
            <a
              href={`tel:${contact.phoneNumber}`}
              className="text-primary hover:underline"
            >
              {contact.phoneNumber}
            </a>
          ) : (
            "-"
          )}
        </InfoField>

        <InfoField
          label="Mobile"
          icon={<Smartphone className="h-4 w-4" />}
        >
          {contact.mobileNumber ? (
            <a
              href={`tel:${contact.mobileNumber}`}
              className="text-primary hover:underline"
            >
              {contact.mobileNumber}
            </a>
          ) : (
            "-"
          )}
        </InfoField>

        <InfoField
          label="Position"
          icon={<User className="h-4 w-4" />}
        >
          {contact.position || "-"}
        </InfoField>

        <InfoField label="Primary Contact">
          {contact.isPrimary ? "Yes" : "No"}
        </InfoField>

        <InfoField label="Status">
          {contact.isActive ? "Active" : "Inactive"}
        </InfoField>

        <InfoField label="Notes">
          {contact.notes || "-"}
        </InfoField>
      </DetailGrid>
    </DetailSection>
  );
}