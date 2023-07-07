import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@dq/ui/card";

import { EmailSignupForm } from "~/modules/auth/email-signup-form";
import { OauthSigninForm } from "~/modules/auth/oauth-signin-form";

export default function SignUp() {
  return (
    <Card className="mx-auto w-full max-w-lg p-4">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>Choose your preferred sign up method</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <EmailSignupForm />
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
        <div className="mt-6" />
        <OauthSigninForm />
      </CardContent>
    </Card>
  );
}
