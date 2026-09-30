import { useState } from "react";

import { Button } from "@/components/ui/button";

import PageContainer from "@/components/layout/PageContainer";
import Section from "@/components/layout/Section";

import ErrorState from "@/components/states/ErrorState";
import Loading from "@/components/states/Loading";

import CompanyDialog from "../Components/CompanyDialog";
import CompanyTable from "../Components/CompanyTable";
import DeleteCompanyDialog from "../Components/DeleteCompanyDialog";

import { useCompanies } from "../Hooks";

import type { Company } from "../Types/Company";

export default function CompaniesPage() {
  const [page, setPage] = useState(1);

  const pageSize = 20;

  const [search, setSearch] = useState("");

  const [editingCompany, setEditingCompany] =
    useState<Company | undefined>();

  const [isCompanyDialogOpen, setCompanyDialogOpen] =
    useState(false);

  const [deletingCompany, setDeletingCompany] =
    useState<Company | undefined>();

  const [isDeleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  const companyParams = new URLSearchParams();

  companyParams.set(
    "page",
    page.toString()
  );

  companyParams.set(
    "pageSize",
    pageSize.toString()
  );

  if (search.trim()) {
    companyParams.set(
      "search",
      search
    );
  }

  const {
    data,
    isLoading,
    error,
  } = useCompanies(companyParams);

  const companies = data?.items ?? [];

  const totalPages = Math.max(
    1,
    Math.ceil(
      (data?.totalItems ?? 0) /
        pageSize
    )
  );

  const handleSearchChange = (
    value: string
  ) => {
    setSearch(value);
    setPage(1);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <ErrorState
        message="Failed to load companies."
      />
    );
  }

  return (
    <PageContainer>
      <Section
        title="Companies"
        description="Manage your customer companies."
        action={
          <Button
            onClick={() => {
              setEditingCompany(undefined);
              setCompanyDialogOpen(true);
            }}
          >
            New Company
          </Button>
        }
      >
        <CompanyTable
          companies={companies}
          onEdit={(company) => {
            setEditingCompany(company);
            setCompanyDialogOpen(true);
          }}
          onDelete={(company) => {
            setDeletingCompany(company);
            setDeleteDialogOpen(true);
          }}
          page={data?.page ?? page}
          totalPages={totalPages}
          totalItems={data?.totalItems ?? 0}
          pageSize={pageSize}
          onPageChange={setPage}
          search={search}
          onSearchChange={handleSearchChange}
        />

        <CompanyDialog
          open={isCompanyDialogOpen}
          onOpenChange={
            setCompanyDialogOpen
          }
          company={editingCompany}
        />

        <DeleteCompanyDialog
          open={isDeleteDialogOpen}
          onOpenChange={
            setDeleteDialogOpen
          }
          company={deletingCompany}
        />
      </Section>
    </PageContainer>
  );
}