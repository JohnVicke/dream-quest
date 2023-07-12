import React from "react";
import { Editor } from "@tiptap/react";

export const TipTapEditorContext = React.createContext<Editor | null>(null);

export function useTipTapEditor() {
  return React.useContext(TipTapEditorContext) as Editor;
}
