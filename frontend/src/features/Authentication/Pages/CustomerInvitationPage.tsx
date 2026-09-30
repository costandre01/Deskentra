import { useParams, useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import Loading from "@/components/states/Loading";
import ErrorState from "@/components/states/ErrorState";

import { authService } from "../Services/auth.service";

import { useQuery } from "@tanstack/react-query";

export default function CustomerInvitationPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  const {
    data: invitation,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "customer-invitation",
      token,
    ],

    queryFn: () =>
      authService.getCustomerInvitation(token!),

    enabled: !!token,
  });

  if (!token) {
    return (
      <ErrorState
        message="Invalid invitation link."
      />
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <ErrorState
        message={
          error.message ||
          "This invitation is invalid or has expired."
        }
      />
    );
  }

  if (!invitation) {
    return (
      <ErrorState
        message="Invitation not found."
      />
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">
            Welcome to Deskentra
          </CardTitle>

          <CardDescription>
            You have been invited to access the
            Deskentra customer portal.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground">
              Name
            </p>

            <p className="font-medium">
              {invitation.firstName}{" "}
              {invitation.lastName}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Email
            </p>

            <p className="font-medium">
              {invitation.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Company
            </p>

            <p className="font-medium">
              {invitation.companyName}
            </p>
          </div>

          <div className="rounded-lg border bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">
              Invitation expires
            </p>

            <p className="mt-1 font-medium">
              {new Date(
                invitation.expiresAt
              ).toLocaleString()}
            </p>
          </div>

          <Button
            className="w-full"
            onClick={() =>
              navigate(
                `/accept-invitation?token=${encodeURIComponent(token)}`
              )
            }
          >
            Accept Invitation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}