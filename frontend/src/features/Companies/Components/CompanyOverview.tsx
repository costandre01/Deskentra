import {
  Building2,
  Globe,
  Hash,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import {
  DetailGrid,
  DetailSection,
  InfoField,
} from "@/components/detail";

import type { Company } from "../Types/Company";

interface CompanyOverviewProps {
  company: Company;
}

export default function CompanyOverview({
  company,
}: CompanyOverviewProps) {
  return (
    <DetailSection title="Company Information">
      <DetailGrid>
        <InfoField
          label="VAT Number"
          icon={<Hash className="h-4 w-4" />}>
          {company.vatNumber}
        </InfoField>

        <InfoField
            label="Email"
            icon={<Mail className="h-4 w-4" />}>
            {company.email ? (
                <a href={`mailto:${company.email}`}
                    className="text-primary hover:underline">
                    {company.email}
                </a>
            ) : (
                "-"
            )}
        </InfoField>

        <InfoField
            label="Phone"
            icon={<Phone className="h-4 w-4" />}>
            {company.phoneNumber ? (
                <a href={`tel:${company.phoneNumber}`}
                    className="text-primary hover:underline">
                    {company.phoneNumber}
                </a>
            ) : (
                "-"
            )}
        </InfoField>

        <InfoField
            label="Website"
            icon={<Globe className="h-4 w-4" />}>
            {company.website ? (
                <a href={ company.website.startsWith("http")
                            ? company.website
                            : `https://${company.website}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline">
                    {company.website}
                </a>
            ) : (
                "-"
            )}
        </InfoField>

        <InfoField
          label="Address"
          icon={<MapPin className="h-4 w-4" />}
        >
          {company.address}
        </InfoField>

        <InfoField
          label="City"
          icon={<Building2 className="h-4 w-4" />}
        >
          {company.city}
        </InfoField>

        <InfoField label="Postal Code">
          {company.postalCode}
        </InfoField>

        <InfoField label="Country">
          {company.country}
        </InfoField>
      </DetailGrid>
    </DetailSection>
  );
}