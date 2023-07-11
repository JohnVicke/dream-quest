"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash } from "lucide-react";

import { Button } from "@dq/ui/button";
import { useToast } from "@dq/ui/use-toast";

import { trpc } from "~/lib/trpc/client";

export function RemovePostButton({ id }: { id: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const { mutate } = trpc.post.delete.useMutation({
    onSuccess() {
      startTransition(() => {
        router.back();
        toast({
          title: `Deleted post ${id} 🎉`,
          description: "Your post has been deleted.",
        });
      });
    },
  });

  function handleDelete() {
    mutate({ id });
  }

  return (
    <Button variant="destructive" onClick={handleDelete}>
      {isPending ? (
        <Loader2
          className="mr-2 h-4 w-4 animate-spin"
          size={16}
          aria-hidden="true"
        />
      ) : (
        <Trash className="mr-2 h-4 w-4" />
      )}
      Delete
    </Button>
  );
}
