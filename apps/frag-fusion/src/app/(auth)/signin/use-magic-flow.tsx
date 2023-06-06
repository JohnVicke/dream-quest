"use client";

import { useRouter } from "next/navigation";
import { useSignIn, useSignUp } from "@clerk/nextjs";

import { useToast } from "@ff/ui";

export function useMagicFlow() {
  const router = useRouter();
  const { toast } = useToast();

  const {
    signIn: clerkSignIn,
    isLoaded: signInLoaded,
    setActive,
  } = useSignIn();
  const { signUp: clerkSignUp, isLoaded: signUpLoaded } = useSignUp();

  async function magicSignUpFlow(email: string) {
    if (!signUpLoaded || !signInLoaded) return;

    clerkSignUp
      .create({
        emailAddress: email,
      })
      .catch(console.error);

    const { startMagicLinkFlow } = clerkSignUp.createMagicLinkFlow();
    toast({
      title: "Email sent",
      description: "Check your email inbox for a link to sign in.",
    });

    const signUpResource = await startMagicLinkFlow({
      redirectUrl: `${window.location.origin}`,
    }).catch(() => {
      toast({
        title: "Error",
        description: "Something went wrong, please try again...",
        variant: "destructive",
      });
    });

    if (signUpResource?.status === "complete") {
      await setActive({ session: signUpResource.createdSessionId });
      router.push("/home");
    }
  }

  async function magicSignInFlow(emailAddressId: string) {
    if (!signInLoaded) return;

    const magicFlow = clerkSignIn.createMagicLinkFlow();
    toast({
      title: "Email sent",
      description: "Check your email inbox for a link to sign in.",
    });

    const response = await magicFlow
      .startMagicLinkFlow({
        emailAddressId: emailAddressId,
        redirectUrl: `${window.location.origin}/`,
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Something went wrong, please try again...",
          variant: "destructive",
        });
      });

    const verification = response?.firstFactorVerification;

    if (verification?.status === "expired") {
      magicFlow.cancelMagicLinkFlow();
      toast({
        title: "Link expired",
        description: "Link expired, please try again...",
        variant: "destructive",
      });
    }

    if (response?.status === "complete") {
      await setActive({ session: response.createdSessionId });
      router.push("/home");
    }
  }

  async function createSignIn(email: string) {
    if (!signInLoaded) return;
    clerkSignIn
      .create({
        identifier: email,
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Something went wrong, please try again...",
          variant: "destructive",
        });
      });
  }

  function getFirstFactor() {
    if (!signInLoaded) return;
    return clerkSignIn.supportedFirstFactors.find(
      (factor) => factor.strategy === "email_link",
    ) as { emailAddressId?: string };
  }

  return { magicSignInFlow, magicSignUpFlow, createSignIn, getFirstFactor };
}
