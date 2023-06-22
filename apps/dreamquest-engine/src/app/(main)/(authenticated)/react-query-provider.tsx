"use client";

import React, { useState } from "react";
import type { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import SuperJSON from "superjson";

import { trpc } from "~/lib/trpc/client";

export const ReactQueryProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  function getBaseUrl() {
    if (typeof window !== "undefined") {
      return "";
    }

    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }

    return `http://localhost:${process.env.PORT ?? 3000}`;
  }

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: SuperJSON,
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
