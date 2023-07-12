"use client";

import React from "react";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import { JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { EditorContext } from "./editor-context";

import "~/styles/tip-tap-placeholder.css";

interface RenderProps {
  getJSON: () => JSONContent | undefined;
}

interface TipTapEditorProps {
  children: (renderProps: RenderProps) => React.ReactNode;
}

export function Editor(props: TipTapEditorProps) {
  const editor = useEditor({
    editable: true,
    extensions: [
      StarterKit,
      Typography,
      Placeholder.configure({
        placeholder: "Whats on your mind today?",
      }),
    ],
  });
  return (
    <EditorContext.Provider value={editor}>
      {props.children({
        getJSON: () => editor?.getJSON(),
      })}
    </EditorContext.Provider>
  );
}
