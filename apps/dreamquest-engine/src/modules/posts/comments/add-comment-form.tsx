"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { JSONContent } from "@tiptap/react";
import { Plus } from "lucide-react";

import { Button } from "@dq/ui/button";
import { useToast } from "@dq/ui/use-toast";

import { Editor } from "~/lib/tip-tap/editor";
import { EditorContent } from "~/lib/tip-tap/editor-content";
import { EditorContentLoading } from "~/lib/tip-tap/editor-content-loading";
import { EditorMenuBar } from "~/lib/tip-tap/editor-menu-bar";
import { editorActions } from "~/lib/tip-tap/editor-menu-bar-actions";
import { trpc } from "~/lib/trpc/client";

interface AddCommentFormProps {
  postId: string;
}

export function AddCommentForm({ postId }: AddCommentFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const mutation = trpc.comment.createPostComment.useMutation({
    onSuccess: () => {
      toast({
        title: "Comment added",
        description: "Your comment has been added to the post.",
      });
      router.refresh();
    },
  });

  async function handleSubmit(content?: JSONContent) {
    if (!content) {
      toast({
        title: "Comment is empty",
        description: "Please add some content to your comment.",
        variant: "destructive",
      });
      return;
    }
    await mutation.mutateAsync({ content, postId });
  }

  return (
    <Editor>
      {({ getJSON }) => (
        <EditorContent loadingContent={<EditorContentLoading />}>
          <EditorMenuBar actions={editorActions}>
            <Button size="xs" onClick={() => handleSubmit(getJSON())}>
              <Plus className="h-4 w-4" />
              Add comment
            </Button>
          </EditorMenuBar>
        </EditorContent>
      )}
    </Editor>
  );
}
