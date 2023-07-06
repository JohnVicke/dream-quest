"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@dq/ui/button";
import { Input } from "@dq/ui/input";

import {
  Form,
  FormControl,
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
    console.log(firstFactor);

    if (!firstFactor?.emailAddressId) {
      return await magicSignUpFlow(email);
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
              <FormLabel>Email address or username</FormLabel>
              <FormControl>
                <Input placeholder="joe.doe@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
