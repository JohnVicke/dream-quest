"use client";

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
});

export function CreatePostForm({ communityName }: { communityName: string }) {
  const { toast } = useToast();
  const router = useRouter();
  const create = trpc.post.create.useMutation({
    onSuccess: (data) => {
      toast({
        // cheer emoji
        title: `Created community ${data.title} 🎉`,
        description: "Your community has been created.",
      });
      router.refresh();
      router.back();
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
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
