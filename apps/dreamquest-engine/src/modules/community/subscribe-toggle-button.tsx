"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, HeartCrack } from "lucide-react";

import { Button } from "@dq/ui/button";
import { useToast } from "@dq/ui/use-toast";

import { trpc } from "~/lib/trpc/client";

interface SubscribeButtonProps {
  communityId: number;
  isAuthed?: boolean;
  initialIsSubscribed?: boolean;
}

export function SubscribeToggleButton({
  isAuthed,
  communityId,
  initialIsSubscribed,
}: SubscribeButtonProps) {
  const { toast } = useToast();
  const [isSubscribed, setIsSubscribed] = useState(initialIsSubscribed);

  const subscribeMutation = trpc.subscription.subscribe.useMutation({
    onMutate: () => {
      setIsSubscribed(true);
    },
    onError: () => {
      toast({
        title: "Oops, looks like we couldn't subscribe you.",
        description: "Something went wrong, try again later.",
        variant: "destructive",
      });
      setIsSubscribed(initialIsSubscribed);
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });
      toast({
        title: "You have subscribed to this community 🎉",
        description: "You will now see posts from this community.",
      });
    },
  });
  const unSubscribeMutation = trpc.subscription.unsubscribe.useMutation({
    onMutate: () => {
      setIsSubscribed(false);
    },
    onError: () => {
      toast({
        title:
          "Oops, looks like we couldn't unsubscribe you to this community 🙁",
        description: "Something went wrong, try again later.",
        variant: "destructive",
      });
      setIsSubscribed(initialIsSubscribed);
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });
      toast({
        title: "You have unsubscribed from this community. 🥲 ",
        description: "You will no longer see posts from this community.",
      });
    },
  });

  const router = useRouter();

  function handleSubscribe() {
    if (!isAuthed) {
      return router.push("/signin");
    }
    if (isSubscribed) {
      return unSubscribeMutation.mutate({ communityId });
    }
    subscribeMutation.mutate({ communityId });
  }
  return (
    <Button
      size="sm"
      onClick={handleSubscribe}
      variant={isSubscribed ? "outline" : "default"}
    >
      {isSubscribed ? "Unsubscribe" : "Subscribe"}
      {isSubscribed ? (
        <HeartCrack className="ml-2 h-4 w-4" />
      ) : (
        <Heart className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
}
