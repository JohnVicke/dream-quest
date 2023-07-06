"use client";

import { useRouter } from "next/navigation";

import { Dialog, DialogContent } from "@dq/ui/dialog";

import { EmailSigninForm } from "~/app/(main)/signin/email-signin-form";
import { OauthSigninForm } from "~/app/(main)/signin/oauth-signin-form";

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
        <div className="p-4">
          <OauthSigninForm />
          <div className="my-4 flex items-center gap-x-4">
            <div className="w-full border border-b" />
            <p className="text-muted-foreground">or...</p>
            <div className="w-full border border-b" />
          </div>
          <EmailSigninForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
