"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

import { Button } from "@dq/ui/button";

type Provider = "oauth_facebook" | "oauth_google";

export function OauthSigninForm() {
  const { signIn, isLoaded: signInLoaded } = useSignIn();

  const [providerStatus, setProviderStatus] = useState<{
    [key in Provider]: boolean;
  }>({
    oauth_google: false,
    oauth_facebook: false,
  });

  async function handleSignIn(provider: Provider) {
    if (!signInLoaded) return;

    setProviderStatus((prev) => ({
      ...prev,
      [provider]: true,
    }));

    try {
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        continueSignUp: true,
        redirectUrlComplete: "/",
      });
    } catch (e) {
      console.error(e);
      setProviderStatus((prev) => ({
        ...prev,
        [provider]: false,
      }));
    }
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Button
        disabled={providerStatus.oauth_facebook}
        onClick={() => handleSignIn("oauth_facebook")}
      >
        {providerStatus.oauth_facebook && <Loader2 className="animate-spin" />}
        sign in with facebook
      </Button>
      <Button
        disabled={providerStatus.oauth_google}
        onClick={() => handleSignIn("oauth_google")}
      >
        {providerStatus.oauth_google && <Loader2 className="animate-spin" />}
        sign in with Google
      </Button>
    </div>
  );
}
