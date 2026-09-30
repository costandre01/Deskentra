import { useState } from "react";
import {
  Pencil,
  Save,
  X,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useAuth } from "@/features/Authentication/Context/useAuth";
import { userService } from "@/features/Users/Services/user.service";

import type { AuthUser } from "@/features/Authentication/Types/AuthUser";

function getRoleName(role: number) {
  switch (role) {
    case 0:
      return "Super Administrator";

    case 1:
      return "Administrator";

    case 2:
      return "Supervisor";

    case 3:
      return "Technician";

    case 4:
      return "Customer";

    default:
      return "Unknown";
  }
}

export default function ProfileSettings() {
  const {
    user,
    updateUser,
  } = useAuth();

  const [isEditing, setIsEditing] =
    useState(false);

  const [firstName, setFirstName] =
    useState(
      user?.firstName ?? ""
    );

  const [lastName, setLastName] =
    useState(
      user?.lastName ?? ""
    );

  const [email, setEmail] =
    useState(
      user?.email ?? ""
    );

  const [isSaving, setIsSaving] =
    useState(false);

  if (!user) {
    return null;
  }

  const currentUser = user;

  function handleEdit() {
    setFirstName(currentUser.firstName);
    setLastName(currentUser.lastName);
    setEmail(currentUser.email);

    setIsEditing(true);
  }

  function handleCancel() {
    setFirstName(currentUser.firstName);
    setLastName(currentUser.lastName);
    setEmail(currentUser.email);

    setIsEditing(false);
  }

  async function handleSave() {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim()
    ) {
      return;
    }

    setIsSaving(true);

    try {
      await userService.updateUser(
        currentUser.id,
        {
          id: currentUser.id,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          role: currentUser.role,
          isActive: currentUser.isActive,
        }
      );

        const updatedUser: AuthUser = {
            id: currentUser.id,
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            role: currentUser.role,
            isActive: currentUser.isActive,
        };

      updateUser(updatedUser);

      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>
              Profile
            </CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage your personal information.
            </p>
          </div>

          {!isEditing ? (
            <Button
              variant="outline"
              onClick={handleEdit}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isSaving}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>

              <Button
                onClick={handleSave}
                disabled={isSaving}
              >
                <Save className="mr-2 h-4 w-4" />

                {isSaving
                  ? "Saving..."
                  : "Save Changes"}
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-2">
          <Label htmlFor="firstName">
            First name
          </Label>

          <Input
            id="firstName"
            value={firstName}
            readOnly={!isEditing}
            onChange={(event) =>
              setFirstName(
                event.target.value
              )
            }
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="lastName">
            Last name
          </Label>

          <Input
            id="lastName"
            value={lastName}
            readOnly={!isEditing}
            onChange={(event) =>
              setLastName(
                event.target.value
              )
            }
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">
            Email
          </Label>

          <Input
            id="email"
            type="email"
            value={email}
            readOnly={!isEditing}
            onChange={(event) =>
              setEmail(
                event.target.value
              )
            }
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="role">
            Role
          </Label>

          <Input
            id="role"
            value={getRoleName(user.role)}
            readOnly
          />
        </div>
      </CardContent>
    </Card>
  );
}