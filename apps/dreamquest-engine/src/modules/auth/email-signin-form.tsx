"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { isClerkAPIResponseError, useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@dq/ui/button";
import { Input } from "@dq/ui/input";
import { PasswordInput } from "@dq/ui/password-input";
import { useToast } from "@dq/ui/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/form";

const formSchema = z.object({
  email: z.string().email({
    message: "Email is incorrect...",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export function EmailSigninForm() {
  const { toast } = useToast();
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isLoaded) return;
    startTransition(async () => {
      try {
        const result = await signIn.create({
          identifier: values.email,
          password: values.password,
        });
        if (result.status === "complete") {
          await setActive({ session: result.createdSessionId });
          router.push(`${window.location.origin}/`);
        }
      } catch (e) {
        const defaultError = "Something went wrong, please try again later...";
        toast({
          title: "Oops something went wrong",
          description: isClerkAPIResponseError(e)
            ? e.errors?.[0].longMessage ?? defaultError
            : defaultError,
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input placeholder="joe.doe@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="*************" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit" className="w-full">
          {isPending && (
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
