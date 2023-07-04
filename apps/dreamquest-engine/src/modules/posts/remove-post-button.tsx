"use client";

import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";

import { Button } from "@dq/ui/button";
import { useToast } from "@dq/ui/use-toast";

import { trpc } from "~/lib/trpc/client";

export function RemovePostButton({ id }: { id: number }) {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate } = trpc.post.delete.useMutation({
    onSuccess() {
      toast({
        title: `Deleted post ${id} 🎉`,
        description: "Your post has been deleted.",
      });
      router.refresh();
    },
  });

  function handleDelete() {
    mutate({ id });
  }

  return (
    <Button variant="destructive" onClick={handleDelete}>
      Delete
      <Trash />
    </Button>
  );
}
