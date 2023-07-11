"use client";

import Typography from "@tiptap/extension-typography";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Code,
  Code2Icon,
  Heading,
  Italic,
  List,
  ListOrdered,
  Redo2,
  SplitSquareHorizontal,
  Strikethrough,
  TextQuote,
  Undo2,
} from "lucide-react";
import { z } from "zod";

import { cn } from "@dq/ui";
import { Button } from "@dq/ui/button";

const formSchema = z.object({
  content: z.string().min(1),
});

export function AddCommentForm() {
  const editor = useEditor({
    editable: true,
    extensions: [StarterKit, Typography],
    content: `
      <h1>
      Markdown shortcuts make it easy to format the text while typing.
    </h1>
    <p>
      To test that, start a new line and type <code>#</code> followed by a space to get a heading. Try <code>#</code>, <code>##</code>, <code>###</code>, <code>####</code>, <code>#####</code>, <code>######</code> for different levels.
    </p>
    <p>
      Those conventions are called input rules in tiptap. Some of them are enabled by default. Try <code>></code> for blockquotes, <code>*</code>, <code>-</code> or <code>+</code> for bullet lists, or <code>\`foobar\`</code> to highlight code, <code>~~tildes~~</code> to strike text, or <code>==equal signs==</code> to highlight text.
    </p>
    <p>
      You can overwrite existing input rules or add your own to nodes, marks and extensions.
    </p>
    <p>
      For example, we added the <code>Typography</code> extension here. Try typing <code>(c)</code> to see how it’s converted to a proper © character. You can also try <code>-></code>, <code>>></code>, <code>1/2</code>, <code>!=</code>, or <code>--</code>.
    </p>
    `,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="rounded-md border">
      <EditorContent
        editor={editor}
        className="prose prose-sm prose-slate dark:prose-invert min-h-[5rem] max-w-none resize-y rounded-md p-4 focus:outline-none"
      />
      <MenuBar editor={editor} />
    </div>
  );
}

interface MenuBarButtonProps {
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
}

function MenuBarButton({
  active,
  ...props
}: React.PropsWithChildren<MenuBarButtonProps>) {
  return (
    <button
      className={cn("rounded-md p-2 hover:bg-primary/10", {
        "font-semibold text-secondary-foreground": active,
        "text-secondary-foreground/50 hover:text-secondary-foreground": !active,
      })}
      {...props}
    />
  );
}

function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;
  return (
    <div className="flex flex-wrap bg-muted">
      <MenuBarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
      >
        <Bold className="h-4 w-4" />
      </MenuBarButton>
      <MenuBarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")}
      >
        <Italic className="h-4 w-4" />
      </MenuBarButton>
      <MenuBarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        active={editor.isActive("strike")}
      >
        <Strikethrough className="h-4 w-4" />
      </MenuBarButton>
      <MenuBarButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        active={editor.isActive("code")}
      >
        <Code className="h-4 w-4" />
      </MenuBarButton>
      <MenuBarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        active={editor.isActive("heading", { level: 1 })}
      >
        <Heading className="h-4 w-4" />
      </MenuBarButton>
      <MenuBarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive("bulletList")}
      >
        <List className="h-4 w-4" />
      </MenuBarButton>
      <MenuBarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive("orderedList")}
      >
        <ListOrdered className="h-4 w-4" />
      </MenuBarButton>
      <MenuBarButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        active={editor.isActive("codeBlock")}
      >
        <Code2Icon className="h-4 w-4" />
      </MenuBarButton>
      <MenuBarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive("blockquote")}
      >
        <TextQuote className="h-4 w-4" />
      </MenuBarButton>
      <MenuBarButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <SplitSquareHorizontal className="h-4 w-4" />
      </MenuBarButton>
      <MenuBarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <Undo2 className="h-4 w-4" />
      </MenuBarButton>
      <MenuBarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <Redo2 className="h-4 w-4" />
      </MenuBarButton>
      <Button size="xs" className="m-2 ml-auto">
        Comment
      </Button>
    </div>
  );
}
