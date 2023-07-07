"use client";

import { usePathname, useRouter } from "next/navigation";

import { Dialog, DialogContent } from "@dq/ui/dialog";

import { SignInCard } from "~/modules/auth/sign-in-card";

export default function SignInModal() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Dialog
      open={pathname === "/signin"}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent>
        <SignInCard className="border-none" />
      </DialogContent>
    </Dialog>
  );
}
