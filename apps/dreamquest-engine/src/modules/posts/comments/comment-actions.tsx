"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { JSONContent } from "@tiptap/react";
import { Edit, MessageSquare, MessageSquarePlus, Trash2 } from "lucide-react";

import { cn } from "@dq/ui";
import { Button } from "@dq/ui/button";
import { useToast } from "@dq/ui/use-toast";

import { Editor } from "~/lib/tip-tap/editor";
import { EditorContent } from "~/lib/tip-tap/editor-content";
import { EditorContentLoading } from "~/lib/tip-tap/editor-content-loading";
import { EditorMenuBar } from "~/lib/tip-tap/editor-menu-bar";
import { editorActions } from "~/lib/tip-tap/editor-menu-bar-actions";
import { trpc } from "~/lib/trpc/client";
import { ReactQueryProvider } from "~/providers/react-query-provider";

export function CommentActions({
  commentId,
  className,
  hasEditRights,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
  hasEditRights: boolean;
  commentId: string;
}) {
  const [replyOpen, setReplyOpen] = React.useState(false);
  return (
    <ReactQueryProvider>
      <div className={cn("flex flex-col gap-y-4", className)}>
        <div className="flex justify-between">
          <div className="flex gap-x-2">
            {children}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setReplyOpen(true)}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Reply
            </Button>
          </div>
          {hasEditRights && (
            <div className="flex gap-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setReplyOpen(true)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setReplyOpen(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          )}
        </div>
        {replyOpen && (
          <div className="relative mb-4 ml-4 w-full">
            <div className="absolute -left-4 top-0 h-full w-px bg-border" />
            <ReplyToCommentForm commentId={commentId} />
          </div>
        )}
      </div>
    </ReactQueryProvider>
  );
}

interface ReplyToCommentFormProps {
  commentId: string;
}

function ReplyToCommentForm({ commentId }: ReplyToCommentFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const mutation = trpc.comment.replyToComment.useMutation({
    onSuccess: () => {
      toast({
        title: "Reply added",
        description: "Your reply has been added to the comment.",
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
    await mutation.mutateAsync({ content, commentId });
  }

  return (
    <Editor>
      {({ getJSON }) => (
        <EditorContent loadingContent={<EditorContentLoading />}>
          <EditorMenuBar actions={editorActions}>
            <Button size="xs" onClick={() => handleSubmit(getJSON())}>
              <MessageSquarePlus className="h-4 w-4" />
              Reply
            </Button>
          </EditorMenuBar>
        </EditorContent>
      )}
    </Editor>
  );
}
