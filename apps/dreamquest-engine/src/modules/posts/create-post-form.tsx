"use client";

import { startTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@dq/ui/button";
import { Input } from "@dq/ui/input";
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

const formSchema = z.object({
  title: z.string().min(1),
  communityName: z.string().min(1),
});

export function CreatePostForm({ communityName }: { communityName?: string }) {
  const { toast } = useToast();
  const router = useRouter();
  const create = trpc.post.create.useMutation({
    onSuccess: (data) => {
      toast({
        // cheer emoji
        title: `Created post ${data.title} 🎉`,
        description: "Your post has been created.",
      });
      startTransition(() => {
        router.push(`/p/${communityName}/${data.id}`);
      });
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!communityName) {
      return toast({
        title: "Community name is required",
        description: "Please select community",
        variant: "destructive",
      });
    }
    create.mutate({ ...values, communityName });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full">
          <Button type="submit" className="float-right">
            Create Post
          </Button>
        </div>
      </form>
    </Form>
  );
}
