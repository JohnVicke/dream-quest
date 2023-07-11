import Link from "next/link";

import { cn } from "@dq/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@dq/ui/card";

import { EmailSigninForm } from "./email-signin-form";
import { OauthSigninForm } from "./oauth-signin-form";

export function SignInCard({ className }: { className?: string }) {
  return (
    <Card className={cn("mx-auto w-full max-w-lg p-4", className)}>
      <CardHeader>
        <CardTitle>Sign in to your account</CardTitle>
        <CardDescription>Choose your preferred sign in method</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <EmailSigninForm />
        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border border-t" />
          </div>
          <div className="relative flex justify-center text-sm font-medium leading-6">
            <span className="bg-background px-6 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <OauthSigninForm />
        <p className="mt-4 text-center text-sm">
          Not a member?{" "}
          <Link
            href="/signup"
            className="font-semibold leading-6 text-blue-400 hover:text-blue-500"
          >
            Sign up now!
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
