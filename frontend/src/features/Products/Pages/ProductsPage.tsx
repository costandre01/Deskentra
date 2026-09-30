import { useState } from "react";

import { Button } from "@/components/ui/button";

import PageContainer from "@/components/layout/PageContainer";
import Section from "@/components/layout/Section";

import ErrorState from "@/components/states/ErrorState";
import Loading from "@/components/states/Loading";

import ProductDialog from "../Components/ProductDialog";
import ProductTable from "../Components/ProductTable";
import DeleteProductDialog from "../Components/DeleteProductDialog";

import {
  useProducts,
  useToggleProductStatus,
} from "../Hooks";

import type { Product } from "../Types/Product";

export default function ProductsPage() {
  const [page, setPage] = useState(1);

  const pageSize = 20;

  const [search, setSearch] = useState("");

  const {
    data: productsData,
    isLoading,
    error,
  } = useProducts(
    page,
    pageSize,
    search
  );

  const toggleProductStatus =
    useToggleProductStatus();

  const products =
    productsData?.items ?? [];

  const totalPages = Math.max(
    1,
    Math.ceil(
      (productsData?.totalItems ?? 0) /
        pageSize
    )
  );

  const [
    editingProduct,
    setEditingProduct,
  ] = useState<Product | undefined>();

  const [
    isProductDialogOpen,
    setProductDialogOpen,
  ] = useState(false);

  const [
    deletingProduct,
    setDeletingProduct,
  ] = useState<Product | undefined>();

  const [
    isDeleteDialogOpen,
    setDeleteDialogOpen,
  ] = useState(false);

  const handleSearchChange = (
    value: string
  ) => {
    setSearch(value);
    setPage(1);
  };

  const handleToggleStatus = async (
    id: string
  ) => {
    await toggleProductStatus.mutateAsync(id);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <ErrorState message="Failed to load products." />
    );
  }

  return (
    <PageContainer>
      <Section
        title="Products"
        description="Manage your products and versions."
        action={
          <Button
            onClick={() => {
              setEditingProduct(undefined);
              setProductDialogOpen(true);
            }}
          >
            New Product
          </Button>
        }
      >
        <ProductTable
          products={products}
          onEdit={(product) => {
            setEditingProduct(product);
            setProductDialogOpen(true);
          }}
          onDelete={(product) => {
            setDeletingProduct(product);
            setDeleteDialogOpen(true);
          }}
          onActivate={handleToggleStatus}
          page={
            productsData?.page ?? page
          }
          totalPages={totalPages}
          totalItems={
            productsData?.totalItems ?? 0
          }
          pageSize={pageSize}
          onPageChange={setPage}
          search={search}
          onSearchChange={
            handleSearchChange
          }
        />

        <ProductDialog
          open={isProductDialogOpen}
          onOpenChange={
            setProductDialogOpen
          }
          product={editingProduct}
        />

        <DeleteProductDialog
          open={isDeleteDialogOpen}
          onOpenChange={
            setDeleteDialogOpen
          }
          product={deletingProduct}
        />
      </Section>
    </PageContainer>
  );
}