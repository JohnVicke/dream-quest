"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@dq/ui/button";
import { Input } from "@dq/ui/input";
import { Textarea } from "@dq/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/form";

const formSchema = z.object({
  storyName: z.string().min(1, { message: "Story name is required" }),
  storyDescription: z
    .string()
    .min(1, { message: "Story description is required" }),
});

export default function HomePage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storyName: "",
      storyDescription: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { storyName, storyDescription } = values;
    console.log(storyName, storyDescription);
  }

  return (
    <div className="mx-auto flex max-w-screen-lg flex-col gap-y-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="storyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What is your cool story called?</FormLabel>
                <FormControl>
                  <Input placeholder="Epic adventure" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="storyDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Epic adventure" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
