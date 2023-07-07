"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { isClerkAPIResponseError, useSignUp } from "@clerk/nextjs";
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

const formSchema = z.object({
  code: z.string().min(6, {
    message: "Code must be at least 6 characters long",
  }),
});

export function VerifyEmailForm() {
  const { toast } = useToast();
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isLoaded) return;
    startTransition(async () => {
      try {
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code: values.code,
        });
        if (completeSignUp?.status !== "complete") {
          // TODO: Handle this case
          return;
        }

        await setActive({ session: completeSignUp.createdSessionId });
        router.push(`${window.location.origin}/`);
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
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <Input
                  placeholder="123456"
                  {...field}
                  onChange={(e) => {
                    e.target.value = e.target.value.trim();
                    field.onChange(e);
                  }}
                />
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
          Create account
        </Button>
      </form>
    </Form>
  );
}
