import { EditorOutput } from "./editor/editor-output";

interface PostDisplayProps {
  title: string;
  content: any;
}

export function PostDisplay({ title, content }: PostDisplayProps) {
  console.log({ content });
  return (
    <div className="prose prose-stone dark:prose-invert">
      <h1>{title}</h1>
      <EditorOutput content={content} />
    </div>
  );
}
