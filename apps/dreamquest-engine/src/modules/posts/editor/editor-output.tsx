"use client";

import dynamic from "next/dynamic";

import { CodeRenderer } from "./code-renderer";
import { ImageRenderer } from "./image-renderer";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  { ssr: false },
);

interface EditorOutputProps {
  content: any;
}

const renderers = {
  image: ImageRenderer,
  code: CodeRenderer,
};

const style = {
  paragraph: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
};

export function EditorOutput({ content }: EditorOutputProps) {
  return (
    <Output
      style={style}
      className="text-sm"
      renderers={renderers}
      data={JSON.parse(content)}
    />
  );
}
