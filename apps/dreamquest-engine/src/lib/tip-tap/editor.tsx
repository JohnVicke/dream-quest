"use client";

import Typography from "@tiptap/extension-typography";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { EditorMenuBar } from "./editor-menu-bar";

export function TipTapEditor() {
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

  return (
    <div className="rounded-md border">
      <EditorContent
        editor={editor}
        className="prose prose-sm prose-slate dark:prose-invert min-h-[5rem] max-w-none resize-y rounded-md p-4 focus:outline-none"
      />
      <EditorMenuBar editor={editor} />
    </div>
  );
}
