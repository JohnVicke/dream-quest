"use client";

import React from "react";
import Typography from "@tiptap/extension-typography";
import { Editor, EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const TipTapEditorContext = React.createContext<Editor | null>(null);

export const TipTapEditorProvider = ({ children }: React.PropsWithChildren) => {
  const editor = useEditor({
    editable: true,
    extensions: [StarterKit, Typography],
  });
  return (
    <TipTapEditorContext.Provider value={editor}>
      <div className="rounded-md border">{children}</div>
    </TipTapEditorContext.Provider>
  );
};

export function useTipTapEditor() {
  return React.useContext(TipTapEditorContext);
}

export function TipTapEditor() {
  const editor = useTipTapEditor();

  return (
    <EditorContent
      editor={editor}
      className="prose prose-sm prose-slate dark:prose-invert min-h-[5rem] max-w-none resize-y rounded-md p-4 focus:outline-none"
    />
  );
}
