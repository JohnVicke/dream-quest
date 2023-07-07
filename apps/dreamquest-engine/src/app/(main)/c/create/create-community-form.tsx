"use client";

import { startTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, InfoIcon, LockIcon, User2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@dq/ui/button";
import { Input } from "@dq/ui/input";
import { RadioGroup, RadioGroupItem } from "@dq/ui/radio-group";
import { useToast } from "@dq/ui/use-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/form";
import { trpc } from "~/lib/trpc/client";

const formSchema = z.object({
  name: z.string().min(1),
  type: z.enum(["public", "private", "restricted"]),
});

export function CreateCommunityForm() {
  const { toast } = useToast();
  const router = useRouter();
  const create = trpc.community.create.useMutation({
    onSuccess: (data) => {
      toast({
        title: `Created community ${data.name} 🎉`,
        description: "Your community has been created.",
      });
      startTransition(() => {
        router.refresh();
      });
      router.push(`/c/${data.name}`);
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "public",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    create.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Community name</FormLabel>
              <FormDescription className="flex items-center">
                <InfoIcon className="mr-2 inline-block h-4 w-4" />
                After choosing a name for your community, you can&apos;t change
                it.
              </FormDescription>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-2 top-2">c/</span>
                  <Input
                    className="pl-6"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value.replace(/\s+/g, ""))
                    }
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Community type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(e) =>
                    field.onChange(e as "public" | "private" | "restricted")
                  }
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="public" />
                    </FormControl>
                    <div>
                      <FormLabel className="font-normal">
                        <User2Icon className="mr-2 inline-block h-4 w-4" />
                        Public
                      </FormLabel>
                      <FormDescription>
                        Anyone can view this community and post here.
                      </FormDescription>
                    </div>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="private" />
                    </FormControl>
                    <div>
                      <FormLabel className="font-normal">
                        <EyeIcon className="mr-2 inline-block h-4 w-4" />
                        Private
                      </FormLabel>
                      <FormDescription>
                        Anyone can view this community, but only approved users
                        can post here.
                      </FormDescription>
                    </div>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="restricted" />
                    </FormControl>
                    <div>
                      <FormLabel className="font-normal">
                        <LockIcon className="mr-2 inline-block h-4 w-4" />
                        Restricted
                      </FormLabel>
                      <FormDescription>
                        Only approved users can view and submit to this
                        community.
                      </FormDescription>
                    </div>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full">
          <Button type="submit" className="float-right">
            Create community
          </Button>
        </div>
      </form>
    </Form>
  );
}
