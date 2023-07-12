import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@dq/ui/card";

import { CompleteSignUpForm } from "~/modules/auth/complete-signup-form";
import { ReactQueryProvider } from "~/providers/react-query-provider";

export default function CompleteSignUpPage() {
  return (
    <Card className="mx-auto w-full max-w-lg p-4">
      <CardHeader>
        <CardTitle>Complete signup!</CardTitle>
        <CardDescription>
          Choose a cool username to complete your account creation
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <ReactQueryProvider>
          <CompleteSignUpForm />
        </ReactQueryProvider>
      </CardContent>
    </Card>
  );
}
