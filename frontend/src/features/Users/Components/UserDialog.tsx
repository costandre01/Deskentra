import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { SubmitButton } from "@/components/forms";

import { toast } from "sonner";
import { ApiException } from "@/services/ApiException";

import {
  useCreateUser,
  useUpdateUser,
} from "../Hooks";

import type { User } from "../Types/User";

import type {
  CreateUserRequest,
  UpdateUserRequest,
} from "../Services/user.service";

import UserForm from "./UserForm";

import type { UserFormValues } from "./UserFormSchema";

interface UserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User;
  onSuccess?: () => void;
}

export default function UserDialog({
  open,
  onOpenChange,
  user,
  onSuccess,
}: UserDialogProps) {
  const isEdit = user !== undefined;

  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  const loading = isEdit
    ? updateUser.isPending
    : createUser.isPending;

  async function handleSubmit(
    formData: UserFormValues
  ) {
    try {
      if (isEdit && user) {
        const data: UpdateUserRequest = {
          id: user.id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          role: formData.role,
          isActive: formData.isActive,
        };

        await updateUser.mutateAsync({
          id: user.id,
          data,
        });

        toast.success(
          "User updated successfully."
        );
      } else {
        const data: CreateUserRequest = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password ?? "",
          role: formData.role,
        };

        await createUser.mutateAsync(data);

        toast.success(
          "User created successfully."
        );
      }

      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      if (error instanceof ApiException) {
        toast.error(error.message);
      } else {
        toast.error("Unexpected error.");
      }
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit User" : "Create User"}
          </DialogTitle>
        </DialogHeader>

        <UserForm
          defaultValues={user}
          loading={loading}
          onSubmit={handleSubmit}
          onCancel={() =>
            onOpenChange(false)
          }
          submitButton={
            <SubmitButton
              loading={loading}
              label={
                isEdit
                  ? "Save Changes"
                  : "Create User"
              }
              loadingLabel="Saving..."
            />
          }
        />
      </DialogContent>
    </Dialog>
  );
}