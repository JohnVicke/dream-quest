"use client";

import { Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  Heading,
  Italic,
  List,
  ListOrdered,
  Redo2,
  SplitSquareVertical,
  Strikethrough,
  TextQuote,
  Undo2,
} from "lucide-react";

type EditorAction =
  | "bold"
  | "italic"
  | "strike"
  | "code"
  | "heading"
  | "bulletList"
  | "codeBlock"
  | "orderedList"
  | "blockquote"
  | "hr"
  | "undo"
  | "redo";

interface MenuBarItem {
  name: EditorAction;
  icon: React.ReactNode;
  handleOnClick: (editor: Editor) => void;
  isDisabled?: (editor: Editor) => boolean;
  isActive?: (editor: Editor) => boolean;
  active?: boolean;
  tooltip: string;
}
export const menuBarItems: MenuBarItem[] = [
  {
    name: "bold",
    icon: <Bold className="h-4 w-4" />,
    handleOnClick: (editor: Editor) =>
      editor.chain().focus().toggleBold().run(),
    isDisabled: (editor: Editor) =>
      !editor.can().chain().focus().toggleBold().run(),
    isActive: (editor: Editor) => editor.isActive("bold"),
    tooltip: "Bold",
  },
  {
    name: "italic",
    icon: <Italic className="h-4 w-4" />,
    handleOnClick: (editor: Editor) =>
      editor.chain().focus().toggleItalic().run(),
    isDisabled: (editor: Editor) =>
      !editor.can().chain().focus().toggleItalic().run(),
    isActive: (editor: Editor) => editor.isActive("italic"),
    tooltip: "Italic",
  },
  {
    name: "strike",
    icon: <Strikethrough className="h-4 w-4" />,
    handleOnClick: (editor: Editor) =>
      editor.chain().focus().toggleStrike().run(),
    isDisabled: (editor: Editor) =>
      !editor.can().chain().focus().toggleStrike().run(),
    isActive: (editor: Editor) => editor.isActive("strike"),
    tooltip: "Strikethrough",
  },
  {
    name: "code",
    icon: <Code className="h-4 w-4" />,
    handleOnClick: (editor: Editor) =>
      editor.chain().focus().toggleCode().run(),
    isDisabled: (editor: Editor) =>
      !editor.can().chain().focus().toggleCode().run(),
    isActive: (editor: Editor) => editor.isActive("code"),
    tooltip: "Code",
  },
  {
    name: "heading",
    icon: <Heading className="h-4 w-4" />,
    handleOnClick: (editor: Editor) =>
      editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isDisabled: (editor: Editor) =>
      !editor.can().chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: (editor: Editor) => editor.isActive("heading", { level: 1 }),
    tooltip: "Heading",
  },
  {
    name: "blockquote",
    icon: <TextQuote className="h-4 w-4" />,
    handleOnClick: (editor: Editor) =>
      editor.chain().focus().toggleBlockquote().run(),
    isDisabled: (editor: Editor) =>
      !editor.can().chain().focus().toggleBlockquote().run(),
    isActive: (editor: Editor) => editor.isActive("blockquote"),
    tooltip: "Quote",
  },
  {
    name: "bulletList",
    icon: <List className="h-4 w-4" />,
    handleOnClick: (editor: Editor) =>
      editor.chain().focus().toggleBulletList().run(),
    isDisabled: (editor: Editor) =>
      !editor.can().chain().focus().toggleBulletList().run(),
    isActive: (editor: Editor) => editor.isActive("bulletList"),
    tooltip: "Bullet List",
  },
  {
    name: "orderedList",
    icon: <ListOrdered className="h-4 w-4" />,
    handleOnClick: (editor: Editor) =>
      editor.chain().focus().toggleOrderedList().run(),
    isDisabled: (editor: Editor) =>
      !editor.can().chain().focus().toggleOrderedList().run(),
    isActive: (editor: Editor) => editor.isActive("orderedList"),
    tooltip: "Numbered List",
  },
  {
    name: "hr",
    icon: <SplitSquareVertical className="h-4 w-4" />,
    handleOnClick: (editor: Editor) =>
      editor.chain().focus().setHorizontalRule().run(),
    tooltip: "Horizontal Rule",
  },
  {
    name: "undo",
    icon: <Undo2 className="h-4 w-4" />,
    handleOnClick: (editor: Editor) => editor.chain().focus().undo().run(),
    isDisabled: (editor: Editor) => !editor.can().chain().focus().undo().run(),
    tooltip: "Undo",
  },
  {
    name: "redo",
    icon: <Redo2 className="h-4 w-4" />,
    handleOnClick: (editor: Editor) => editor.chain().focus().redo().run(),

    isDisabled: (editor: Editor) => !editor.can().chain().focus().redo().run(),
    tooltip: "Redo",
  },
];
