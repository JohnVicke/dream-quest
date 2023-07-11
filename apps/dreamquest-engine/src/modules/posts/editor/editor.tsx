"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { z } from "zod";

import "~/styles/editor.css";

import { useRouter } from "next/navigation";
import { Loader2, Save, Send } from "lucide-react";

import { Community } from "@dq/db";
import { cn } from "@dq/ui";
import { Button } from "@dq/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@dq/ui/select";
import { useToast } from "@dq/ui/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/form";
import { trpc } from "~/lib/trpc/client";

const EDITOR = {
  ID: "editor",
};

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters long",
  }),
  communityName: z.string(),
});

type EditorProps =
  | {
      communityName: string;
      communities?: never;
    }
  | {
      communityName?: never;
      communities: Community[];
    };

export function Editor(props: EditorProps) {
  const [isMounted, setIsMounted] = useState(false);
  const editorRef = useRef<EditorJS | null>(null);
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      communityName: props.communityName,
    },
  });

  const create = trpc.post.create.useMutation({
    onSuccess: (data) => {
      toast({
        // cheer emoji
        title: `Created post ${data.title} 🎉`,
        description: "Your post has been created.",
      });
      router.push(`/c/${data.communityName}/${data.id}`);
    },
  });

  const initEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (editorRef.current) return;
    editorRef.current = new EditorJS({
      holder: EDITOR.ID,
      inlineToolbar: true,
      tools: {
        header: Header,
        list: List,
        embed: Embed,
        code: Code,
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: "/api/editor/link",
          },
        },
        inlineCode: InlineCode,
        image: ImageTool,
      },
      data: {
        blocks: [],
      },
    });
  }, []);

  const focusTitle = useCallback(() => {
    setTimeout(() => {
      form.setFocus("title");
    }, 0);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    (async () => {
      await initEditor();
      focusTitle();
    })();
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [isMounted]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const blocks = await editorRef.current?.save();
    create.mutate({
      title: values.title,
      content: blocks,
      communityName: props.communityName ?? values.communityName,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="prose prose-stone dark:prose-invert"
      >
        {!props.communityName && (
          <FormField
            control={form.control}
            name="communityName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select community</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select which community you want to post in" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {props.communities?.map((community) => (
                      <SelectItem key={community.id} value={community.name}>
                        {community.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className={cn(!props.communityName && "mt-10")}>
              <TextareaAutosize
                className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
                placeholder="Title"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <div
          id={EDITOR.ID}
          className="container min-h-[40rem] w-full rounded-md border"
        />
        <p className="text-sm text-muted-foreground">
          Use{" "}
          <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
            Tab
          </kbd>{" "}
          to open the command menu.
        </p>
        <Button disabled={create.isLoading} type="submit">
          {create.isLoading ? (
            <Loader2
              className="mr-2 h-4 w-4 animate-spin"
              size={16}
              aria-hidden="true"
            />
          ) : (
            <Send className="mr-2 h-4 w-4" />
          )}
          Submit
        </Button>
      </form>
    </Form>
  );
}
