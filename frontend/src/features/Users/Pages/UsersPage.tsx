import { useState } from "react";

import { Button } from "@/components/ui/button";

import PageContainer from "@/components/layout/PageContainer";
import Section from "@/components/layout/Section";

import ErrorState from "@/components/states/ErrorState";
import Loading from "@/components/states/Loading";

import UserTable from "../Components/UserTable";
import UserDialog from "../Components/UserDialog";
import DeleteUserDialog from "../Components/DeleteUserDialog";

import { useUsers, useToggleUserStatus } from "../Hooks";

import { useAuth } from "@/features/Authentication/Context/useAuth";

import type { User } from "../Types/User";

export default function UsersPage() {
  const [page, setPage] = useState(1);

  const pageSize = 20;

  const [search, setSearch] = useState("");

  const [userDialogOpen, setUserDialogOpen] =
    useState(false);
  
  const { user } = useAuth();

  const currentUserId = user?.id;

  const [editingUser, setEditingUser] =
    useState<User | undefined>();

  const [deletingUser, setDeletingUser] =
    useState<User | undefined>();
  
  const toggleUserStatus = useToggleUserStatus();

  const handleToggleStatus = async (id: string) => {
    await toggleUserStatus.mutateAsync(id);
  };

  const {
    data,
    isLoading,
    error,
  } = useUsers(
    page,
    pageSize,
    search
  );

  const users = data?.items ?? [];

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
        message="Failed to load users."
      />
    );
  }

  return (
    <PageContainer>
      <Section
        title="Users"
        description="Manage Deskentra users."
        action={
          <Button
            onClick={() => {
              setEditingUser(undefined);
              setUserDialogOpen(true);
            }}
          >
            New User
          </Button>
        }
      >
        <UserTable
          users={users}
          onEdit={(user) => {
            setEditingUser(user);
            setUserDialogOpen(true);
          }}
          onDelete={(user) => {
            setDeletingUser(user);
          }}
          onToggleStatus={handleToggleStatus}
          currentUserId={currentUserId}
          page={data?.page ?? page}
          totalPages={data?.totalPages ?? 1}
          totalItems={data?.totalItems ?? 0}
          pageSize={pageSize}
          onPageChange={setPage}
          search={search}
          onSearchChange={handleSearchChange}
        />

        <UserDialog
          open={userDialogOpen}
          onOpenChange={setUserDialogOpen}
          user={editingUser}
        />

        <DeleteUserDialog
          open={
            deletingUser !== undefined
          }
          onOpenChange={(open) => {
            if (!open) {
              setDeletingUser(undefined);
            }
          }}
          user={deletingUser}
        />
      </Section>
    </PageContainer>
  );
}