import { useState } from "react";
import { useParams } from "react-router-dom";

import { DetailPage, DetailState } from "@/components/detail";

import CompanyContacts from "../Components/CompanyContacts";
import CompanyContracts from "../Components/CompanyContracts";
import CompanyDialog from "../Components/CompanyDialog";
import CompanyHeader from "../Components/CompanyHeader";
import CompanyOverview from "../Components/CompanyOverview";
import CompanyProducts from "../Components/CompanyProducts";
import CompanyTickets from "../Components/CompanyTickets";
import DeleteCompanyDialog from "../Components/DeleteCompanyDialog";

import { useCompany } from "../Hooks";

export default function CompanyDetailsPage() {
    const { id } = useParams();

    const [isCompanyDialogOpen, setCompanyDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const {
        data: company,
        isLoading,
        error,
    } = useCompany(id!);

    return (
        <DetailState
            isLoading={isLoading}
            error={error}
            data={company}
            errorMessage="Failed to load company."
            notFoundMessage="Company not found."
        >
            {(company) => (
                <DetailPage>
                    <CompanyHeader
                        company={company}
                        onEdit={() => setCompanyDialogOpen(true)}
                        onDelete={() => setDeleteDialogOpen(true)}
                    />

                    <CompanyOverview company={company} />

                    <CompanyContacts companyId={company.id} />

                    <CompanyContracts />

                    <CompanyProducts />

                    <CompanyTickets />

                    <CompanyDialog
                        open={isCompanyDialogOpen}
                        onOpenChange={setCompanyDialogOpen}
                        company={company}
                    />

                    <DeleteCompanyDialog
                        open={isDeleteDialogOpen}
                        onOpenChange={setDeleteDialogOpen}
                        company={company}
                    />
                </DetailPage>
            )}
        </DetailState>
    );
}