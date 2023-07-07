"use client";

import { usePathname, useRouter } from "next/navigation";

import { Dialog, DialogContent } from "@dq/ui/dialog";

import { CreateCommunityForm } from "~/app/(main)/c/create/create-community-form";
import { ReactQueryProvider } from "~/providers/react-query-provider";

export default function CreateCommunityModal() {
  const router = useRouter();
  const pathname = usePathname();
  const isOpen = pathname === "/c/create";
  return (
    <ReactQueryProvider>
      <Dialog
        open={isOpen}
        onOpenChange={() => {
          router.back();
        }}
      >
        <DialogContent>
          <CreateCommunityForm />
        </DialogContent>
      </Dialog>
    </ReactQueryProvider>
  );
}
