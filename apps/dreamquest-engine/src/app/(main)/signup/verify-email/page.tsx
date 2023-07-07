import { type Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@dq/ui/card";

import { VerifyEmailForm } from "~/modules/auth/verify-email-form";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify your email address to continue with your sign up",
};

export default function VerifyEmailPage() {
  return (
    <Card className="mx-auto w-full max-w-lg p-4">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Verify email</CardTitle>
        <CardDescription>
          Verify your email address to complete your account creation
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <VerifyEmailForm />
      </CardContent>
    </Card>
  );
}
