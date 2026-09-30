import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageContainer from "@/components/layout/PageContainer";
import Section from "@/components/layout/Section";

import { apiClient } from "@/services/ApiClient";
import { ApiException } from "@/services/ApiException";

type InvitationState =
  | "loading"
  | "valid"
  | "revoked"
  | "expired"
  | "accepted"
  | "invalid";

interface Invitation {
  contactId: string;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  expiresAt: string;
}

export default function AcceptInvitationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [invitation, setInvitation] =
    useState<Invitation | null>(null);

  const [invitationState, setInvitationState] =
    useState<InvitationState>("loading");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] =
    useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  useEffect(() => {
    async function loadInvitation() {
      if (!token) {
        setInvitationState("invalid");
        return;
      }

      try {
        const result =
          await apiClient.get<Invitation>(
            `/customer-invitations?token=${encodeURIComponent(token)}`
          );

        setInvitation(result);
        setInvitationState("valid");
      } catch (error) {
        if (error instanceof ApiException) {
          if (
            error.message.includes(
              "has been revoked"
            )
          ) {
            setInvitationState("revoked");
            return;
          }

          if (
            error.message.includes(
              "has expired"
            )
          ) {
            setInvitationState("expired");
            return;
          }

          if (
            error.message.includes(
              "already been accepted"
            )
          ) {
            setInvitationState("accepted");
            return;
          }
        }

        setInvitationState("invalid");
      }
    }

    void loadInvitation();
  }, [token]);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError(null);

    if (!token) {
      setError("Invalid invitation link.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must contain at least 8 characters."
      );
      return;
    }

    try {
      setIsSubmitting(true);

      await apiClient.post(
        "/customer-invitations/accept",
        {
          token,
          password,
        }
      );

      navigate("/login");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to accept invitation."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (invitationState === "loading") {
    return (
      <PageContainer>
        <Section
          title="Checking invitation..."
          description="Please wait while we verify your invitation."
        >
          <p className="text-sm text-muted-foreground">
            Please wait...
          </p>
        </Section>
      </PageContainer>
    );
  }

  if (invitationState === "revoked") {
    return (
      <PageContainer>
        <Section
          title="Invitation no longer valid"
          description="This invitation has been replaced."
        >
          <div className="max-w-md space-y-4">
            <p className="text-sm text-muted-foreground">
              This invitation is no longer valid because
              a new invitation has been sent to you.
            </p>

            <p className="text-sm text-muted-foreground">
              Please use the link from the most recent
              Deskentra invitation email.
            </p>
          </div>
        </Section>
      </PageContainer>
    );
  }

  if (invitationState === "expired") {
    return (
      <PageContainer>
        <Section
          title="Invitation expired"
          description="This invitation is no longer valid."
        >
          <div className="max-w-md space-y-4">
            <p className="text-sm text-muted-foreground">
              This invitation has expired after 48 hours.
            </p>

            <p className="text-sm text-muted-foreground">
              Please contact your administrator and ask
              them to send you a new invitation.
            </p>
          </div>
        </Section>
      </PageContainer>
    );
  }

  if (invitationState === "accepted") {
    return (
      <PageContainer>
        <Section
          title="Invitation already accepted"
          description="This invitation has already been used."
        >
          <div className="max-w-md space-y-4">
            <p className="text-sm text-muted-foreground">
              Your Deskentra customer account has already
              been created using this invitation.
            </p>

            <Button
              onClick={() => navigate("/login")}
            >
              Go to Login
            </Button>
          </div>
        </Section>
      </PageContainer>
    );
  }

  if (invitationState === "invalid") {
    return (
      <PageContainer>
        <Section
          title="Invalid invitation"
          description="We couldn't verify this invitation."
        >
          <div className="max-w-md">
            <p className="text-sm text-muted-foreground">
              The invitation link may be invalid or no
              longer available. Please contact your
              administrator and request a new invitation.
            </p>
          </div>
        </Section>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Section
        title="Welcome to Deskentra"
        description="Create your customer account."
      >
        <form
          onSubmit={handleSubmit}
          className="max-w-md space-y-6"
        >
          {invitation && (
            <p className="text-sm text-muted-foreground">
              Welcome{" "}
              <strong>
                {invitation.firstName}{" "}
                {invitation.lastName}
              </strong>
              . Create a password to activate your
              customer account.
            </p>
          )}

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium"
            >
              Password
            </label>

            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter your password"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium"
            >
              Confirm Password
            </label>

            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              placeholder="Confirm your password"
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Creating account..."
              : "Create Account"}
          </Button>
        </form>
      </Section>
    </PageContainer>
  );
}