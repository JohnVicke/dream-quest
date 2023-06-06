"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button, Input } from "@ff/ui";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/form";
import { useMagicFlow } from "./use-magic-flow";

const formSchema = z.object({
  email: z.string().email({
    message: "Email is incorrect...",
  }),
});

export function EmailSigninForm() {
  const { createSignIn, magicSignUpFlow, magicSignInFlow, getFirstFactor } =
    useMagicFlow();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email } = values;

    await createSignIn(email);

    const firstFactor = getFirstFactor();

    if (!firstFactor?.emailAddressId) {
      await magicSignUpFlow(email);
      return;
    }

    await magicSignInFlow(firstFactor.emailAddressId);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input placeholder="joe.doe@mail.com" {...field} />
              </FormControl>
              <FormDescription>Email address</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
