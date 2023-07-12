"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { JSONContent } from "@tiptap/react";
import { Loader2, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { z } from "zod";

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
import { TipTapEditor } from "~/lib/tip-tap/editor";
import { EditorContent } from "~/lib/tip-tap/editor-content";
import { EditorContentLoading } from "~/lib/tip-tap/editor-content-loading";
import { TipTapMenuBar } from "~/lib/tip-tap/editor-menu-bar";
import { editorActions } from "~/lib/tip-tap/editor-menu-bar-actions";
import { trpc } from "~/lib/trpc/client";

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

export function CreatePostForm(props: EditorProps) {
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
        title: `Created post ${data.title} 🎉`,
        description: "Your post has been created.",
      });
      router.push(`/c/${data.communityName}/${data.id}`);
    },
  });

  async function onSubmit(
    values: z.infer<typeof formSchema>,
    json?: JSONContent,
  ) {
    if (!json) {
      return toast({
        title: "Post content is required",
        description: "Please write something",
        variant: "destructive",
      });
    }
    await create.mutateAsync({
      title: values.title,
      content: json,
      communityName: props.communityName ?? values.communityName,
    });
  }

  return (
    <TipTapEditor>
      {({ getJSON }) => (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) =>
                onSubmit(values, getJSON()),
              )}
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
                            <SelectItem
                              key={community.id}
                              value={community.name}
                            >
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
              <EditorContent loadingContent={<EditorContentLoading />}>
                <TipTapMenuBar actions={editorActions} />
              </EditorContent>
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
        </>
      )}
    </TipTapEditor>
  );
}
