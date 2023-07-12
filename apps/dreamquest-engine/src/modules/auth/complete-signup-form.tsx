"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
  username: z.string().min(3),
});

export function CompleteSignUpForm() {
  const { toast } = useToast();
  const router = useRouter();
  const mutation = trpc.user.putUsername.useMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Your account has been created!",
      });
      router.push("/");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
      });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    await mutation.mutateAsync({ username: values.username });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="user1337" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={mutation.isLoading || mutation.isError}
          type="submit"
          className="w-full"
        >
          {mutation.isLoading && (
            <Loader2
              className="mr-2 h-4 w-4 animate-spin"
              size={16}
              aria-hidden="true"
            />
          )}
          Sign in
        </Button>
      </form>
    </Form>
  );
}
