import { Metadata } from "next";

import { SignInCard } from "~/modules/auth/sign-in-card";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

export default function SigninPage() {
  return <SignInCard />;
}
