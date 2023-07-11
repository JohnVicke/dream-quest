"use client";

import React from "react";
import Typography from "@tiptap/extension-typography";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const TipTapEditorContext = React.createContext<Editor | null>(null);

export function useTipTapEditor() {
  return React.useContext(TipTapEditorContext) as Editor;
}

export function TipTapEditor({ children }: React.PropsWithChildren) {
  const editor = useEditor({
    editable: true,
    extensions: [StarterKit, Typography],
  });
  if (!editor)
    return (
      <div className="w-full animate-pulse rounded-md border">
        <div className="h-20" />
        <div className="h-8 w-full bg-muted" />
      </div>
    );
  return (
    <TipTapEditorContext.Provider value={editor}>
      <div className="rounded-md border">
        <EditorContent
          editor={editor}
          className="prose prose-sm prose-slate dark:prose-invert min-h-[5rem] max-w-none resize-y rounded-md p-4 focus:outline-none"
        />
        {children}
      </div>
    </TipTapEditorContext.Provider>
  );
}
