"use client";

import { useState } from "react";
import { isClerkAPIResponseError, useSignIn } from "@clerk/nextjs";
import { Icon, Loader2 } from "lucide-react";

import { Button } from "@dq/ui/button";
import { useToast } from "@dq/ui/use-toast";

import { GitHub, Google } from "./icons";

type Provider = "oauth_github" | "oauth_google";

const oauthProviders = [
  {
    id: "oauth_github",
    name: "GitHub",
    icon: GitHub,
  },
  {
    id: "oauth_google",
    name: "Google",
    icon: Google,
  },
] satisfies { id: Provider; name: string; icon: Icon }[];

export function OauthSigninForm() {
  const { toast } = useToast();
  const { signIn, isLoaded: signInLoaded } = useSignIn();

  const [isLoading, setIsLoading] = useState<Provider | null>(null);

  async function handleSignIn(provider: Provider) {
    if (!signInLoaded) return;

    try {
      setIsLoading(provider);
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (e) {
      setIsLoading(null);
      const defaultError = "Something went wrong, please try again later...";
      toast({
        title: "Oops something went wrong",
        description: isClerkAPIResponseError(e)
          ? e.errors?.[0].longMessage ?? defaultError
          : defaultError,
      });
    }
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      {oauthProviders.map(({ id, icon: Icon, name }) => (
        <Button
          key={id}
          className="flex flex-1 items-center gap-x-3"
          disabled={isLoading === name}
          onClick={() => void handleSignIn(id)}
        >
          {isLoading === name ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Icon className="h-4 w-4" />
          )}
          {name}
        </Button>
      ))}
    </div>
  );
}
