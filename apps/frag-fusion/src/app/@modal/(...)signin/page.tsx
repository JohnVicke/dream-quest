"use client";

import { useRouter } from "next/navigation";

import { Dialog, DialogContent } from "@ff/ui";

import { EmailSigninForm } from "~/app/(auth)/signin/email-signin-form";

export default function SignInModal() {
  const router = useRouter();
  return (
    <Dialog
      open
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent>
        <EmailSigninForm />
      </DialogContent>
    </Dialog>
  );
}
