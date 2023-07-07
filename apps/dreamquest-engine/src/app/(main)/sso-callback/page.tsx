"use client";

import { useEffect } from "react";
import { useClerk } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

type SearchParams = {
  afterSignUpUrl?: string | null;
  afterSignInUrl?: string | null;
  redirectUrl?: string | null;
  secondFactorUrl?: string;
  continueSignUpUrl?: string | null;
};

export const runtime = "edge";

export default function SSOCallback(props: { searchParams: SearchParams }) {
  const { handleRedirectCallback } = useClerk();

  useEffect(() => {
    //void handleRedirectCallback(props.searchParams);
  }, [props.searchParams, handleRedirectCallback]);

  return (
    <div className="flex h-[60vh] w-full items-center justify-center">
      <Loader2 className="mr-2 h-16 w-16 animate-spin" />
    </div>
  );
}
