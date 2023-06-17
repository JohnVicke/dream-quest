"use client";

import { useRouter } from "next/navigation";

import { Dialog, DialogContent } from "@dq/ui/dialog";

import { CreateCommunityForm } from "~/app/community/create/create-community-form";

export default function CreateCommunityModal() {
  const router = useRouter();
  return (
    <Dialog
      open
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent>
        <CreateCommunityForm />
      </DialogContent>
    </Dialog>
  );
}
