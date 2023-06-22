"use client";

import { useRouter } from "next/navigation";

import { Dialog, DialogContent } from "@dq/ui/dialog";

import { CreateCommunityForm } from "~/app/(main)/(authenticated)/community/create/create-community-form";
import { ReactQueryProvider } from "~/app/(main)/(authenticated)/react-query-provider";

export default function CreateCommunityModal() {
  const router = useRouter();
  return (
    <ReactQueryProvider>
      <Dialog
        open
        onOpenChange={() => {
          router.back();
        }}
      >
        <DialogContent>
          <CreateCommunityForm isModal />
        </DialogContent>
      </Dialog>
    </ReactQueryProvider>
  );
}
