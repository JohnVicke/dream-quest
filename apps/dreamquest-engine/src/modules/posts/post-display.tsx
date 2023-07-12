import { JSONContent } from "@tiptap/react";

import { TipTapEditorPreview } from "~/lib/tip-tap/editor-preview";

interface PostDisplayProps {
  title: string;
  content: JSONContent;
}

export function PostDisplay({ title, content }: PostDisplayProps) {
  return (
    <div className="prose prose-stone dark:prose-invert">
      <h1>{title}</h1>
      <TipTapEditorPreview content={content} />
    </div>
  );
}
